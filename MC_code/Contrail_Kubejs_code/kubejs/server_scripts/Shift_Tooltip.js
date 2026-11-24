// ============================================================
//  效果:
//   - 普通描述 (base): 始终显示, 无需按键
//   - Shift 提示 (shiftHint): 未按 Shift 时显示
//   - Ctrl 提示 (ctrlHint): 未按 Ctrl 时显示
//   - Shift 详情 (desc): 按住 Shift 后追加显示
//   - Ctrl 详情 (ctrlDesc, 可选): 按住 Ctrl 后追加显示
//   按住 Shift+Ctrl 时: 两段详情同时显示, 两段提示同时隐藏
//
//  颜色写法 (任选):
//  1) § 代码: '§6金色 §a绿色 §b青色 §d粉色 §e黄色 §c红色'
//     §0黑 §1深蓝 §2深绿 §3深青 §4深红 §5深紫 §6金 §7灰
//     §8深灰 §9蓝 §a绿 §b青 §c红 §d粉 §e黄 §f白
//     §l粗体 §o斜体 §n下划线 §m删除线 §k乱码 §r重置
//  2) 静态颜色: Text.gold('文字') / Text.red / Text.aqua / Text.green ...
//  3) 链式方法: Text.of('文字').gold().bold().italic(false)
//  4) 自定义色: Text.of('文字').color(Color.of('#FFAA00'))
//  5) 一行混色: Text.of('按 ').append(Text.yellow('Shift')).append(' 查看更多信息')
// ============================================================

