// ============================================================
//  Shift 查看更多描述 (Shift Tooltip)
//  效果:
//   - 普通描述 (base): 始终显示, 无需按 Shift
//   - 提示行  (hint): 未按 Shift 时显示
//   - 详细描述 (desc): 按住 Shift 后追加显示
// ============================================================

// ---------- 在这里添加需要描述的物品 ----------
// items: 物品 ID / 物品标签 / '*' (全部物品, 慎用)
// base : 普通描述, 任何时候都显示 (字符串或字符串数组)
// hint : 未按 Shift 时显示的提示
// desc : 按住 Shift 后追加显示的描述, 数组内每一项为一行
const SHIFT_TOOLTIPS = [
    {
        items: 'create:cogwheel',
        base: '§5§o工业动力的木之骨骼',
        hint: '按 Shift 查看更多信息',
        desc: [
            '§5§o“一切机械动力设备的发端，这是天才般的力量传动装置，它就是齿轮。”'
        ]
    },
    {
        items: 'minecraft:netherite_ingot',
        base: '由远古残骸提炼而成的顶级材料',
        hint: '按 Shift 查看更多信息',
        desc: [
            '由下界合金碎片与金锭合成',
            '在锻造台可将钻石装备升级为下界合金装备',
            '下界合金装备不会被火焰烧毁'
        ]
    },
    {
        items: 'minecraft:elytra',
        base: '可以让你在天空中滑翔的翅膀',
        hint: '按 Shift 查看更多信息',
        desc: [
            '装备在胸甲栏, 高空下落时按跳跃键滑翔',
            '可使用幻翼膜修复耐久'
        ]
    },
    {
        items: 'minecraft:totem_of_undying',
        base: '能够救你一命的护身符',
        hint: '按 Shift 查看更多信息',
        desc: [
            '手持或放在副手时, 可抵挡一次致命伤害',
            '触发后恢复生命并清除部分负面效果',
            '由唤魔者掉落'
        ]
    },
    // 使用标签的例子 (本文件位于 server_scripts, 标签可用):
    // {
    //     items: '#minecraft:beacon_payment_items',
    //     base: '信标的燃料',
    //     hint: '按 Shift 查看更多信息',
    //     desc: ['可以用来激活信标']
    // }
]

// ---------- 以下为注册代码, 一般无需修改 ----------
ItemEvents.modifyTooltips(event => {
    SHIFT_TOOLTIPS.forEach(entry => {
        // 1. 普通描述: 不带条件, 任何时候都显示
        if (entry.base) event.add(entry.items, entry.base)
        // 2. 未按 Shift: 显示灰色提示行
        event.add(entry.items, { shift: false }, Text.darkGray(entry.hint).italic(false))
        // 3. 按住 Shift: 追加详细描述
        event.add(entry.items, { shift: true }, entry.desc)
    })
})
