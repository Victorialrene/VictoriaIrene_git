ServerEvents.recipes(event => {
//AE
  const incomplete_1k = 'contrail:no_cell_component_1k'

  event.recipes.create.sequenced_assembly(
    [
      CreateItem.of('ae2:cell_component_1k', 1.0),   
      CreateItem.of('ae2:certus_quartz_dust', 0.25) 
    ],
    'ae2:logic_processor',
    [
      event.recipes.create.deploying(incomplete_1k,[incomplete_1k, Ingredient.of(['ae2:certus_quartz_crystal', 'ae2:charged_certus_quartz_crystal'])]),
      event.recipes.create.deploying(incomplete_1k, [incomplete_1k, 'minecraft:redstone']),
      event.recipes.create.pressing(incomplete_1k, incomplete_1k)
    ]
  )
  .transitionalItem(incomplete_1k)
  .loops(2)

  event.recipes.create.sequenced_assembly(
    [
      CreateItem.of('ae2:cell_component_1k', 1.0)
    ],
    'ae2:logic_processor',
    [
      event.recipes.create.deploying(incomplete_1k,[incomplete_1k,'ae2:sky_dust']),
      event.recipes.create.deploying(incomplete_1k,[incomplete_1k,'minecraft:redstone']),
      event.recipes.create.deploying(incomplete_1k,[incomplete_1k,Ingredient.of(['ae2:certus_quartz_crystal', 'ae2:charged_certus_quartz_crystal'])]),
      event.recipes.create.pressing(incomplete_1k,incomplete_1k)
    ]
  )
  .transitionalItem(incomplete_1k)
  .loops(2)

  const incomplete_4k = 'contrail:no_cell_component_4k'

  event.recipes.create.sequenced_assembly(
    [
      CreateItem.of('ae2:cell_component_4k',1.0),
      CreateItem.of('ae2:certus_quartz_dust', 0.25)
    ],
    'ae2:calculation_processor',
    [
      event.recipes.create.deploying(incomplete_4k,[incomplete_4k,Ingredient.of(['ae2:certus_quartz_crystal', 'ae2:charged_certus_quartz_crystal'])]),
      event.recipes.create.deploying(incomplete_4k,[incomplete_4k,'ae2:cell_component_1k']),
      event.recipes.create.deploying(incomplete_4k,[incomplete_4k,'ae2:quartz_glass']),
      event.recipes.create.deploying(incomplete_4k,[incomplete_4k,'minecraft:redstone']),
      event.recipes.create.pressing(incomplete_4k,incomplete_4k)
    ]
  )
  .transitionalItem(incomplete_4k)
  .loops(2)

  event.recipes.create.sequenced_assembly(
    [
      CreateItem.of('ae2:cell_component_4k',1.0)
    ],
    'ae2:calculation_processor',
    [
      event.recipes.create.deploying(incomplete_4k,[incomplete_4k,'ae2:cell_component_1k']),
      event.recipes.create.deploying(incomplete_4k,[incomplete_4k,Ingredient.of(['ae2:certus_quartz_crystal', 'ae2:charged_certus_quartz_crystal'])]),
      event.recipes.create.deploying(incomplete_4k,[incomplete_4k,'ae2:fluix_crystal']),
      event.recipes.create.pressing(incomplete_4k,incomplete_4k)
    ]
  )
  .transitionalItem(incomplete_4k)
  .loops(2)

  const incomplete_16k = 'contrail:no_cell_component_16k'

  event.recipes.create.sequenced_assembly(
    [
      CreateItem.of('ae2:cell_component_16k',1.0),
      CreateItem.of('ae2:cell_component_4k', 0.25)
    ],
    'ae2:calculation_processor',
    [
      event.recipes.create.deploying(incomplete_16k,[incomplete_16k,'ae2:cell_component_4k']),
      event.recipes.create.deploying(incomplete_16k,[incomplete_16k,Ingredient.of(['ae2:certus_quartz_crystal', 'ae2:charged_certus_quartz_crystal'])]),
      event.recipes.create.deploying(incomplete_16k,[incomplete_16k,'minecraft:glowstone_dust']),
      event.recipes.create.pressing(incomplete_16k,incomplete_16k)
    ]
  )
  .transitionalItem(incomplete_16k)
  .loops(3)

  event.recipes.create.sequenced_assembly(
    [
      CreateItem.of('ae2:cell_component_16k',1.0)
    ],
    'ae2:calculation_processor',
    [
      event.recipes.create.deploying(incomplete_16k,[incomplete_16k,Ingredient.of(['ae2:certus_quartz_crystal', 'ae2:charged_certus_quartz_crystal'])]),
      event.recipes.create.deploying(incomplete_16k,[incomplete_16k,'ae2:cell_component_4k']),
      event.recipes.create.deploying(incomplete_16k,[incomplete_16k,'ae2:fluix_crystal']),
      event.recipes.create.pressing(incomplete_16k,incomplete_16k)
    ]
  )
  .transitionalItem(incomplete_16k)
  .loops(3)

  const incomplete_64k = 'contrail:no_cell_component_64k'

  event.recipes.create.sequenced_assembly(
    [
      CreateItem.of('ae2:cell_component_64k',1.0),
      CreateItem.of('ae2:cell_component_16k', 0.25)
    ],
    'ae2:calculation_processor',
    [
      event.recipes.create.deploying(incomplete_64k,[incomplete_64k,'ae2:cell_component_16k']),
      event.recipes.create.deploying(incomplete_64k,[incomplete_64k,Ingredient.of(['ae2:certus_quartz_crystal', 'ae2:charged_certus_quartz_crystal'])]),
      event.recipes.create.deploying(incomplete_64k,[incomplete_64k,'minecraft:glowstone_dust']),
      event.recipes.create.pressing(incomplete_64k,incomplete_64k)
    ]
  )
  .transitionalItem(incomplete_64k)
  .loops(3)

  event.recipes.create.sequenced_assembly(
    [
      CreateItem.of('ae2:cell_component_64k',1.0)
    ],
    'ae2:calculation_processor',
    [
      event.recipes.create.deploying(incomplete_64k,[incomplete_64k,Ingredient.of(['ae2:certus_quartz_crystal', 'ae2:charged_certus_quartz_crystal'])]),
      event.recipes.create.deploying(incomplete_64k,[incomplete_64k,'ae2:cell_component_16k']),
      event.recipes.create.deploying(incomplete_64k,[incomplete_64k,'ae2:printed_engineering_processor']),
      event.recipes.create.pressing(incomplete_64k,incomplete_64k)
    ]
  )
  .transitionalItem(incomplete_64k)
  .loops(3)

  const incomplete_256k = 'contrail:no_cell_component_256k'

  event.recipes.create.sequenced_assembly(
    [
      CreateItem.of('ae2:cell_component_256k',1.0),
      CreateItem.of('ae2:cell_component_64k',0.25)
    ],
    'ae2:calculation_processor',
    [
      event.recipes.create.deploying(incomplete_256k,[incomplete_256k,Ingredient.of(['ae2:certus_quartz_crystal', 'ae2:charged_certus_quartz_crystal'])]),
      event.recipes.create.deploying(incomplete_256k,[incomplete_256k,'ae2:sky_dust']),
      event.recipes.create.deploying(incomplete_256k,[incomplete_256k,'ae2:cell_component_64k']),
      event.recipes.create.deploying(incomplete_256k,[incomplete_256k,'ae2:quartz_glass']),
      event.recipes.create.pressing(incomplete_256k,incomplete_256k)
    ]
  )
  .transitionalItem(incomplete_256k)
  .loops(3)

  event.recipes.create.sequenced_assembly(
    [
      CreateItem.of('ae2:cell_component_256k',1.0),
    ],
    'ae2:engineering_processor',
    [
      event.recipes.create.deploying(incomplete_256k,[incomplete_256k,Ingredient.of(['ae2:certus_quartz_crystal', 'ae2:charged_certus_quartz_crystal'])]),
      event.recipes.create.deploying(incomplete_256k,[incomplete_256k,'ae2:calculation_processor']),
      event.recipes.create.deploying(incomplete_256k,[incomplete_256k,'ae2:cell_component_64k']),
      event.recipes.create.pressing(incomplete_256k,incomplete_256k)
    ]
  )
  .transitionalItem(incomplete_256k)
  .loops(2)

  const calculation_processor_press = 'contrail:incomplete_calculation_processor_press'

  event.recipes.create.sequenced_assembly(
    [
      CreateItem.of('ae2:calculation_processor_press',0.9),
      CreateItem.of('contrail:failed_calculation_processor_press',0.1)
    ],
    'minecraft:iron_block',
    [
      event.recipes.create.deploying(calculation_processor_press,[calculation_processor_press,'ae2:calculation_processor_press']
      ).keepHeldItem(),
      event.recipes.create.pressing(calculation_processor_press,calculation_processor_press),
      event.recipes.create.pressing(calculation_processor_press,calculation_processor_press)
    ]
  )
  .transitionalItem(calculation_processor_press)
  .loops(3)

  const engineering_processor_press = 'contrail:incomplete_engineering_processor_press'

  event.recipes.create.sequenced_assembly(
    [
      CreateItem.of('ae2:engineering_processor_press',0.9),
      CreateItem.of('contrail:failed_engineering_processor_press',0.1)
    ],
    'minecraft:iron_block',
    [
      event.recipes.create.deploying(engineering_processor_press,[engineering_processor_press,'ae2:engineering_processor_press']
      ).keepHeldItem(),
      event.recipes.create.pressing(engineering_processor_press,engineering_processor_press),
      event.recipes.create.pressing(engineering_processor_press,engineering_processor_press)
    ]
  )
  .transitionalItem(engineering_processor_press)
  .loops(3)

  const logic_processor_press = 'contrail:incomplete_logic_processor_press'

  event.recipes.create.sequenced_assembly(
    [
      CreateItem.of('ae2:logic_processor_press',0.9),
      CreateItem.of('contrail:failed_logic_processor_press',0.1)
    ],
    'minecraft:iron_block',
    [
      event.recipes.create.deploying(logic_processor_press,[logic_processor_press,'ae2:logic_processor_press']
      ).keepHeldItem(),
      event.recipes.create.pressing(logic_processor_press,logic_processor_press),
      event.recipes.create.pressing(logic_processor_press,logic_processor_press)
    ]
  )
  .transitionalItem(logic_processor_press)
  .loops(3)

  const silicon_press = 'contrail:incomplete_sillicon_press'

  event.recipes.create.sequenced_assembly(
    [
      CreateItem.of('ae2:silicon_press',0.9),
      CreateItem.of('contrail:failed_sillicon_press',0.1)
    ],
    'minecraft:iron_block',
    [
      event.recipes.create.deploying(silicon_press,[silicon_press,'ae2:silicon_press']
      ).keepHeldItem(),
      event.recipes.create.pressing(silicon_press,silicon_press),
      event.recipes.create.pressing(silicon_press,silicon_press)
    ]
  )
  .transitionalItem(silicon_press)
  .loops(3)

//Create

  const integrated_circuit = 'contrail:incomplete_integrated_circuit'

  event.recipes.create.sequenced_assembly(
    [
      CreateItem.of('contrail:integrated_circuit',0.95),
      CreateItem.of('create:crafter_slot_cover',0.05)
    ],
    'contrail:lapis_sheet',
    [
      event.recipes.create.deploying(integrated_circuit,[integrated_circuit,'minecraft:redstone']),
      event.recipes.create.deploying(integrated_circuit,[integrated_circuit,'minecraft:quartz']),
      event.recipes.create.deploying(integrated_circuit,[integrated_circuit,'create:brass_nugget'])
    ]
  )
  .transitionalItem(integrated_circuit)
  .loops(5)

  const integrated_mechanism = 'contrail:incomplete_integrated_mechanism'

  event.recipes.create.sequenced_assembly(
    [
      CreateItem.of('contrail:integrated_mechanism',0.85),
      CreateItem.of('create:nixie_tube',0.10),
      CreateItem.of('create:sequenced_gearshift',0.05)
    ],
    'create:brass_sheet',
    [
      event.recipes.create.deploying(integrated_mechanism,[integrated_mechanism,'contrail:integrated_circuit']),
      event.recipes.create.deploying(integrated_mechanism,[integrated_mechanism,'create:cogwheel']),
      event.recipes.create.deploying(integrated_mechanism,[integrated_mechanism,'create:electron_tube'])
    ]
  )
  .transitionalItem(integrated_mechanism)
  .loops(5)

  const calculation_mechanism = 'contrail:incomplete_calculation_mechanism'

  event.recipes.create.sequenced_assembly(
    [
      CreateItem.of('contrail:calculation_mechanism',0.85),
      CreateItem.of('electroenergetics:connector',0.10),
      CreateItem.of('simulated:iron_handle',0.05)
    ],
    'contrail:tin_sheet',
    [
      event.recipes.create.deploying(calculation_mechanism,[calculation_mechanism,'contrail:integrated_circuit']),
      event.recipes.create.deploying(calculation_mechanism,[calculation_mechanism,'create:cogwheel']),
      event.recipes.create.deploying(calculation_mechanism,[calculation_mechanism,'create:copper_nugget']),
      event.recipes.create.deploying(calculation_mechanism,[calculation_mechanism,'minecraft:iron_nugget'])
    ]
  )
  .transitionalItem(calculation_mechanism)
  .loops(3)

  const inductive_mechanism = 'contrail:incomplete_inductive_mechanism'

  event.recipes.create.sequenced_assembly(
    [
      CreateItem.of('contrail:inductive_mechanism',0.85),
      CreateItem.of('create:andesite_alloy',0.10),
      CreateItem.of('createdieselgenerators:engine_piston',0.05)
    ],
    'contrail:zinc_sheet',
    [
      event.recipes.create.deploying(inductive_mechanism,[inductive_mechanism,'create:cogwheel']),
      event.recipes.create.deploying(inductive_mechanism,[inductive_mechanism,'create:cogwheel']),
      event.recipes.create.deploying(inductive_mechanism,[inductive_mechanism,'create:zinc_nugget']),
      event.recipes.create.deploying(inductive_mechanism,[inductive_mechanism,'minecraft:slime_ball'])
    ]
  )
  .transitionalItem(inductive_mechanism)
  .loops(3)

  const infernal_mechanism = 'contrail:incomplete_infernal_mechanism'

  event.recipes.create.sequenced_assembly(
    [
      CreateItem.of('contrail:infernal_mechanism',0.85),
      CreateItem.of('minecraft:coal',0.10),
      CreateItem.of('contrail:steel_nugget',0.05)
    ],
    'contrail:steel_sheet',
    [
      event.recipes.create.deploying(infernal_mechanism,[infernal_mechanism,'create:cogwheel']),
      event.recipes.create.deploying(infernal_mechanism,[infernal_mechanism,'contrail:ember_alloy']),
      event.recipes.create.deploying(infernal_mechanism,[infernal_mechanism,'create:zinc_nugget']),
      event.recipes.create.filling(infernal_mechanism,[infernal_mechanism,Fluid.of('minecraft:lava',500)])
    ]
  )
  .transitionalItem(infernal_mechanism)
  .loops(4)

  const sealed_mechanism = 'contrail:incomplete_sealed_mechanism'

  event.recipes.create.sequenced_assembly(
    [
      CreateItem.of('contrail:sealed_mechanism',0.85),
      CreateItem.of('minecraft:dried_kelp_block',0.10),
      CreateItem.of('create:copper_nugget',0.05)
    ],
    'create:belt_connector',
    [
      event.recipes.create.deploying(sealed_mechanism,[sealed_mechanism,'create:cogwheel']),
      event.recipes.create.deploying(sealed_mechanism,[sealed_mechanism,'minecraft:dried_kelp']),
      event.recipes.create.deploying(sealed_mechanism,[sealed_mechanism,'create:copper_sheet']),
      event.recipes.create.deploying(sealed_mechanism,[sealed_mechanism,'minecraft:glass'])
    ]
  )
  .transitionalItem(sealed_mechanism)
  .loops(3)
})