// ---------- 在这里添加需要描述的物品 ----------
// items: 物品 ID / 物品标签 / '*' (全部物品, 慎用)
// base : 普通描述, 任何时候都显示 (字符串或文本组件)
// shiftHint : 未按 Shift 时显示的提示 (不写则用默认值)
// ctrlHint  : 未按 Ctrl 时显示的提示 (不写则用默认值)
// desc     : 按住 Shift 后追加显示的描述, 数组内每一项为一行
// ctrlDesc : 按住 Ctrl 后追加显示的描述, 可选, 不写则 Ctrl 无额外内容
const SHIFT_TOOLTIPS = [
    //Minecraft
    {
        items: 'minecraft:iron_ingot',
        base: '我有20铁你怕不怕！'
    },
    {
        items: 'minecraft:redstone',
        base: '雷石东'
    },
    {
        items: 'minecraft:redstone_block',
        base: '雷石东块'
    },
    {
        items: 'minecraft:repeater',
        base: '雷石东直放站'
    },
    {
        items: 'minecraft:conduit',
        base: '导管'
    },
    {
        items: 'minecraft:lightning_rod',
        base: '雷霆之杖'
    },
    //Create
    {
        items: 'create:crushed_raw_iron',
        base: '§6除了粉碎原矿，也可以通过粉碎§e绯红岩§6获得'
    },
    {
        items: 'create:crushed_raw_gold',
        base: '§6除了粉碎原矿，也可以通过粉碎§e赭金砂§6获得'
    },
    {
        items: 'create:crushed_raw_copper',
        base: '§6除了粉碎原矿，也可以通过粉碎§e辉绿岩§6获得'
    },
    {
        items: 'create:crushed_raw_zinc',
        base: '§6除了粉碎原矿，也可以通过粉碎§e皓蓝石§6获得'
    },
    {
        items: 'create:crushing_wheel',
        base: '§4如果不小心掉入粉碎轮，最好祈祷他转速不够能跳出来'
    },
    {
        items: 'create:polished_rose_quartz',
        base: '§6亮晶晶的，拥有不错的导电性'
    },
    {
        items: 'create:rose_quartz',
        base: '§5玫瑰石英没有加工的半成品原料，因为在紫水晶基底上涂上了红石粉，拥有不错的导电性'
    },
    {
        items: 'create:basin',
        base: '“某个鲸鱼娘似乎很喜欢把它扣在头上，还说着什么大白饭”'
    },
    {
        items: 'create:creative_motor',
        base: '§5喂！，你能拿到我说明你是开了创造的！，你这个可恶的骇客！！！'
    },
    {
        items: 'create:creative_crate',
        base: '§5喂！，你能拿到我说明你是开了创造的！，你这个可恶的骇客！！！'
    },
    {
        items: 'create:creative_blaze_cake',
        base: '§5喂！，你能拿到我说明你是开了创造的！，你这个可恶的骇客！！！'
    },
    {
        items: 'create:creative_fluid_tank',
        base: '§5喂！，你能拿到我说明你是开了创造的！，你这个可恶的骇客！！！'
    },
    {
        items: 'create:handheld_worldshaper',
        base: '§5喂！，你能拿到我说明你是开了创造的！，你这个可恶的骇客！！！'
    },
    {
        items: 'create:water_wheel',
        base: '§5没看懂'
    },
    {
        items: 'create:hand_crank',
        base: '§6i狐TV'
    },
    {
        items: 'create:copper_diving_helmet',
        base: '§5我从海底出击！'
    },
    {
        items: 'create:copper_diving_boots',
        base: '§5我从海底出击！'
    },
    {
        items: 'create:netherite_diving_helmet',
        base: [
            '§5我从海底出击！',
            '§5也可在§6岩浆§5出击！'
        ]
    },
    {
        items: 'create:netherite_diving_boots',
        base: [
            '§5我从海底出击！',
            '§5也可在§6岩浆§5出击！'
        ]
    },
    {
        items: 'create:mechanical_press',
        base: '§6加工掉落物或传送带 / 置物台上的物品的配方',
        desc: [
            '§6锵！'
        ]
    },
    {
        items: 'create:cogwheel',
        base: '§5§o工业动力的木之骨骼',
        desc: [
            '§5§o“一切机械动力设备的发端，这是天才般的力量传动装置，它就是齿轮。”'
        ]
    },
    {
        items: 'create:large_cogwheel',
        base: '§5§o工业动力的木之骨骼',
        desc: [
            '§5§o“一切机械动力设备的发端，这是天才般的力量传动装置，它就是齿轮。”'
        ]
    },
    {
        items: 'create:wrench',
        base: '§6§o手执扳手，即可调节整个世界！',
        desc: [
            '§6进入施工现场，必须戴好护目镜',
            '§6扳手的发明原因是工程师们早就厌恶了需要面朝不一样的方向才能把机械的朝向放对的现象了',
            '§5也可以用来改变机械的方向和快捷拆卸机械'
        ],
        ctrlDesc: '§5被特殊材料制作且强化的扳手，拿来敲别人的头似乎效果不错'
    },
    {
        items: 'create:goggles',
        base: '§5工程师们佩戴的精细眼镜',
        desc: [
            '§6工程师护目镜可以戴在头上使用,来查看机械动力元件的各项数据',
            '§6查看动力元件§5应力§6消耗数，即§5应力§6影响；',
            '§6查看动力源§5应力§6产出数，即§5应力§6量；',
            '§6查看 §5溜槽§6 和 §5隧道§6 内的物品；',
            '§6查看流体元件中流体的§5具体信息。'
        ],
        ctrlDesc: [
            '§6镜片被黄铜和上好的皮革所固定，镜片被打磨的透亮且光滑，可以看到机械的具体信息',
            '§6“来自一名叫做艾琳§m§7（呆头羽）§6的工程师的案例”',
            '§6“她在尝试制作一个工作站的时候，把齿轮们的转速调的太大，造成齿轮碎裂”',
            '§6“导致齿轮们的碎片像哈气的哈基米一样吸附到了艾琳的脸上”',
            '§6“自此之后，所有的工程师在制造一些机器的时候都不约而同的开始佩戴护目镜”',
            '§5可以减小这样的意外对工程师的伤害'
        ]
    },
    {
        items: 'create:track',
        base: '§4§o新轨距!,人民铁路为人民！',
        desc: [
            '§6默认情况下列车轨道最多一次性铺设§532格',
            '§6列车轨道 可以穿过下界传送门，在下界传送门前放置列车轨道时，会尝试在另一维度的传送门前创建成对的列车轨道。',
            '§6这使得列车结构可以在§5主世界§6与§5下界§6之间自由穿越。'
        ]
    },
    {
        items: 'create:mechanical_saw',
        base: '可以用于砍树，也可以用于切割物品。',
        desc: [
            '§4高速旋转机械!',
            '§4请不要站在上面或者无防护近距离接触！',
            '§4“小心变成2.5份！！！,低转速也不行！！！”'
        ]
    },
    {
        items: 'create:mechanical_drill',
        base: '§6动力钻头是一种常用于破坏方块和玩家（？）的动力元件',
        desc: [
            '§5“我的钻头可是钻破天际的口牙！”'
        ]
    },
    {
        items: 'create:deployer',
        base: '§6使用机械假手和精密构件制作的动力机械手，你可以在它的手中放入一些东西',
        desc: [
            '§5它可以像玩家一样来灵活地使用手中的§6物品§5，或者§6武器',
            '§5使用了这个机械你就可以悟出一个道理'
        ],
        ctrlDesc: [
            '',
            '§5§o“在身后捅你的未必是群U，也有可能是一个机械手QAQ”————某一名呆头羽的留言'
        ]
    },
    {
        items: 'create:large_water_wheel',
        base: '§5《水车河仙人》'
    },
    {
        items: 'create:depot',
        base: '§6置物台是一种常用的物流元件（相当于一个静止的传送带），主要用于暂存少量物品、存放被加工物品等。',
        desc: [
            '§5§o存入行为：§6玩家手持物品右击置物台顶面可将其存放在置物台上。当置物台为空且上方存在掉落物实体时，置物台会吸收该物品并存入 heldItem。',
            '§6置物台的所有面都可存入物品（如果物流原件支持，且 heldItem 和 outputBuffer 均为空）。存入行为只能存入 heldItem， outputBuffer 不可存入。',
            '-----------------------------------',
            '§5§o取出行为：§6玩家空手右键置物台顶面可将置物台上的物品取出并存入背包（ heldItem 和 outputBuffer 均可取出，如果背包存放不下则会丢出去）。',
            '§6置物台的所有面都可取出物品（如果物流原件支持）',
            '-----------------------------------',
            '§5§o物品交换行为：§6如果玩家手上有物品，置物台上也有物品，右键置物台顶面则将玩家手上的物品存入置物台，之前置物台上的物品存入玩家快捷栏（和交换物品之前的槽位相同）。',
            '-----------------------------------',
            '§5§o配方处理行为：§6只有在 heldItem 中的物品可被加工，如果在 outputBuffer 中则不会加工。'
        ],
        ctrlDesc: [
            '§6大多数的机械加工都在这个上面进行',
            '§5“台子的材质使用了安山合金，相比于其他的东西它更耐用”'
        ]
    },
    {
        items: 'create:millstone',
        base: '§6一种能够研磨物品的作业元件。',
        desc: [
            '§5§o物品加工：§6用来执行“研磨”类的配方，即除了矿物粉碎配方外的粉碎配方。',
            '',
            '§5§o原料输入输出：§6原料可以从上方手动投入石磨中，成品可以通过空手右击石磨取出。石磨中若无成品，空手右击石磨可取出未加工的原料。',
            '§6通过物流方法，可从任意面，对石磨进行自动化输入输出。',
            '§6已输入的原料不会被正常物流方式取出，所以无需担心会将原料也输出。',
            '',
            '§5§o开放式容器:§6石磨是开放式容器，可作为工作盆龙头的输出容器、动力臂的工作目标、动力钻6.0新刷石机制的底部承接容器。'
        ]
    },
    {
        items: 'create:mechanical_mixer',
        base: '§6一种可以搅拌材料的作业元件。', 
        desc: [
            '§5“混合搅拌”：§6为机械动力专为动力搅拌器设计的配方。',
            '-----------------------------------',
            '§5“自动搅拌：§6为自动适配的工作台无序合成配方（即在工作台中进行，对物品摆放位置没有要求的配方）。',
            '-----------------------------------',
            '§5“自动酿造”：§6为自动适配的 §5酿造台§6 配方，并且可以用 1 个原料制作出 4 瓶药水（使用酿造台为 3 瓶）。',
            '§6所有自动酿造配方都需要§5烈焰人燃烧室§6的加热。',
            '-----------------------------------'
        ],
        ctrlDesc: [
            '§6有时机械工程师们会用刚搅拌完药水的搅拌器，去制作甜品，虽然有的时候会不怎么好运上一个人用来搅拌过中毒药水',
            '§4“谁TM用这个酿造过剧毒药水？！”'
        ]
    },
    {
        items: 'create:cuckoo_clock',
        base: '§6每到§5清晨§6和§5傍晚§6，都会准确的为工程师们报时',
        desc: [
            '§6可爱的布谷鸟时钟，内部使用了精致的精密构件'
        ]
    },
    {
        items: 'create:redstone_link',
        base: '§6工程师们在无线电领域最跨时代的发明！',
        desc: [
            '§5无线红石信号终端让红石链接从从前需要红石物理连接',
            '§5变成了“空气中皆是互不干扰的红石”！'
        ]
    },
    {
        items: 'create:linked_controller',
        base: '§6工程师们的小发明',
        desc: [
            '§6无线红石遥控器的发明来源于一名红石工程师的脑洞发明',
            '§5本质上它是由无线红石信号终端改造而来'
        ]
    },
    {
        items: 'create:mechanical_arm',
        base: '§6灵活的物流方式，可以在工作范围内的任意两点间移动物品',
        desc: [
            '§e/****************  §6Σ§5 & §6∏§e *****************/',
            '§5零幺二进，与或是非；丝玄之轴，数合万千。',
            '§5差和微积，泛函变分；须臾方寸，算术奥艰。',
            '§5机械之灵，欲释其怒；不朽精钢，待拭虏血。',
            '§5万机之神，智识无边；佑吾克敌，雄霸宇间。',
            '§e/***************** §6A§5 || §6Ω§e ****************/'
        ],
        ctrlDesc: [
            '§7若播放音乐，机魂大悦！'
        ]
    },
    {
        items: 'create:extendo_grip',
        base: '§6内部使用精密构件的机械假手，通过扣动扳机驱动内部的机械结构从而可以让使用者获得更远的交互距离',
        desc: [
            '§6有时使用者每次扣动扳机的力度与上次的力度不一致，可能导致内部机械结构的老化',
            '§6推荐制作一些§e背罐§6储存压缩空气，用压缩空气来驱动这个装置'
        ]
    },
    {
        items: 'create:potato_cannon',
        base: '§6一名工程师在茶余饭后做出的发射器玩具,有时内部因食物残渣可能导致内部结构老化',
        desc: [
            '§6可以发射各种各样的固体食物，但注意！',
            '§4不要往其他人头上人射！',
            '§6推荐制作一些§e背罐§6储存压缩空气，用压缩空气来驱动这个装置'
        ],
        ctrlDesc: [
            '§6使用熟马铃薯可以附带火焰效果'
        ]
    },
    {
        items: 'create:shaft',
        base: '§6传动杆是用于轴向传递旋转力的传动元件。',
        desc: [
            '§6传动杆是传递旋转力的最基本，最便宜的方式。在应力足够的情况下，传动杆能带动连接的其他轴向元件。'
        ],
        ctrlDesc: [
            '§6用安山合金制作而成的最基础的传动元件',
            '§6只要两端§5应力§6传导方向一致，它是不会崩碎的'
        ]
    },
    {
        items: 'create:mechanical_crafter',
        base: '§6一种能够用于合成物品的作业元件',
        desc: [
            '§6工程师们用于合成大型复杂机械或者自动化合成所使用的元件',
            '§6使用§5工作台§6加上动力源小小地改装了一下',
            '§6内部除了有提供动力的元件以外，更添加了§5真空管§6用于简单的运算行为'
        ],
        ctrlDesc: [
            '§7§o你似乎看到它的背面有一个小纸条',
            '§7§o注：“大于3X3大小的动力合成器需要‘伸缩机械手’来辅助放入物品”'
        ]
    },
    {
        items: 'create:sequenced_gearshift',
        base: '§6可以在面板中调整§5应力传输与方向行为§6的元件',
        desc: [
            '§6工程师们在基础的齿轮箱中加入了§5智能构件§6和§5集成构件§6进行改造',
            '§6其可以对其编辑程序并执行一系列精细的的动力传动程序，如控制旋转角度、活塞的推动距离和转向等功能。',
            '§6使用红石信号启动。内有多个程序槽位，可以连续执行多个步骤。',
            ''
        ],
        ctrlDesc: [
            '§6可编程齿轮箱有两个传动端口，两端都可成为§5输入端§6/§5输出端§6。',
            '§6GUI 每行代表一个步骤，受到红石信号激活时会按序执行步骤。§5每行有三个可项目§6，以设置每步骤的程序。',
            '§5第一列§6可以设置该步骤执行的程序',
            '',
            '§5以特定的角度进行旋转',
            '§6根据设置的角度旋转一次，所需时间以§5输入端的转速§6决定。',
            '§5§l-----------------------------------',
            '§5开始驱动活塞/软管滑轮/起重机',
            '§6驱动活塞，设置推动或拉回的距离。此项适用于§5动力活塞、绳索滑轮、软管滑轮、起重机杆/取物器。§6所需时间以§5输入端的转速§6决定。',
            '§5§l------------------------------------',
            '§5时间延迟',
            '§6设置时间延迟。最低 §5 1 tick§6 ，§5最高 30s §6。',
            '§5§l-----------------------------------',
            '§5等待新的红石脉冲',
            '§6等待再次收到§5红石脉冲§6才进行下一步。',
            '§5§l-----------------------------------',
            '§5结束',
            '§6结束该程序，默认会在最后一项步骤之后。',
            '§5§l-----------------------------------',
            '§5第二列可以设置该步骤的数值。',
            '',
            '§5角度',
            '§6仅在该步骤为“以特定的角度进行旋转”时显示此设置，单位为 ° 。最大值为 360° 。',
            '§5§l-----------------------------------',
            '§5距离',
            '§6仅在该步骤为§5“开始驱动活塞/软管滑轮/起重机”§6时显示此设置，单位为 m 。最大值为 128m 。',
            '§5§l-----------------------------------',
            '§5时间',
            '§6仅在该步骤为§5“时间延迟”§6时显示此设置，单位为ticks，大于 20ticks 时单位变为 s 。最大值为 30s 。',
            '§5§l-----------------------------------',
            '§5第三列可设置该步骤的转向及转速，仅在该步骤为§6“以特定的角度进行旋转”§5或§6“开始驱动活塞/软管滑轮/起重机”§5时显示此设置。'            
        ]
    },
    {
        items: 'create:controls',
        base: '§6列车驾驶台允许§5玩家/生物§6操控列车结构。',
        desc: '§6注：此元件对§5物理化列车§6没有作用'
    },
    {
        items: 'create:precision_mechanism',
        base: '§6一种需要经过复杂工序才能制作的高级构件，内部的齿轮构造精密且复杂',
        desc: [
            '§6“是时候考验一下你的产线设计了。”',
            '§6每一名初学工程师进阶必然要接触的物品,同时也是高级机械的材料'
        ]
    },
    //Create:contrail
    {
        items: 'contrail:integrated_circuit',
        base: '§6以§5青金合金板§6为底板，所制作的简单微电路控制器',
        desc: [
            '§6工程师使用红石，石英和金粒再配合机械手组装的元件，',
            '§6限制于材料，这种微控制器只能控制简单的红石的行为，如果想控制动力元件还是有些困难'
        ]
    },
    {
        items: 'contrail:integrated_mechanism',
        base: '§6在§5精密构件§6与§5集成电路§6为基本，所迭代的更高级的构件',
        desc: [
            '§6以前使用青金合金板§6为底板制作的微控制器只能实现红石行为，',
            '§6现在工程师们在内部加入了一些精密构件的思路和零件，使得§5集成电路§6可以控制动力元件'
        ]
    },
    {
        items: 'contrail:calculation_mechanism',
        base: '§6与集成构件不同的是，它不兼并像微控制器有更多的功能，它只负责运算',
        desc: [
            '§6通过简单的红石和集成电路，完成是与否的任务'
        ]
    },
    {
        items: 'contrail:inductive_mechanism',
        base: '使用机械传动的简单构件',
        desc: [
            '纯粹的机械结构，内部还涂有一些粘合剂，工程师们发现它用来管理物流元件非常实用'
        ]
    },
    {
        items: 'contrail:sealed_mechanism',
        base: '§6用于密封一些需要储存§5液体§6或者§5气体§6的低高压容器所用的构件'
    },
    //AE
    {
        items: 'ae2:network_tool',
        base:  [
            '§5§l---------------',
            '§9网络工具是工程师们必不可少的工具，它能显示网络诊断信息，也能§d存储升级卡',
            '§9它仍保留了扳手拆卸§d子部件§9等事务的能力，但无法再旋转方块',
            '§5§l---------------',
            '§9网络工具有9个升级卡存储槽位，当其在物品栏内时，这些升级卡可直接在任意AE2设备UI中访问'
        ],
        desc: [
            '§5§l---------------',
            '§9·与右击ME控制器类似，手持网络工具右击网络任意一处会显示诊断信息窗口。此窗口会显示：',
            '§9·网络中频道占用量',
            '§9·全局切换网络能量单位（AE，E/FE）',
            '§9·网络中当前网络总量和最大容量',
            '§9·能量流入和使用量',
            '§9·网络中所有设备的组件的列表',
            '§5§l---------------',
            '§9此窗口在搭建子网络时很有用，可用于判断两端线缆是否处于同一网络'
        ],
        ctrlDesc: [
            '§9手持网络工具时伪装板会自动隐藏',
            '§9此时可以直接与隐藏的隐藏板后方的方块交互，无需取下隐藏板'
        ]
    },
    {
        items: 'ae2:tiny_tnt',
        base: '§9这或许是当年汤姆鼻子上的那个（）'
    },
    {
        items: 'ae2:mysterious_cube',
        base: '§9人们在陨石中心发现蚀刻着神秘纹路的物体，这或许是某种电路？'
    },
    {
        items: 'ae2:silicon_press',
        base: '§9从神秘方块剥离下的一块特殊的板子，接触空气后硬化后没有发生什么变化'
    },
    {
        items: 'ae2:calculation_processor_press',
        base: '§9从神秘方块剥离下的板子，接触空气后硬化并且发生了很大的变化',
        desc: [
            '§5上面有一些晦涩难懂的文字和压印图案',
            '§5“运算....?”'
        ]
    },
    {
        items: 'ae2:engineering_processor_press',
        base: '§9从神秘方块剥离下的板子，接触空气后硬化并且发生了很大的变化',
        desc: [
            '§5上面有一些晦涩难懂的文字和压印图案',
            '§5“工程....?”'
        ]
    },
    {
        items: 'ae2:logic_processor_press',
        base: '§9从神秘方块剥离下的板子，接触空气后硬化并且发生了很大的变化',
        desc: [
            '§5上面有一些晦涩难懂的文字和压印图案',
            '§5“逻辑....?”'
        ]
    },
    {
        items: 'ae2:certus_quartz_crystal',
        base: '§9工程师们在落入这片大地的陨石中找到的晶体',
        desc: [
            '§5经过电气测试，它可以在它的晶格中存储大量的能量'
        ]
    },
    {
        items: 'ae2:charged_certus_quartz_crystal',
        base: '§9工程师们发现依靠赛特斯石英可以在晶格中存储大量的能量的特性',
        desc: [
            '§5网络工程师使用机器给它们充能，充能后发现它拥有了类似半导体的性质'
        ]
    },
    {
        items: 'ae2:fluix_crystal',
        base: '§5福鲁伊克斯水晶具有吸收并转换能量形态的特殊能力，也因此是所有物质能量科技的基石之所在',
        desc: [
            '§9在一次偶然中，机械工程师们让石英，红石粉和充过能的赛特斯石英一起被淋了雨',
            '§9充能的赛特斯在水的作用下，把石英和红石结合，石英的晶格被重组让它获得了',
            '§6具有吸收并转换能量形态的独特能力'
        ]
    },
    {
        items: 'ae2:quartz_fiber',
        base: '§9工程师们使用赛特斯石英纤维制作的导线',
        desc: [
            '§9赛特斯石英仅仅传输能量，不传输§d网络§9，因此石英纤维是§d线缆子部件'
        ],
        ctrlDesc: [
            '§4“各位工程师注意！，赛特斯石英在融化封装过程中，石英纤维对肺部有不可逆的损伤！！！”'
        ]
    },
    {
        items: 'ae2:toggle_bus',
        base: '§9网络工程师们用来控制ME网络O/I的设备',
        desc: [
            '§9触发总线是与§d福鲁伊克斯色ME玻璃线缆§9和其他线缆功能类型类似的总线，区别在于其连接状态会受红石信号调控',
            '§9可用其连通或切断§dME网络§9的连接',
            '§5§l---------------',
            '§9触发总线会在收到红石信号时联通连接，ME反相触发总线行为相反，会在收到红石信号时断开连接',
            '§5§l---------------',
            '§4需要注意！，切换连接状态会导致网络重启并重新统计所连的设备！'
        ],
        ctrlDesc: '§9它们是§d线缆子部件'
    },
    {
        items: 'ae2:inverted_toggle_bus',
        base: '§9网络工程师们用来控制ME网络O/I的设备',
        desc: [
            '§9触发总线是与§d福鲁伊克斯色ME玻璃线缆§9和其他线缆功能类型类似的总线，区别在于其连接状态会受红石信号调控',
            '§9可用其连通或切断§dME网络§9的连接',
            '§5§l---------------',
            '§9触发总线会在收到红石信号时联通连接，ME反相触发总线行为相反，会在收到红石信号时断开连接',
            '§5§l---------------',
            '§4需要注意！，切换连接状态会导致网络重启并重新统计所连的设备！'
        ],
        ctrlDesc: '§9它们是§d线缆子部件'
    },
    {
        items: 'ae2:import_bus',
        base: '§9ME网络用来从§d其所连接的容器§9中抽出物品和流体，并存入网络存储的线缆',
        desc: [
            '§d过滤',
            '§9默认情况下，输入总线会输入所有其能访问的事物。放入其过滤槽的物品会加入白名单，也即只会输入其中指名的事物。',
            '§9如果没有所需的流体或者物品，可从JEI/REI中拖拽以放入过滤槽',
            '§9用流体容器（如铁桶或流体储罐）右击即可将流体设为过滤，而非铁桶和储罐物品。',
            '§5§l---------------',
            '§d升级',
            '§5输入总线支持以下升级：',
            '§5容量卡§9增加过滤槽位',
            '§5加速卡§9增加每次传输时移动的物品数',
            '§5模糊卡§9使得总线能按耐久度或忽略物品NBT过滤',
            '§5反相卡§9将白名单变为黑名单',
            '§5红石卡§9加入红石控制功能，使其会在高信号，低信号，遇脉冲时启动'
        ],
        ctrlDesc: [
            '§9为减少卡顿，输入总线会在近期未输入的情况下进入某种“睡眠模式”，此时其工作速度较慢，并会在其输入物品时被唤醒',
            '§9并逐渐恢复进入正常状态（每秒传输4次）',
            '§9输入总线是§d线缆子部件'
        ]
    },
    {
        items: 'ae2:export_bus',
        base: '§9ME网络用来从§d网络存储§9中抽出物品和流体，并存入其所连接的容器的线缆',
        desc: [
            '§d过滤',
            '§9默认情况下，输出总线不会输出任何东西。放入其过滤槽的物品会加入白名单，也即只会输出其中指名的事物。',
            '§9如果没有所需的流体或者物品，可从JEI/REI中拖拽以放入过滤槽',
            '§9用流体容器（如铁桶或流体储罐）右击即可将流体设为过滤，而非铁桶和储罐物品。',
            '§5§l---------------',
            '§d升级',
            '§5输出总线支持以下升级：',
            '§5容量卡§9增加过滤槽位数，并给予设置输出输入顺序的功能',
            '§5加速卡§9增加每次传输时移动的物品数',
            '§5模糊卡§9使得总线能按耐久度或忽略物品NBT过滤',
            '§5合成卡§9使总线能向§5自动合成§9系统发送所需物品的请求；可设置为使用或不使用已存储物品',
            '§5红石卡§9加入红石控制功能，使其会在高信号，低信号，遇脉冲时启动'
        ],
        ctrlDesc: [
            '§9为减少卡顿，输入总线会在近期未输入的情况下进入某种“睡眠模式”，此时其工作速度较慢，并会在其输入物品时被唤醒',
            '§9并逐渐恢复进入正常状态（每秒传输4次）',
            '§9输入总线是§d线缆子部件'
        ]
    },
    {
        items: 'ae2:controller',
        base: '§9§l§o“故科技者，AE为骨，机器为枝”',
        desc: [
            '§5§l---------------',
            '§6“用天外来物提供的未知科技芯片压印板制成的处理器制造的全新机器，外壳光滑且坚固”---它需要电力！',
            '§6“一些机械工程师们发现这个未知科技造物后，涌起了大批去研究此类科技的工程师，他们被大家称为”',
            '§1“网络工程师”',
            '§5§l---------------',
            '§dME控制器 是网络的中心，用于突破8频道限制',
        ],
        ctrlDesc: '§d放置后右键查看网络情况'
    }
]

