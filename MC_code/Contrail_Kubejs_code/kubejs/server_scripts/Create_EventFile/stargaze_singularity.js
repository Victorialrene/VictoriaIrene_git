// ============================================================================
// KubeJS 1.21.1 (NeoForge) 服务端脚本 —— 堕落星空奇点 → 星空奇点 转化仪式
// ----------------------------------------------------------------------------
// 触发条件：在游戏时间 00:00-02:00（dayTime 18000-20000 tick）期间，
//           把 contrail:fallen_stargaze_singularity（堕落星空奇点）丢到
//           y >= 世界高度上限 * 80% 的空中（不能落在地上）。
// ============================================================================

const INPUT_ID = 'contrail:fallen_stargaze_singularity'; // 被转化的物品（堕落星空奇点）
const OUTPUT_ID = 'contrail:stargaze_singularity';       // 转化产物（星空奇点）

const RITUAL_TICKS = 200;   // 仪式动画时长（10 秒，越长越宏大）
const FLOAT_TICKS = 200;    // 转化后悬浮时长（10 秒）
const GLOW_TICKS = 200;     // 落地后淡蓝余晖时长（10 秒）

const COOLDOWN_TICKS = 0; // 两次转化之间的全局间隔（15 分钟，按现实时间）；0 = 无间隔

const NIGHT_START = 18000; // 00:00
const NIGHT_END = 20000;   // 02:00
const HEIGHT_RATIO = 0.8;  // 触发高度 = 世界高度上限的 80%

// ---------------------------------------------------------------------------
// 播放信标音效：用服务器控制台权限执行 /playsound，
// 在普通生存服务器（玩家无命令权限）上也能正常出声。
// ---------------------------------------------------------------------------
function playBeaconSound(server, sound, x, y, z, volume, pitch) {
  server.runCommandSilent(
    `playsound ${sound} block @a[distance=..200] ${Math.floor(x)} ${Math.floor(y)} ${Math.floor(z)} ${volume} ${pitch}`
  );
}

// 缓动函数：法阵前期快速展开、后期减速收束，观感更大气
function easeOutCubic(p) {
  const q = 1 - p;
  return 1 - q * q * q;
}

// 在指定位置生成单个静态粒子（count=0 时原版会生成恰好一个）
function spawnPoint(level, particle, x, y, z) {
  level.spawnParticles(particle, true, x, y, z, 0, 0, 0, 0, 0);
}

// 一圈符文环：dir=1 顺时针、dir=-1 逆时针
function ring(level, particle, x, y, z, radius, points, spin, dir) {
  for (let i = 0; i < points; i++) {
    const a = spin * dir + (i / points) * Math.PI * 2;
    spawnPoint(level, particle, x + Math.cos(a) * radius, y, z + Math.sin(a) * radius);
  }
}

// ---------------------------------------------------------------------------
// 仪式主体粒子：4 圈法阵 + 8 根旋转光柱 + 螺旋升腾 + 中心蓝火 + 周期冲击环
// ---------------------------------------------------------------------------
function spawnRitual(level, item, progress, t) {
  const x = item.x, y = item.y, z = item.z;
  const r = 1.0 + 6.0 * easeOutCubic(progress); // 半径从 1 格扩展到 7 格
  const spin = progress * Math.PI * 3;          // 全程旋转 1.5 圈

  ring(level, 'minecraft:end_rod', x, y + 0.05, z, r, 24, spin, 1);             // 外圈：24 个白色符文（顺旋）
  ring(level, 'minecraft:soul_fire_flame', x, y + 0.10, z, r * 0.75, 18, spin, -1);   // 第二圈：18 个淡蓝魂火（反旋）
  ring(level, 'minecraft:enchant', x, y + 0.20, z, r * 0.50, 12, spin * 1.5, 1);      // 第三圈：12 个附魔光点
  ring(level, 'minecraft:nautilus', x, y + 0.15, z, r * 0.28, 6, spin * 2, -1);       // 内圈：6 个蓝色螺号

  // 8 根旋转上升的符文光柱
  for (let i = 0; i < 8; i++) {
    const a = spin * 0.5 + (i / 8) * Math.PI * 2;
    level.spawnParticles('minecraft:end_rod', true,
      x + Math.cos(a) * r * 0.9, y + 0.3, z + Math.sin(a) * r * 0.9, 0, 0.35, 0, 0, 1);
  }
  // 6 道螺旋升腾的附魔粒子
  for (let i = 0; i < 6; i++) {
    const a = spin * 2 + (i / 6) * Math.PI * 2;
    level.spawnParticles('minecraft:enchant', true,
      x + Math.cos(a) * r * 0.55, y + 0.2, z + Math.sin(a) * r * 0.55, 0, 0.22, 0, 0, 1);
  }
  // 中心旋转的蓝色火焰与光点
  level.spawnParticles('minecraft:soul_fire_flame', true, x, y + 0.3, z, r * 0.35, 0.5, r * 0.35, 5, 0.06);
  level.spawnParticles('minecraft:enchant', true, x, y + 0.5, z, r * 0.5, 0.6, r * 0.5, 4, 0.12);

  // 每 20 tick（1 秒）一圈淡青色冲击脉冲
  if (t % 20 === 0) {
    level.spawnParticles('minecraft:sonic_boom', true, x, y + 0.5, z, 0.4, 0.4, 0.4, 3, 0.05);
    level.spawnParticles('minecraft:scrape', true, x, y + 0.5, z, 0.7, 0.7, 0.7, 6, 0.15);
  }
}

