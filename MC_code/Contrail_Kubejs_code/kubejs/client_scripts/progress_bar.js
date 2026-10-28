let $RegisterItemDecorationsEvent = Java.loadClass('net.neoforged.neoforge.client.event.RegisterItemDecorationsEvent')
let incompletedIngredient = Ingredient.of('#kubejs:incompleted')

NativeEvents.onEvent($RegisterItemDecorationsEvent, event => {
    let decorator = (guiGraphics, font, stack, x, y) => {
        // 过滤：只处理带有 kubejs:incompleted 标签的物品
        if (!incompletedIngredient.test(stack)) return false

        // 获取序列组装数据组件
        let assembly = stack.get('create:sequenced_assembly')
        if (!assembly) return false

        let progress = assembly.progress() // 0.0 ~ 1.0
        let maxBarWidth = 13 // 进度条最大像素宽度
        let barWidth = Math.floor(progress * maxBarWidth)
        if (barWidth <= 0 && progress > 0) barWidth = 1

        // 绘制黑色背景底条
        let bgY = y + 13
        let guiOverlay = Java.loadClass('net.minecraft.client.renderer.RenderType').guiOverlay()
        guiGraphics.fill(guiOverlay, x + 2, bgY, x + 15, bgY + 2, 0xFF << 24)

        // 绘制渐变前景条（橙 #FFC074 → 青 #46FFE0）
        if (barWidth > 0) {
            let r = Math.floor(255 + (70 - 255) * progress)
            let g = Math.floor(192 + (255 - 192) * progress)
            let b = Math.floor(116 + (224 - 116) * progress)
            let color = (0xFF << 24) | (r << 16) | (g << 8) | b
            guiGraphics.fill(guiOverlay, x + 2, bgY, x + 2 + barWidth, bgY + 1, color)
        }
        return true
    }

    let allItemIds = Item.getTypeList()
    for (let id of allItemIds) {
        event.register(id, decorator)
    }
})