ItemEvents.modifyTooltips(event =>{
//Minecraft
    event.add("minecraft:iron_ingot","我有20铁你怕不怕！")
    event.add("minecraft:redstone","雷石东")
    event.add("minecraft:redstone_block","雷石东块")
    event.add("minecraft:repeater","雷石东直放站")
    event.add("minecraft:conduit","导管")
    event.add("minecraft:lightning_rod","雷霆之杖")
//Create
    event.add("create:crushed_raw_iron",Text.of("§6除了粉碎原矿，也可以通过粉碎§e绯红岩§6获得"))
    event.add("create:crushed_raw_gold",Text.of("§6除了粉碎原矿，也可以通过粉碎§e赭金砂§6获得"))
    event.add("create:crushed_raw_copper",Text.of("§6除了粉碎原矿，也可以通过粉碎§e辉绿岩§6获得"))
    event.add("create:crushed_raw_zinc",Text.of("§6除了粉碎原矿，也可以通过粉碎§e皓蓝石§6获得"))
    event.add("create:crushing_wheel",Text.of("§4如果不小心掉入粉碎轮，最好祈祷他转速不够能跳出来"))
    event.add("create:polished_rose_quartz",Text.of("§6亮晶晶的，拥有不错的导电性"))
    event.add("create:rose_quartz",Text.of("§5玫瑰石英没有加工的半成品原料，因为在紫水晶基底上涂上了红石粉，拥有不错的导电性"))
    event.add("create:basin",Text.of("“某个鲸鱼娘似乎很喜欢把它扣在头上，还说着什么大白饭”"))
    event.add("create:creative_motor",Text.of("§5喂！，你能拿到我说明你是开了创造的！，你这个可恶的骇客！！！"))
    event.add("create:creative_crate",Text.of("§5喂！，你能拿到我说明你是开了创造的！，你这个可恶的骇客！！！"))
    event.add("create:creative_blaze_cake",Text.of("§5喂！，你能拿到我说明你是开了创造的！，你这个可恶的骇客！！！"))
    event.add("create:creative_fluid_tank",Text.of("§5喂！，你能拿到我说明你是开了创造的！，你这个可恶的骇客！！！"))
    event.add("create:handheld_worldshaper",Text.of("§5喂！，你能拿到我说明你是开了创造的！，你这个可恶的骇客！！！"))
    event.add("create:water_wheel",Text.of("§5没看懂"))
    event.add("create:hand_crank",Text.of("§6i狐TV"))
    event.add("create:mechanical_press",Text.of("§6锵！"))
    event.add("create:copper_diving_helmet",Text.of("§5我从海底出击！"))
    event.add("create:copper_diving_boots",Text.of("§5我从海底出击！"))
    event.add("create:cogwheel",[
        Text.of("§5§o工业动力的木之骨骼"),
        Text.of("§5§o“一切机械动力设备的发端，这是天才般的力量传动装置，它就是齿轮。”")
    ])

    event.add("create:large_cogwheel",[
        Text.of("§5§o工业动力的木之骨骼"),
        Text.of("§5§o“一切机械动力设备的发端，这是天才般的力量传动装置，它就是齿轮。”")
    ])

    event.add("create:redstone_link",[
        Text.of("§6工程师们在无线电领域最跨时代的发明！"),
        Text.of("§5无线红石信号终端让红石链接从从前需要红石物理连接"),
        Text.of("§5变成了“空气中皆是互不干扰的红石”！")
    ])

    event.add("create:linked_controller",[
        Text.of("§6无线红石遥控器的发明来源于一名红石工程师的脑洞发明"),
        Text.of("§5本质上它是由无线红石信号终端改造而来")
    ])

    event.add("create:mechanical_arm",[
        Text.of("§e/****************  §6Σ§5 & §6∏§e *****************/"),
        Text.of("§5零幺二进，与或是非；丝玄之轴，数合万千。"),
        Text.of("§5差和微积，泛函变分；须臾方寸，算术奥艰。"),
        Text.of("§5机械之灵，欲释其怒；不朽精钢，待拭虏血。"),
        Text.of("§5万机之神，智识无边；佑吾克敌，雄霸宇间。"),
        Text.of("§e/***************** §6A§5 || §6Ω§e ****************/"),
        Text.of("§7若播放音乐，机魂大悦！")
    ])

    event.add("create:extendo_grip",[
        Text.of("§6内部使用精密构件的机械假手，通过扣动扳机驱动内部的机械结构从而可以让使用者获得更远的交互距离"),
        Text.of("§6有时使用者每次扣动扳机的力度与上次的力度不一致，可能导致内部机械结构的老化"),
        Text.of("§6推荐制作一些§e背罐§6储存压缩空气，用压缩空气来驱动这个装置")
    ])

    event.add("create:potato_cannon",[
        Text.of("§6一名工程师在茶余饭后做出的发射器玩具,有时内部因食物残渣可能导致内部结构老化"),
        Text.of("§6可以发射各种各样的固体食物，但注意！"),
        Text.of("§4不要往其他人头上人射！"),
        Text.of("§6推荐制作一些§e背罐§6储存压缩空气，用压缩空气来驱动这个装置")
    ])

    event.add("create:wrench", [
        Text.of("§6进入施工现场，必须戴好护目镜"),
        Text.of("§6扳手的发明原因是工程师们早就厌恶了需要面朝不一样的方向才能把机械的朝向放对的现象了"),
        Text.of("§5被特殊材料制作且强化的扳手，拿来敲别人的头似乎效果不错"),
        Text.of("§5也可以用来改变机械的方向和快捷拆卸机械")
    ])

    event.add("create:goggles",[
        Text.of("§5工程师们佩戴的精细眼镜"),
        Text.of("§6镜片被黄铜和上好的皮革所固定，镜片被打磨的透亮且光滑，可以看到机械的具体信息"),
        Text.of("§6“来自一名叫做艾琳§m§7（呆头羽）§6的工程师的案例”"),
        Text.of("§6“她在尝试制作一个工作站的时候，把齿轮们的转速调的太大，造成齿轮碎裂”"),
        Text.of("§6“导致齿轮们的碎片像哈气的哈基米一样吸附到了艾琳的脸上”"),
        Text.of("§6“自此之后，所有的工程师在制造一些机器的时候都不约而同的开始佩戴护目镜”"),
        Text.of("§5可以减小这样的意外对工程师的伤害")
    ])

    event.add("create:track",[
        Text.of("§4§k§lkillklillkil"),
        Text.of("§4§lL  e  a  F"),
        Text.of("§4§k§lkillklillkil")
    ])

    event.add("create:mechanical_saw",[
        Text.of("§4高速旋转机械!"),
        Text.of("§4请不要站在上面或者无防护近距离接触！"),
        Text.of("§4“小心变成2.5份！！！,低转速也不行！！！”")
    ])

    event.add("create:mechanical_drill",[
        Text.of("§6动力钻头是一种常用于破坏方块和玩家（？）的动力元件"),
        Text.of("§5“我的钻头可是钻破天际的口牙！”")
    ])

    event.add("create:deployer",[
        Text.of("§6使用机械假手和精密构件制作的动力机械手，你可以在它的手中放入一些东西"),
        Text.of("§5它可以像玩家一样来灵活地使用手中的§6物品§5，或者§6武器"),
        Text.of("§5使用了这个机械你就可以悟出一个道理"),
        Text.of(""),
        Text.of("§5§o“在身后捅你的未必是群U，也有可能是一个机械手QAQ”————某一名呆头羽的留言")
    ])

    event.add("create:large_water_wheel",[
        Text.of("§6这下看懂了！"),
        Text.of("§5《水车河仙人》")
    ])

    event.add("create:depot",[
        Text.of("§6机械们的工作台"),
        Text.of("§6大多数的机械加工都在这个上面进行"),
        Text.of("§5“台子的材质使用了安山合金，相比于其他的东西它更耐用”")
    ])

    event.add("create:cuckoo_clock",[
        Text.of("§6可爱的布谷鸟时钟，内部使用了精致的精密构件"),
        Text.of("§6每到§5清晨§6和§5傍晚§6，都会准确的为工程师们报时")
    ])

    event.add("create:netherite_diving_helmet",[
        Text.of("§5我从海底出击！"),
        Text.of("§5也可在§6岩浆§5出击！")
    ])

    event.add("create:netherite_diving_boots",[
        Text.of("§5我从海底出击！"),
        Text.of("§5也可在§6岩浆§5出击！")
    ])

    event.add("create:precision_mechanism",[
        Text.of("§6内部使用了精致的精密构件使用机械手序列组装的精密构件，可以看到内部的构造"),
        Text.of("§5一切精密机器必不可少的组装零件")
    ])

    event.add("create:shaft",[
        Text.of("§6用安山合金制作而成的最基础的传动元件"),
        Text.of("§6只要两端§5应力§6传导方向一致，它是不会崩碎的")
    ])

    event.add("",[
        Text.of("")
    ])
//航空学
    event.add("simulated:physics_assembler",Text.of("§6欢迎来到航空学！"))
    event.add("simulated:auger_cog",Text.of("§6赞美阿基米德！"))
    event.add("simulated:auger_shaft",Text.of("§6赞美阿基米德！"))
    event.add("aeronautics:aviators_goggles",Text.of("§6《梦的开始》"))
    event.add("aeronautics:adjustable_burner",Text.of("§6致敬传奇之一立方米的煤炭块能无限烧("))
    event.add("aeronautics:music_disc_cloud_skipper",Text.of("§b此曲只在天上有"))
    event.add("aeronautics:steam_vent",Text.of("§6希望里面的家伙过的还好（"))
    event.add("simulated:steering_wheel",["“瓦尔基里”？","哈哈，1.20.1的传奇罢了"])
//Farmer's Delight
    event.add("farmersdelight:cooked_rice",Text.of("大白饭"))
//AE
    event.add("ae2:tiny_tnt",Text.of("这或许是当年汤姆鼻子上的那个（）"))
    event.add("ae2:mysterious_cube",Text.of("人们在陨石中心发现蚀刻着神秘纹路的物体，这或许是某种电路？"))
    event.add("ae2:silicon_press",Text.of("从神秘方块剥离下的一块特殊的板子，接触空气后硬化后没有发生什么变化"))

    event.add("ae2:calculation_processor_press",[
        Text.of("从神秘方块剥离下的板子，接触空气后硬化并且发生了很大的变化"),
        Text.of("上面有一些晦涩难懂的文字和压印图案"),
        Text.of("“运算....?”")
    ])

    event.add("ae2:engineering_processor_press",[
        Text.of("从神秘方块剥离下的板子，接触空气后硬化并且发生了很大的变化"),
        Text.of("上面有一些晦涩难懂的文字和压印图案"),
        Text.of("“工程....?”")
    ])

    event.add("ae2:logic_processor_press",[
        Text.of("从神秘方块剥离下的板子，接触空气后硬化并且发生了很大的变化"),
        Text.of("上面有一些晦涩难懂的文字和压印图案"),
        Text.of("“逻辑....?”")
    ])

    event.add("ae2:certus_quartz_crystal",[
        Text.of("工程师们在落入这片大地的陨石中找到的晶体"),
        Text.of("经过测试，它可以在它的晶格中存储大量的能量")
    ])

    event.add("ae2:charged_certus_quartz_crystal",[
        Text.of("§0依靠赛特斯石英可以在晶格中存储大量的能量的特性"),
        Text.of("§9网络工程师使用机器给它们充能，充能后发现它拥有了类似半导体的性质")
    ])

    event.add("ae2:fluix_crystal",[
        Text.of("§9在一次偶然中，机械工程师们让石英，红石粉和充过能的赛特斯石英一起被淋了雨"),
        Text.of("§9充能的赛特斯在水的作用下，把石英和红石结合，石英的晶格被重组让它获得了"),
        Text.of("§6具有吸收并转换能量形态的独特能力")
    ])

    event.add("ae2:controller",[
        Text.of("§9§l§o“故科技者，AE为骨，机器为枝”"),
        Text.of("§5§l---------------"),
        Text.of("§6“用天外来物提供的未知科技芯片压印板制成的处理器制造的全新机器，外壳光滑且坚固”---它需要电力！"),
        Text.of("§6“一些机械工程师们发现这个未知科技造物后，涌起了大批去研究此类科技的工程师，他们被大家称为”"),
        Text.of("§1“网络工程师”"),
        Text.of("§5§l---------------"),
        Text.of("§dME控制器 是网络的中心，用于突破8频道限制"),
        Text.of("§d放置后右键查看网络情况")
    ])
})