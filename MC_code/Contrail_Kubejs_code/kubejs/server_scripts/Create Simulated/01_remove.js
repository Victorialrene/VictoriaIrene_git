ServerEvents.recipes(event => {
    event.remove ({id:'simulated:physics_assembler'});
    event.remove ({id:'simulated:gimbal_sensor'});
    event.remove ({id:'simulated:navigation_table'});
    event.remove ({id:'simulated:analog_transmission'});
    event.remove ({id:'simulated:throttle_lever'});
    event.remove ({id:'simulated:directional_gearshift'});
    event.remove ({id:'aeronautics:steam_vent'});
    event.remove ({id:'simulated:steering_wheel'});
    event.remove ({id:'simulated:red_portable_engine'});
    event.remove ({id:'simulated:redstone_magnet'});
    event.remove ({id:'minecraft:lodestone'});
    event.remove ({id:'simulated:redstone_magnet'});
    event.remove ({id:'aeronautics:propeller_bearing'});
    event.remove ({id:'aeronautics:gyroscopic_propeller_bearing'});
});
