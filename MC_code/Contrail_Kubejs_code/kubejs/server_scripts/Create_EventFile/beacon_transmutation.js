// ============================================================
// 信标光柱转换
//   contrail:chromatic_compound  ->  contrail:fined_rediance
//
// 环境：Minecraft 1.21.1 / NeoForge / KubeJS 2101.x
// ============================================================

const $BeaconBlockEntity = Java.loadClass('net.minecraft.world.level.block.entity.BeaconBlockEntity')
const $ParticleTypes = Java.loadClass('net.minecraft.core.particles.ParticleTypes')
const $CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag')
const $Entity = Java.loadClass('net.minecraft.world.entity.Entity')
const $Integer = Java.loadClass('java.lang.Integer')
const $Boolean = Java.loadClass('java.lang.Boolean')

const INPUT_ITEM = 'contrail:chromatic_compound'
const OUTPUT_ITEM = 'contrail:fined_rediance'

// ---- 烈焰人转换 ----
const BLAZE_GOLD_ITEM = 'contrail:blaze_gold' // 右键烈焰人后的产物
const BLAZE_FLAME_BURST = 30    // 右键转换瞬间的火焰粒子数量
const BLAZE_GOLD_PARTICLES = true // blaze_gold 掉落物是否带橘色火焰粒子
const BLAZE_DEBUG = true        // 调试日志：右键实体时打印目标和手持物品信息

// ---- 虚空转换 ----
const SHADOW_STEEL_ITEM = 'contrail:shadow_steel' // 坠入虚空后的产物
const VOID_Y = -256          // 转换高度：低于此高度即转换。
                             // 注意：原版会把物品在“世界最低高度-64”处虚空击杀，
                             // 所以脚本实际取“击杀线上方1格”与 VOID_Y 中较高者——
                             // 原版末地（最低0）会在 y=-63 转换；最低高度够低的维度才按 -256
const SHADOW_RISE_SPEED = 1.0   // 转换后上浮速度（格/tick）
const HOVER_MARGIN = 3.0        // 悬停高度 = 抛出高度下方多少格（避免撞到岛底来回弹）
const SHADOW_STEEL_PARTICLES = true // 暗紫色粒子（上浮过程 + 悬停 + 落地后）
const SHADOW_BURST = 40          // 虚空转换瞬间的暗紫色粒子数量
const HOVER_BURST_PORTAL = 60    // 浮起完成、开始悬停时的紫色粒子爆发数量
const HOVER_BURST_END_ROD = 10   // 悬停爆发时的末地烛粒子数量（微量）

// 光柱判定半径（格）。
//   0.75 = 信标正上方这一整格都算光柱内（推荐：不会因为被前一个产物挤偏而漏判）
//   0.5  = 只有贴近格子中心才算（更严格）
const BEAM_RADIUS = 0.75

// 发光效果
const INPUT_GLOW = false // 被转换物品掉落时发光（默认关闭：发光的是产物）
const OUTPUT_GLOW = true  // 转换产物发光（描边 + 粒子光环，掉落时持续保持）
const GLOW_PARTICLES = true // 发光粒子光环（minecraft:glow 粒子，作为描边之外的视觉保底）

// 转换后把产物随机四散抛出（乱飞）
const SCATTER = true
const SCATTER_SPEED_MIN = 0.35 // 水平初速下限（格/tick）
const SCATTER_SPEED_MAX = 0.60 // 水平初速上限 → 落地距离约 6~13 格
const SCATTER_UP_MIN = 0.30    // 竖直向上初速下限
const SCATTER_UP_MAX = 0.55    // 竖直向上初速上限

// 转换瞬间的末地烛粒子
const PARTICLE_COUNT_INNER = 40 // 内圈数量（密集）
const PARTICLE_COUNT_OUTER = 20 // 外圈数量（扩散）

// ==================== 发光（多级兜底，出任何问题都不影响转换） ====================

let glowWarned = true
let glowTick = 0

// 反射拿到原版发光开关 setSharedFlag(int, boolean)，发光标志位 = 6
let sharedFlagMethod = null
try {
    sharedFlagMethod = $Entity.getMethod('setSharedFlag', $Integer.TYPE, $Boolean.TYPE)
} catch (e) {
    sharedFlagMethod = null
}

// 已成功上过发光的实体（WeakSet 自动释放，不会内存泄漏）
const glowDone = new WeakSet()