// ---------------------------------------------------------------------------
// 转化瞬间的爆发粒子（开场闪光与收尾爆发共用）
// ---------------------------------------------------------------------------
function spawnBurst(level, x, y, z) {
  level.spawnParticles('minecraft:flash', true, x, y + 0.4, z, 0, 0, 0, 0, 0);
  level.spawnParticles('minecraft:end_rod', true, x, y + 0.4, z, 0.7, 0.7, 0.7, 60, 0.35);
  level.spawnParticles('minecraft:soul_fire_flame', true, x, y + 0.4, z, 0.9, 0.9, 0.9, 50, 0.25);
  level.spawnParticles('minecraft:enchant', true, x, y + 0.4, z, 1.0, 1.0, 1.0, 45, 0.45);
  level.spawnParticles('minecraft:firework', true, x, y + 0.4, z, 0.6, 0.6, 0.6, 15, 0.3);
  level.spawnParticles('minecraft:nautilus', true, x, y + 0.4, z, 0.5, 0.5, 0.5, 12, 0.25);
  level.spawnParticles('minecraft:sonic_boom', true, x, y + 0.4, z, 0.3, 0.3, 0.3, 2, 0.1);
}

// ---------------------------------------------------------------------------
// 转化后的旋转淡蓝色粒子光环（悬浮期间每 tick 调用，elapsed = 已悬浮 tick 数）
// ---------------------------------------------------------------------------
function spawnAura(level, x, y, z, elapsed) {
  // 8 个淡蓝魂火绕物品旋转 + 上下起伏
  for (let i = 0; i < 8; i++) {
    const a = elapsed * 0.12 + (i / 8) * Math.PI * 2;
    spawnPoint(level, 'minecraft:soul_fire_flame',
      x + Math.cos(a) * 0.55, y + 0.12 + Math.sin(a * 2) * 0.1, z + Math.sin(a) * 0.55);
  }
  // 中心蓝色火焰
  level.spawnParticles('minecraft:soul_fire_flame', true, x, y + 0.2, z, 0.2, 0.2, 0.2, 3, 0.03);
  if (elapsed % 3 === 0) spawnPoint(level, 'minecraft:enchant', x, y + 0.45, z);
  if (elapsed % 10 === 0) spawnPoint(level, 'minecraft:nautilus', x, y + 0.3, z);
}

// ---------------------------------------------------------------------------
// 落地后的淡蓝色余晖（每 2 tick 一簇）
// ---------------------------------------------------------------------------
function spawnGlow(level, x, y, z, elapsed) {
  if (elapsed % 2 !== 0) return;
  level.spawnParticles('minecraft:soul_fire_flame', true, x, y + 0.15, z, 0.18, 0.18, 0.18, 3, 0.03);
  if (elapsed % 6 === 0) spawnPoint(level, 'minecraft:enchant', x, y + 0.35, z);
}

