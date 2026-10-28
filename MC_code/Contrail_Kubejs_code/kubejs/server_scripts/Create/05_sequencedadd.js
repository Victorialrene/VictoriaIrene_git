ServerEvents.recipes(event => {
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

  const calculation_processor_press = 'contrail:partially_assembled_calculation_processor_press'

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

  const engineering_processor_press = 'contrail:partially_assembled_engineering_processor_press'

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

  const logic_processor_press = 'contrail:partially_assembled_logic_processor_press'

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

  const silicon_press = 'contrail:partially_assembled_sillicon_press'

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
})