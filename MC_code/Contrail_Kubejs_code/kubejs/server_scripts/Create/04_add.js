ServerEvents.recipes(event => {
    event.shapeless('mekanism:block_tin',Item.of('contrail:tin_ingot',9))
    event.shapeless(Item.of('contrail:tin_ingot',9),'mekanism:block_tin')
    event.shapeless('contrail:mithril_ingot',Item.of('contrail:mithril_nugget',9))
    event.shapeless(Item.of('contrail:mithril_nugget',9),'contrail:mithril_ingot')
    event.shapeless('contrail:bronze_ingot',Item.of('contrail:bronze_nugget',9))
    event.shapeless(Item.of('contrail:bronze_nugget',9),'contrail:bronze_ingot')
    event.shapeless('contrail:steel_ingot',Item.of('contrail:steel_nugget',9))
    event.shapeless(Item.of('contrail:steel_nugget',9),'contrail:steel_ingot')
    event.shapeless('contrail:tin_ingot',Item.of('contrail:tin_nugget',9))
    event.shapeless(Item.of('contrail:tin_nugget',9),'contrail:tin_ingot')
    event.recipes.create.pressing(CreateItem.of('contrail:mithril_sheet',1.0),Ingredient.of('contrail:mithril_ingot'))
    event.recipes.create.pressing(CreateItem.of('contrail:bronze_sheet',1.0),Ingredient.of('contrail:bronze_ingot'))
    event.recipes.create.pressing(CreateItem.of('contrail:steel_sheet',1.0),Ingredient.of('contrail:steel_ingot'))
    event.recipes.create.pressing(CreateItem.of('contrail:tin_sheet',1.0),Ingredient.of('contrail:tin_ingot'))
    event.recipes.create.pressing(CreateItem.of('contrail:lapis_sheet',1.0),Ingredient.of('contrail:lapis_alloy'))
    event.recipes.create.pressing(CreateItem.of('contrail:zinc_sheet',1.0),Ingredient.of('create:zinc_ingot'))
    event.recipes.create.pressing(CreateItem.of('contrail:shadow_steel_sheet',1.0),Ingredient.of('contrail:shadow_steel'))
    event.recipes.create.pressing(CreateItem.of('contrail:refined_radiance_sheet',1.0),Ingredient.of('contrail:fined_rediance'))
    event.recipes.create.pressing(CreateItem.of('contrail:blaze_brass_sheet',1.0),Ingredient.of('contrail:blaze_gold'))
    event.recipes.create.sandpaper_polishing(CreateItem.of('contrail:polished_spectral_ruby',1.0),Ingredient.of('contrail:spectral_ruby'))

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

    event.shaped(Item.of('create:copper_backtank',1),[
        'ABA',
        'CDC',
        ' E '
    ],{
        A:'create:andesite_alloy',
        B:'create:shaft',
        C:'minecraft:copper_ingot',
        D:'contrail:sealed_mechanism',
        E:'minecraft:copper_block'
    })

    event.shaped(Item.of('create:mechanical_arm',2),[
        'AB ',
        'A  ',
        'CDE'
    ],{
        A:'create:brass_sheet',
        B:'create:andesite_alloy',
        C:'contrail:integrated_mechanism',
        D:'contrail:calculation_mechanism',
        E:'create:brass_casing'
    })

    event.shaped(Item.of('create:rotation_speed_controller',1),[
        'ABA',
        'ACA',
        'DED'
    ],{
        A:'create:brass_ingot',
        B:'contrail:integrated_circuit',
        C:'contrail:integrated_mechanism',
        D:'create:shaft',
        E:'create:precision_mechanism'
    })

    event.shaped(Item.of('create:empty_blaze_burner',1),[
        ' A ',
        'ABA',
        ' A '
    ],{
        A:'create:iron_sheet',
        B:'contrail:ember_alloy'
    })

    event.shaped(Item.of('create:smart_fluid_pipe',1),[
        ' A ',
        ' B ',
        ' C '
    ],{
        A:'contrail:integrated_mechanism',
        B:'create:fluid_pipe',
        C:'create:brass_sheet'
    })

    event.shaped(Item.of('create:smart_chute',1),[
        ' A ',
        ' B ',
        ' C '
    ],{
        A:'create:brass_sheet',
        B:'create:chute',
        C:'contrail:integrated_mechanism'
    })

    event.shaped(Item.of('create:sequenced_gearshift',1),[
        'EAE',
        'BCB',
        'EDE'
    ],{
        A:'contrail:integrated_mechanism',
        B:'create:cogwheel',
        C:'create:brass_casing',
        D:'contrail:calculation_mechanism',
        E:'minecraft:redstone'
    })

    event.shaped(Item.of('create:content_observer',1),[
        ' A ',
        'BCD',
        ' E '
    ],{
        A:'create:brass_sheet',
        B:'contrail:integrated_mechanism',
        C:'minecraft:observer',
        D:'contrail:calculation_mechanism',
        E:'create:brass_casing'
    })

    event.shaped(Item.of('create:stockpile_switch',1),[
        ' A ',
        ' B ',
        ' C '
    ],{
        A:'contrail:integrated_mechanism',
        B:'create:brass_casing',
        C:'minecraft:comparator'
    })

    event.shaped(Item.of('create:track_signal',1),[
        'AB ',
        '   ',
        '   '
    ],{
        A:'create:railway_casing',
        B:'contrail:calculation_mechanism'
    })

    event.shaped(Item.of('create:track_observer',1),[
        ' A ',
        ' B ',
        ' C '
    ],{
        A:'minecraft:stone_pressure_plate',
        B:'create:railway_casing',
        C:'contrail:calculation_mechanism'
    })

    event.shaped(Item.of('create:package_frogport',1),[
        'ABA',
        'ACA',
        'DED'
    ],{
        A:'create:iron_sheet',
        B:'minecraft:slime_ball',
        C:'create:item_vault',
        D:'create:andesite_alloy',
        E:'contrail:inductive_mechanism'
    })

    event.shaped(Item.of('create:stock_link',1),[
        ' A ',
        'BCD',
        '   '
    ],{
        A:'create:transmitter',
        B:'contrail:integrated_mechanism',
        C:'create:item_vault',
        D:'contrail:calculation_mechanism'
    })

    event.shaped(Item.of('create:display_link',1),[
        ' A ',
        'BCD',
        '   '
    ],{
        A:'create:transmitter',
        B:'contrail:calculation_mechanism',
        C:'create:brass_casing',
        D:'create:electron_tube'
    })

    event.shaped(Item.of('create:factory_gauge',4),[
        'AB ',
        'C  ',
        '   '
    ],{
        A:'minecraft:quartz',
        B:'contrail:integrated_mechanism',
        C:'create:precision_mechanism'
    })

    event.shaped(Item.of('create:pulse_timer',1),[
        ' A ',
        'BCD',
        'EEE'
    ],{
        A:'create:brass_sheet',
        B:'minecraft:amethyst_shard',
        C:'contrail:integrated_circuit',
        D:'minecraft:redstone_torch',
        E:'minecraft:stone'
    })

    event.shaped(Item.of('create_connected:overstress_clutch',1),[
        'AB ',
        'CD ',
        '   '
    ],{
        A:'create:andesite_casing',
        B:'create:iron_sheet',
        C:'create:shaft',
        D:'contrail:calculation_mechanism'
    })

    event.shaped(Item.of('create_connected:freewheel_clutch',1),[
        'AB ',
        'CD ',
        ' E '
    ],{
        A:'create:andesite_casing',
        B:'create:iron_sheet',
        C:'create:shaft',
        D:'contrail:calculation_mechanism',
        E:'create:flywheel'
    })

    event.shaped(Item.of('create_connected:kinetic_battery',8),[
        'ABA',
        'ACA',
        'DED'
    ],{
        A:'create:brass_sheet',
        B:'create:precision_mechanism',
        C:'contrail:integrated_mechanism',
        D:'create:iron_sheet',
        E:'minecraft:redstone'
    })

    event.shaped(Item.of('create_connected:inventory_access_port',1),[
        ' A ',
        ' B ',
        ' C '
    ],{
        A:'create:brass_casing',
        B:'create:chute',
        C:'contrail:calculation_mechanism'
    })

    event.shaped(Item.of('create_connected:sequenced_pulse_generator',1),[
        'AB ',
        'ACD',
        'EEE'
    ],{
        A:'create:electron_tube',
        B:'contrail:integrated_circuit',
        C:'create:brass_sheet',
        D:'minecraft:redstone_torch',
        E:'minecraft:stone'
    })

    event.shaped(Item.of('contrail:lapis_alloy',1),[
        'AB ',
        'BA ',
        '   '
    ],{
        A:'contrail:tin_nugget',
        B:'minecraft:lapis_lazuli'
    })

    event.shaped(Item.of('contrail:ember_alloy',1),[
        'AB ',
        'BC ',
        '   '
    ],{
        A:'create:cinder_flour',
        B:'minecraft:charcoal',
        C:'minecraft:blaze_powder'
    })

    event.shaped(Item.of('computercraft:pocket_computer_advanced',1),[
        'AAA',
        'BCB',
        'DEF'
    ],{
        A:'mekanism:hdpe_sheet',
        B:'mekanism:ultimate_control_circuit',
        C:'contrail:integrated_circuit',
        D:'mekanism:network_reader[mekanism:energy={energy_containers:[L;60000L]}]',
        E:'mekanism:energy_tablet[mekanism:energy={energy_containers:[L;1000000L]}]',
        F:'mekanism:dictionary'
    });

    event.shaped(Item.of('computercraft:pocket_computer_normal',1),[
        'AAA',
        'BCB',
        'DED'
    ],{
        A:'minecraft:iron_ingot',
        B:'mekanism:advanced_control_circuit',
        C:'contrail:integrated_circuit',
        D:'mekanism:ingot_osmium',
        E:'mekanism:energy_tablet[mekanism:energy={energy_containers:[L;1000000L]}]'
    });

    event.recipes.create.mixing(
        'minecraft:amethyst_block',
        [
            Fluid.of('minecraft:lava',500),
            'minecraft:granite'
        ]
    )
    
//搅拌合成
//Create

    event.recipes.create.mixing(
        'contrail:steel_ingot',
        [
            Ingredient.of('minecraft:iron_ingot',2),
            Ingredient.of('minecraft:coal')
        ]
    ).heated()

    event.recipes.create.mixing(
        'contrail:mithril_ingot',
        [
            Fluid.of('minecraft:lava',500),
            Ingredient.of('create:experience_nugget',4),
            Ingredient.of(['contrail:steel_ingot','createbigcannons:steel_ingot','mekanism:ingot_steel']),
            Ingredient.of('contrail:bronze_ingot'),
            Ingredient.of('contrail:chromatic_compound')
        ]
    ).superheated()

    event.recipes.create.mixing(
        'contrail:bronze_ingot',
        [
            Ingredient.of('minecraft:copper_ingot',3),
            Ingredient.of(['contrail:tin_ingot','mekanism:ingot_tin']),
            Ingredient.of('create:zinc_ingot')
        ]
    ).superheated()

    event.recipes.create.mixing(
        Item.of('contrail:chromatic_compound',2),
        [
            Ingredient.of('create:powdered_obsidian',4),
            Ingredient.of('create:polished_rose_quartz',1),
            Ingredient.of('contrail:polished_spectral_ruby',1)
        ]
    ).superheated()

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
//Create
    event.recipes.create.mechanical_crafting(Item.of('simulated:docking_connector',2),[
        'ABA',
        ' B ',
        'CDC',
        'EFE'
    ],{
        A:'create:iron_sheet',
        B:'create:chute',
        C:'minecraft:piston',
        D:'create:brass_casing',
        E:'create:brass_sheet',
        F:'contrail:integrated_mechanism'
    })
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