function setGlowSafe(item, on) {
    // 已经发光过且只是重复打开 → 跳过；从没发光过却要关闭 → 跳过
    if (on && glowDone.has(item)) return
    if (!on && !glowDone.has(item)) return

    
    try {
        if (typeof item.setGlowingTag === 'function') {
            item.setGlowingTag(on)
            if (on) glowDone.add(item)
            return
        }
    } catch (e) {
       
    }

    try {
        if (typeof item.kjs$self === 'function') {
            const self = item.kjs$self()
            if (self !== null && typeof self.setGlowingTag === 'function') {
                self.setGlowingTag(on)
                if (on) glowDone.add(item)
                return
            }
        }
    } catch (e) {
        
    }

    
    try {
        if (sharedFlagMethod !== null) {
            sharedFlagMethod.invoke(item, 6, on)
            if (on) glowDone.add(item)
            return
        }
    } catch (e) {
        
    }

    
    try {
        const tag = new $CompoundTag()
        tag.putBoolean('Glowing', on)
        item.mergeNbt(tag)
        if (on) glowDone.add(item)
        return
    } catch (e) {
        // 忽略
    }

    if (!glowWarned) {
        glowWarned = true
        console.warn('[信标转换] 所有发光方式都失败，物品可能没有描边（不影响转换）')
    }
}

/**
 * 判断物品这一 tick 的运动轨迹是否穿过某根光柱。
 * 光柱是以 (bx + 0.5, bz + 0.5) 为轴、从 beaconY + 1 一直向上的竖直线。
 */
function hitsBeam(item, bx, bz, beaconY) {
    const x1 = item.x
    const y1 = item.y
    const z1 = item.z

    // 本 tick 的位移就是 motion；反推上一刻位置
    const x0 = x1 - item.motionX
    const y0 = y1 - item.motionY
    const z0 = z1 - item.motionZ

    const dx = x1 - x0
    const dy = y1 - y0
    const dz = z1 - z0

    const length = Math.sqrt(dx * dx + dy * dy + dz * dz)

    // 每 0.2 格采样一次，最多 12 次，避免高速物品"跳过"光柱
    const steps = Math.max(1, Math.min(12, Math.ceil(length / 0.2)))

    const cx = bx + 0.5
    const cz = bz + 0.5
    const r2 = BEAM_RADIUS * BEAM_RADIUS

  
    let i, t, ox, oz
    for (i = 0; i <= steps; i++) {
        t = i / steps

        // 光柱从信标方块上方开始
        if (y0 + dy * t < beaconY + 1) continue

        ox = x0 + dx * t - cx
        oz = z0 + dz * t - cz
        if (ox * ox + oz * oz <= r2) return true
    }

    return false
}

// ==================== 右键烈焰人：化合物 → blaze_gold ====================
// 注意：ItemEvents 是"按物品注册"的事件，第一个参数必须是被注册的物品 ID，
// 只有手持该物品右键实体时才会触发。
// event.entity = 玩家，event.target = 被右键的实体，event.item = 手持物品

ItemEvents.entityInteracted(INPUT_ITEM, event => {
    // 注意：这里不要用 const 声明，且变量名必须与脚本其它地方不同
    // （Rhino 会把 const 提升到脚本作用域，和主循环里的 const level 撞名报错）
    let blazeLv, blazeCnt, blazeSlot
    try {
        // 调试日志：看看事件到底有没有触发、目标是什么
        if (BLAZE_DEBUG) {
            console.info('[信标转换] 右键实体: 手持=' + event.item.id + ' 目标类型=' + String(event.target.type))
        }

        // 宽松匹配：兼容 "minecraft:blaze" / "blaze" 两种写法
        if (String(event.target.type).indexOf('blaze') < 0) return

        blazeLv = event.entity.level
        blazeCnt = event.item.count

        // 一次只转换 1 个：手持数量 -1（剩 1 个则清空该格），
        // 产物 1 个放进背包（背包满则掉在脚边）
        blazeSlot = String(event.hand) === 'OFF_HAND' ? 40 : event.entity.selectedSlot
        if (blazeCnt > 1) {
            event.entity.inventory.setStackInSlot(blazeSlot, Item.of(INPUT_ITEM, blazeCnt - 1))
        } else {
            event.entity.inventory.setStackInSlot(blazeSlot, Item.of('minecraft:air'))
        }
        event.entity.inventory.setChanged()
        event.entity.give(Item.of(BLAZE_GOLD_ITEM, 1))

        // 火焰粒子特效（烈焰人身上喷发）
        if (typeof blazeLv.sendParticles === 'function') {
            blazeLv.sendParticles($ParticleTypes.FLAME, event.target.x, event.target.y + 0.5, event.target.z, BLAZE_FLAME_BURST, 0.4, 0.5, 0.4, 0.05)
            blazeLv.sendParticles($ParticleTypes.SMOKE, event.target.x, event.target.y + 0.5, event.target.z, 10, 0.3, 0.4, 0.3, 0.02)
        }

        console.info('[信标转换] 烈焰人转换: ' + INPUT_ITEM + ' x1 -> ' + BLAZE_GOLD_ITEM + ' x1 (手持剩余 ' + Math.max(0, blazeCnt - 1) + ')')
    } catch (e) {
        console.warn('[信标转换] 烈焰人转换出错: ' + e)
    }
})

