ServerEvents.recipes (event =>{
    event.remove({output:'create:cuckoo_clock'});
    event.remove({output:'create:nixie_tube'});
    event.remove({output:'create:rose_quartz'});
    event.remove({output:'create:rotation_speed_controller'});
    event.remove({id:'mekanism:digital_miner'});
    event.remove({id:'mekanism:electric_pump'});
    event.remove({output:'ae2:cell_component_1k'});
    event.remove({output:'ae2:cell_component_4k'});
    event.remove({output:'ae2:cell_component_16k'});
    event.remove({output:'ae2:cell_component_64k'});
    event.remove({output:'ae2:cell_component_256k'});
    event.remove({id:'neoecoae:integrated_working_station'});
})