// ---------------------------------------------------------------------------
// 主循环：与 beacon_transmutation.js 相同的 LevelEvents.tick + filterItems 写法
// ---------------------------------------------------------------------------
LevelEvents.tick(event => {
  const level = event.level;
  const server = level.getServer();
  if (!server) return;

  for (const item of level.getEntities().filterItems()) {
    const stack = item.item;
    if (!stack) continue;

    const data = item.persistentData;
    const phase = data.getInt('stargaze_phase');

    // ===== 阶段 1：魔法阵仪式（10 秒，物品悬停） =====
    if (phase === 1) {
      item.setNoGravity(true);
      item.setMotionX(0);
      item.setMotionY(0);
      item.setMotionZ(0);

      const t = data.getInt('stargaze_timer') - 1;
      data.putInt('stargaze_timer', t);
      spawnRitual(level, item, (RITUAL_TICKS - t) / RITUAL_TICKS, t);

      // 更长的仪式里多铺两段信标低鸣
      if (t === RITUAL_TICKS - 50 || t === RITUAL_TICKS - 140) {
        playBeaconSound(server, 'minecraft:block.beacon.ambient', item.x, item.y, item.z, 1.6, 0.8);
      }

      if (t <= 0) {
        // 完成转化
        const count = stack.count;
        item.item = Item.of(OUTPUT_ID, count);
        data.putInt('stargaze_phase', 2);
        data.putInt('stargaze_timer', FLOAT_TICKS);
        item.setNoPickUpDelay();         // 悬浮期间允许玩家拾取
        item.setTicksUntilDespawn(6000); // 重置 5 分钟消失倒计时
        spawnBurst(level, item.x, item.y, item.z);
        playBeaconSound(server, 'minecraft:block.beacon.power_select', item.x, item.y, item.z, 2, 1.2);
      }
      continue;
    }

    // ===== 阶段 2：悬浮 10 秒，等待玩家拾取 =====
    if (phase === 2) {
      item.setNoGravity(true);
      item.setMotionX(0);
      item.setMotionY(0);
      item.setMotionZ(0);

      const t = data.getInt('stargaze_timer') - 1;
      data.putInt('stargaze_timer', t);
      spawnAura(level, item.x, item.y, item.z, FLOAT_TICKS - t);

      if (t <= 0) {
        item.setNoGravity(false); // 恢复重力，开始下落
        item.setDefaultPickUpDelay();
        data.putInt('stargaze_phase', 3);
        data.putInt('stargaze_timer', GLOW_TICKS);
      }
      continue;
    }

    // ===== 阶段 3：落地后的淡蓝色余晖 =====
    if (phase === 3) {
      const t = data.getInt('stargaze_timer') - 1;
      data.putInt('stargaze_timer', t);
      spawnGlow(level, item.x, item.y, item.z, GLOW_TICKS - t);
      if (t <= 0) data.putInt('stargaze_phase', 0);
      continue;
    }

    // ===== 未开始仪式：检查触发条件 =====
    if (stack.id === INPUT_ID) {
      const dayTime = level.getDayTime() % 24000;
      const inWindow = dayTime >= NIGHT_START && dayTime <= NIGHT_END;
      const highEnough = item.y >= level.getMaxBuildHeight() * HEIGHT_RATIO;
      const onGround = item.onGround();

      if (inWindow && highEnough && !onGround) {
        // 全局冷却：距上次转化不足 COOLDOWN_TICKS 时不触发
        // （按现实时间计时，1 tick = 50 ms；存档重启后冷却依然有效）
        if (COOLDOWN_TICKS > 0) {
          const nowMs = Date.now();
          if (nowMs < server.persistentData.getLong('stargaze_cooldown_until')) continue;
          server.persistentData.putLong('stargaze_cooldown_until', nowMs + COOLDOWN_TICKS * 50);
        }

        // 条件满足，开始仪式
        data.putInt('stargaze_phase', 1);
        data.putInt('stargaze_timer', RITUAL_TICKS);
        item.setInfinitePickUpDelay();   // 仪式期间禁止拾取
        item.setTicksUntilDespawn(6000); // 防止仪式途中消失
        item.setNoGravity(true);
        item.setMotionX(0);
        item.setMotionY(0);
        item.setMotionZ(0);
        spawnBurst(level, item.x, item.y, item.z);
        playBeaconSound(server, 'minecraft:block.beacon.activate', item.x, item.y, item.z, 2, 1);
      } else if (server.getTickCount() % 4 === 0 && Math.random() < 0.5) {
        // 普通状态下掉落形态的淡蓝色粒子（偶发闪烁，作为视觉提示）
        level.spawnParticles('minecraft:soul_fire_flame', true,
          item.x, item.y + 0.15, item.z, 0.12, 0.12, 0.12, 1, 0.02);
      }
    }
  }
});