// ==================== 主循环 ====================

LevelEvents.tick(event => {
    const level = event.level

    
    let stack, bx, bz, chunk, pos, be, count, angle, speed, up, killLine

    // 虚空转换线：配置值与“原版虚空击杀线(最低Y-64)上方1格”取较高者，
    // 保证物品在被原版击杀前完成转换
    killLine = VOID_Y
    try {
        killLine = Math.max(VOID_Y, level.getMinBuildHeight() - 63)
    } catch (e) {
        // 保持 VOID_Y
    }

    // 只处理掉落物
    for (const item of level.getEntities().filterItems()) {
        stack = item.item
        if (!stack) continue

        // ---- 转换产物：持续保持发光（描边 + 粒子光环） ----
        if (stack.id === OUTPUT_ITEM) {
            if (OUTPUT_GLOW) {
                setGlowSafe(item, true)

                if (GLOW_PARTICLES && glowTick % 5 === 0 && typeof level.sendParticles === 'function') {
                    level.sendParticles($ParticleTypes.GLOW, item.x, item.y + 0.2, item.z, 1, 0.1, 0.1, 0.1, 0.01)
                }
            }
            continue
        }

        // ---- blaze_gold 掉落物：橘色火焰粒子 ----
        if (stack.id === BLAZE_GOLD_ITEM) {
            if (BLAZE_GOLD_PARTICLES && glowTick % 5 === 0 && typeof level.sendParticles === 'function') {
                level.sendParticles($ParticleTypes.FLAME, item.x, item.y + 0.2, item.z, 1, 0.1, 0.1, 0.1, 0.01)
            }
            continue
        }

        // ---- shadow_steel 掉落物：浮起 → 悬停 → 暗紫色粒子 ----
        if (stack.id === SHADOW_STEEL_ITEM) {
            if (item.persistentData.getBoolean('kjs_shadow_rise')) {
                // 虚空转换后上浮：每 tick 重设速度，竖直匀速、水平归零（笔直升回）
                item.setMotionX(0)
                item.setMotionY(SHADOW_RISE_SPEED)
                item.setMotionZ(0)

                // 浮回到“抛出高度下方 HOVER_MARGIN 格” → 结束上浮，进入悬停
                // （留出余量避免撞到空岛底部来回弹）
                if (item.y >= item.persistentData.getDouble('kjs_max_y') - HOVER_MARGIN) {
                    item.persistentData.putBoolean('kjs_shadow_rise', false)
                    item.persistentData.putBoolean('kjs_shadow_hover', true)

                    // 悬停开始的爆发：大量紫色 + 微量末地烛
                    if (typeof level.sendParticles === 'function') {
                        level.sendParticles($ParticleTypes.PORTAL, item.x, item.y + 0.3, item.z, HOVER_BURST_PORTAL, 0.5, 0.5, 0.5, 0.25)
                        level.sendParticles($ParticleTypes.END_ROD, item.x, item.y + 0.3, item.z, HOVER_BURST_END_ROD, 0.3, 0.3, 0.3, 0.2)
                    }

                    console.info('[信标转换] shadow_steel 已浮起，开始悬停于 y=' + item.y.toFixed(1))
                }

                // 上浮过程中的暗紫色粒子尾迹
                if (SHADOW_STEEL_PARTICLES && glowTick % 2 === 0 && typeof level.sendParticles === 'function') {
                    level.sendParticles($ParticleTypes.PORTAL, item.x, item.y, item.z, 3, 0.2, 0.2, 0.2, 0.1)
                }
            } else if (item.persistentData.getBoolean('kjs_shadow_hover')) {
                // 悬停：原地悬浮等待拾取（竖直速度补偿重力，水平归零，几乎不动）
                item.setMotionX(0)
                item.setMotionY(0.042)
                item.setMotionZ(0)

                // 大量紫色粒子 + 微量末地烛粒子
                if (SHADOW_STEEL_PARTICLES && typeof level.sendParticles === 'function') {
                    level.sendParticles($ParticleTypes.PORTAL, item.x, item.y + 0.3, item.z, 4, 0.25, 0.25, 0.25, 0.1)
                    if (glowTick % 3 === 0) {
                        level.sendParticles($ParticleTypes.END_ROD, item.x, item.y + 0.3, item.z, 1, 0.15, 0.15, 0.15, 0.05)
                    }
                }
            } else {
                // 落地/静止状态：暗紫色粒子光环
                if (SHADOW_STEEL_PARTICLES && glowTick % 5 === 0 && typeof level.sendParticles === 'function') {
                    level.sendParticles($ParticleTypes.PORTAL, item.x, item.y + 0.2, item.z, 1, 0.1, 0.1, 0.1, 0.01)
                }
            }
            continue
        }

        if (stack.id !== INPUT_ITEM) continue

        // ---- 被转换物品（默认不发光，INPUT_GLOW = true 可开启） ----
        if (INPUT_GLOW) {
            setGlowSafe(item, true)
        }

        // 记录最高点：虚空转换后浮回到这个高度
        if (item.y > item.persistentData.getDouble('kjs_max_y')) {
            item.persistentData.putDouble('kjs_max_y', item.y)
        }

        // ---- 坠入虚空 → 转换为 shadow_steel ----
        if (item.y <= killLine) {
            count = stack.count
            item.item = Item.of(SHADOW_STEEL_ITEM, count)
            item.persistentData.putBoolean('kjs_shadow_rise', true)

            // 转换瞬间清零速度：避免带着下坠动量继续往下扎、来回弹
            item.setMotionX(0)
            item.setMotionY(0)
            item.setMotionZ(0)

            // 转换瞬间的暗紫色粒子爆发
            if (typeof level.sendParticles === 'function') {
                level.sendParticles($ParticleTypes.PORTAL, item.x, item.y + 0.3, item.z, SHADOW_BURST, 0.4, 0.4, 0.4, 0.3)
            }

            console.info('[信标转换] 虚空转换: ' + INPUT_ITEM + ' x' + count + ' -> ' + SHADOW_STEEL_ITEM + ' x' + count)
            continue
        }

        // 每个物品独立容错：这个物品出问题不影响其它物品
        try {
            // 光柱是竖直的，信标只可能在物品所在的这一格柱子里
            bx = Math.floor(item.x)
            bz = Math.floor(item.z)

            // 直接遍历该区块的方块实体，比从 y=320 往下逐格扫描便宜得多
            chunk = level.getChunk(bx >> 4, bz >> 4)

            for (pos of chunk.blockEntities.keySet()) {
                if (pos.x !== bx || pos.z !== bz) continue

                be = chunk.getBlockEntity(pos)
                if (!(be instanceof $BeaconBlockEntity)) continue
                if (be.isRemoved()) continue

                // 空列表 = 没有光柱：
                //   * 金字塔未激活（levels == 0）
                //   * 或光柱被不透明方块挡住（beamSections 被清空）
                if (be.beamSections.isEmpty()) continue

                if (!hitsBeam(item, bx, bz, pos.y)) continue

                // 原地替换：保留位置、数量、拾取延迟
                count = stack.count
                item.item = Item.of(OUTPUT_ITEM, count)

                // 产物发光：转换瞬间立即点亮（原地替换，同一个实体）
                setGlowSafe(item, OUTPUT_GLOW)

                // 转换后四散飞出：随机方向 + 向上抛起，落地约 10 格（乱飞）
                if (SCATTER) {
                    angle = Math.random() * Math.PI * 2
                    speed = SCATTER_SPEED_MIN + Math.random() * (SCATTER_SPEED_MAX - SCATTER_SPEED_MIN)
                    up = SCATTER_UP_MIN + Math.random() * (SCATTER_UP_MAX - SCATTER_UP_MIN)
                    item.setMotionX(Math.cos(angle) * speed)
                    item.setMotionY(up)
                    item.setMotionZ(Math.sin(angle) * speed)
                }

                // 转换瞬间：末地烛粒子爆发（内圈密 + 外圈散）
                if (typeof level.sendParticles === 'function') {
                    level.sendParticles($ParticleTypes.END_ROD, item.x, item.y + 0.3, item.z, PARTICLE_COUNT_INNER, 0.35, 0.35, 0.35, 0.30)
                    level.sendParticles($ParticleTypes.END_ROD, item.x, item.y + 0.3, item.z, PARTICLE_COUNT_OUTER, 0.70, 0.70, 0.70, 0.15)
                }

                console.info('[信标转换] 转换成功: ' + INPUT_ITEM + ' x' + count + ' -> ' + OUTPUT_ITEM + ' x' + count)

                break
            }
        } catch (err) {
            console.warn('[信标转换] 处理掉落物时出错: ' + err)
        }
    }

    glowTick++
})
