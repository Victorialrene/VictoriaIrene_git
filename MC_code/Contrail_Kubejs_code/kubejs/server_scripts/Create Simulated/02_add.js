ServerEvents.recipes(event => {
    //物理组装器
    event.shaped(Item.of('simulated:physics_assembler',1),[
        ' A ',
        'BCB',
        'DDD'
    ],{
        A:'minecraft:lever',
        B:'create:andesite_casing',
        C:'create:precision_mechanism',
        D:'create:andesite_alloy'
    }).id("zako_lrene:physics_assembler");

    //姿态传感器
    event.shaped(Item.of('simulated:gimbal_sensor',1),[
        'DAD',
        'BCB',
        'DED'
    ],{
        A:'minecraft:compass',
        B:'minecraft:redstone',
        C:'simulated:gyroscopic_mechanism',
        D:'create:brass_sheet',
        E:'create:precision_mechanism'
    }).id("zako_lrene:gimbal_sensor");

    //导航台
    event.shaped(Item.of('simulated:navigation_table',1),[
        'ABA',
        'ACA',
        'ADA'
    ],{
        A:'create:andesite_casing',
        B:'create:precision_mechanism',
        C:'simulated:gyroscopic_mechanism',
        D:'minecraft:redstone'
    }).id("zako_lrene:navigation_table");

    //油门拉杆
    event.shaped(Item.of('simulated:throttle_lever',1),[
        ' A ',
        ' B ',
        'CDC'
    ],{
        A:'minecraft:lever',
        B:'create:precision_mechanism',
        C:'create:brass_sheet',
        D:'create:andesite_casing'
    }).id("zako_lrene:throttle_lever");

    //模拟传动器
    event.shaped(Item.of('simulated:analog_transmission',1),[
        'ABA',
        'CDC',
        'AEA'
    ],{
        A:'create:brass_sheet',
        B:'create:brass_casing',
        C:'create:shaft',
        D:'create:cogwheel',
        E:'create:precision_mechanism'
    }).id("zako_lrene:analog_transmission");

    //定向齿轮换向器
    event.shaped(Item.of('simulated:directional_gearshift',1),[
        'ABA',
        'CDC',
        'ABA'
    ],{
        A:'create:andesite_casing',
        B:'minecraft:redstone',
        C:'create:shaft',
        D:'create:gearshift'
    }).id("zako_lrene:directional_gearshift");

    //蒸汽喷口
    event.shaped(Item.of('aeronautics:steam_vent',1),[
        'A A',
        'BCB',
        'DED'
    ],{
        A:'create:golden_sheet',
        B:'create:brass_sheet',
        C:'create:blaze_burner',
        D:'minecraft:redstone',
        E:'minecraft:copper_block'
    }).id("zako_lrene:steam_vent");

    //舵轮
    event.shaped(Item.of('simulated:steering_wheel',1),[
        ' A ',
        ' B ',
        ' C '
    ],{
        A:'whimsy_deco:ship_helm',
        B:'create:andesite_casing',
        C:'create:large_cogwheel'
    }).id("zako_lrene:steering_wheel");

    //便携引擎
    event.shaped(Item.of('simulated:red_portable_engine',1),[
        'AAA',
        'BCD',
        'EFF'
    ],{
        A:'create:iron_sheet',
        B:'create:empty_blaze_burner',
        C:'createdieselgenerators:engine_piston',
        D:'simulated:engine_assembly',
        E:'minecraft:blast_furnace',
        F:'create:andesite_casing'
    }).id("zako_lrene:red_portable_engine");

    //磁石
    event.shaped(Item.of('minecraft:lodestone',1),[
        'AAA',
        'BCD',
        'AAA'
    ],{
        A:'minecraft:chiseled_stone_bricks',
        B:'alexscaves:azure_neodymium_ingot',
        C:'minecraft:iron_ingot',
        D:'alexscaves:scarlet_neodymium_ingot',
    }).id("zako_lrene:lodestone");

    //红石磁铁
    event.shaped(Item.of('simulated:redstone_magnet',1),[
        'ABA',
        'CDC',
        'ACA'
    ],{
        A:'minecraft:redstone',
        B:'create:transmitter',
        C:'create:copper_sheet',
        D:'minecraft:lodestone'
    }).id("zako_lrene:redstone_magnet");

    //螺旋桨轴承
    event.shaped(Item.of('aeronautics:propeller_bearing',1),[
        ' A ',
        ' B ',
        ' C '
    ],{
        A:'create:linear_chassis',
        B:'create:iron_sheet',
        C:'simulated:swivel_bearing'
    }).id("zako_lrene:propeller_bearing");

    //陀螺仪螺旋桨轴承
    event.shaped(Item.of('aeronautics:gyroscopic_propeller_bearing',1),[
        ' A ',
        ' B ',
        ' C '
    ],{
        A:'create:linear_chassis',
        B:'simulated:gyroscopic_mechanism',
        C:'simulated:swivel_bearing'
    }).id("zako_lrene:gyroscopic_propeller_bearing");
});