// ---------- 条目检查: 自动跳过缺 items 的条目, 重复条目给出警告 ----------
const VALID_ENTRIES = []
const SEEN_ITEMS = {}
SHIFT_TOOLTIPS.forEach((entry, index) => {
    if (!entry || entry.items === undefined || entry.items === null || entry.items === '') {
        console.warn(`[shift_tooltips] 第 ${index + 1} 个条目缺少 items 字段, 已跳过`)
        return
    }
    if (entry.items === '*') {
        console.warn('[shift_tooltips] 有条目使用了 * , 会给所有物品添加提示, 请确认这是你想要的')
    }
    const key = JSON.stringify(entry.items)
    if (SEEN_ITEMS[key]) {
        console.warn(`[shift_tooltips] items 为 ${key} 的条目出现了多次, 会导致提示显示两遍, 请删除重复条目`)
    }
    SEEN_ITEMS[key] = true
    VALID_ENTRIES.push(entry)
})

// 默认提示语: 条目里不写 shiftHint / ctrlHint 时使用
const DEFAULT_SHIFT_HINT = '按 Shift 查看更多信息'
const DEFAULT_CTRL_HINT = '按 Ctrl 查看更多信息'

// ---------- 以下为注册代码, 一般无需修改 ----------
// 新版 KubeJS (2101.7.2+) 使用 modifyTooltips;
// 旧版构建 (只有 ItemEvents.tooltip) 自动退回 addAdvanced 写法, 不会报错。
function asLines(lines) {
    return Array.isArray(lines) ? lines : [lines]
}

