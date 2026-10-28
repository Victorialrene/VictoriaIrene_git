ServerEvents.recipes(event => {
    event.shaped(Item.of('create:cuckoo_clock',1),[
        'ABA',
        'ACA',
        'ADA'
    ],{
        A:'create:andesite_casing',
        B:'minecraft:compass',
        C:'create:precision_mechanism',
        D:'create:shaft'
    });

    event.shaped(Item.of('create:mysterious_cuckoo_clock',1),[
        'ABA',
        'ACA',
        'ADA'
    ],{
        A:'create:andesite_casing',
        B:'minecraft:compass',
        C:'create:precision_mechanism',
        D:'minecraft:tnt'
    });

    event.shaped(Item.of('create:nixie_tube',1),[
        '   ',
        'A A',
        'B B'
    ],{
        A:'create:electron_tube',
        B:'create:iron_sheet'
    });

    event.shaped(Item.of('create:electron_tube',1),[
        ' A ',
        ' B ',
        ' C '
    ],{
        A:'create:polished_rose_quartz',
        B:'minecraft:redstone_torch',
        C:'create:iron_sheet'
    });

    event.shaped(Item.of('create:rose_quartz',1),[
        'ABC',
        'BCC',
        'CCC'
    ],{
        A:'minecraft:amethyst_shard',
        B:'minecraft:quartz',
        C:'minecraft:redstone'
    })

    event.recipes.create.mixing(
        'minecraft:amethyst_block',
        [
            Fluid.of('minecraft:lava',500),
            'minecraft:granite'
        ]
    )
//搅拌合成
//Farmer's Delight
    event.recipes.create.mixing(
        'farmersdelight:cooked_rice',
        [
            Fluid.of('minecraft:water',250),
            Ingredient.of('minecraft:bowl'),
            Ingredient.of([
                'farmersdelight:rice',
                'kaleidoscope_cookery:rice'
            ])
        ]
    ).heated()

    event.recipes.create.mixing(
        'kaleidoscope_cookery:cooked_rice',
        [
            Fluid.of('minecraft:water',250),
            Ingredient.of('minecraft:bowl'),
            Ingredient.of([
                'farmersdelight:rice',
                'kaleidoscope_cookery:rice'
            ])
        ]
    ).heated()

    event.recipes.create.mixing(
        Item.of('farmersdelight:cooked_rice',5),
        [
            Fluid.of('minecraft:water',1000),
            Item.of('minecraft:bowl',5),
            Item.of('farmersdelight:rice',5)
        ]
    ).heated()

    event.recipes.create.mixing(
        Item.of('farmersdelight:cooked_rice',5),
        [
            Fluid.of('minecraft:water',1000),
            Item.of('minecraft:bowl',5),
            Item.of('kaleidoscope_cookery:rice',5)
        ]
    ).heated()

    event.recipes.create.mixing(
        Item.of('kaleidoscope_cookery:cooked_rice',5),
        [
            Fluid.of('minecraft:water',1000),
            Item.of('minecraft:bowl',5),
            Item.of('farmersdelight:rice',5)
        ]
    ).heated()

    event.recipes.create.mixing(
        Item.of('kaleidoscope_cookery:cooked_rice',5),
        [
            Fluid.of('minecraft:water',1000),
            Item.of('minecraft:bowl',5),
            Item.of('kaleidoscope_cookery:rice',5)
        ]
    ).heated()
//动力合成
//Mek
    event.recipes.create.mechanical_crafting('mekanism:digital_miner',[
        'ABCBA',
        'BDEDB',
        'AFGFA',
        'BHAHB',
        'ABIBA'
    ],{
        A:'mekanism:steel_casing',
        B:'mekanism:energy_tablet',
        C:'mekanism:ultimate_control_circuit',
        D:'mekanism:alloy_atomic',
        E:'mekanism:robit',
        F:'mekanism:logistical_sorter',
        G:'mekanism:ultimate_energy_cube',
        H:'mekanism:teleportation_core',
        I:'mekanism:hdpe_rod'
    })

    event.recipes.create.mechanical_crafting('mekanism:electric_pump',[
        ' A ',
        'BCB',
        'DED',
        'FFF'
    ],{
        A:'minecraft:bucket',
        B:'mekanism:alloy_infused',
        C:'mekanism:energy_tablet',
        D:'create:copper_sheet',
        E:'mekanism:steel_casing',
        F:'mekanism:ingot_osmium'
    })
//AE
    event.recipes.create.mechanical_crafting('neoecoae:integrated_working_station',[
        'ABCBA',
        'BDEFB',
        'RGHIR',
        'BJEKB',
        'ABTBA'
    ],{
        A:'neoecoae:aluminum_alloy_casing',
        B:'neoecoae:aluminum_alloy_ingot',
        C:'ae2:engineering_processor',
        D:'ae2:molecular_assembler',
        E:'neoecoae:superconducting_processor',
        F:'ae2:condenser',
        G:'ae2:cell_workbench',
        H:'ae2:controller',
        I:'ae2:inscriber',
        J:'ae2:256k_crafting_storage',
        K:'ae2:charger',
        T:'ae2:crafting_monitor',
        R:'mekanism:ultimate_control_circuit'
    })
});