// 判断有没有实际内容 (空字符串/空数组算没有)
function hasLines(lines) {
    if (lines === undefined || lines === null) return false
    return asLines(lines).some(line => line !== '' && line !== null && line !== undefined)
}

if (ItemEvents.modifyTooltips) {
    ItemEvents.modifyTooltips(event => {
        VALID_ENTRIES.forEach(entry => {
            if (entry.base) event.add(entry.items, entry.base)
            if (hasLines(entry.desc)) {
                event.add(entry.items, { shift: false }, Text.darkGray(entry.shiftHint || DEFAULT_SHIFT_HINT).italic(false))
                event.add(entry.items, { shift: true }, entry.desc)
            }
            if (hasLines(entry.ctrlDesc)) {
                event.add(entry.items, { ctrl: false }, Text.darkGray(entry.ctrlHint || DEFAULT_CTRL_HINT).italic(false))
                event.add(entry.items, { ctrl: true }, entry.ctrlDesc)
            }
        })
    })
} else {
    ItemEvents.tooltip(tooltip => {
        VALID_ENTRIES.forEach(entry => {
            const ids = Array.isArray(entry.items) ? entry.items : [entry.items]
            ids.forEach(id => {
                tooltip.addAdvanced(id, (item, advanced, text) => {
                    if (entry.base) asLines(entry.base).forEach(line => text.add(line))
                    const hasDesc = hasLines(entry.desc)
                    const hasCtrlDesc = hasLines(entry.ctrlDesc)
                    const isShift = tooltip.shift === true
                        || (typeof tooltip.isShift === 'function' && tooltip.isShift())
                    const isCtrl = tooltip.ctrl === true
                        || (typeof tooltip.isCtrl === 'function' && tooltip.isCtrl())
                    if (isShift && hasDesc) {
                        asLines(entry.desc).forEach(line => text.add(line))
                    }
                    if (isCtrl && hasCtrlDesc) {
                        asLines(entry.ctrlDesc).forEach(line => text.add(line))
                    }
                    if (!isShift && hasDesc) {
                        text.add(Text.darkGray(entry.shiftHint || DEFAULT_SHIFT_HINT).italic(false))
                    }
                    if (!isCtrl && hasCtrlDesc) {
                        text.add(Text.darkGray(entry.ctrlHint || DEFAULT_CTRL_HINT).italic(false))
                    }
                })
            })
        })
    })
}

console.info(`[shift_tooltips] 脚本已加载, 有效条目 ${VALID_ENTRIES.length} 个`)
