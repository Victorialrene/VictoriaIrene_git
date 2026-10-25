package com.example.bossscaling;

import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.lifecycle.FMLCommonSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Mod(BossScalingMod.MODID)
public class BossScalingMod {
    public static final String MODID = "bossscaling";
    public static final Logger LOGGER = LogManager.getLogger();

    public BossScalingMod() {
        var bus = FMLJavaModLoadingContext.get().getModEventBus();
        bus.addListener(this::commonSetup);
        MinecraftForge.EVENT_BUS.register(new BossEventHandler());
        Config.register();
    }

    private void commonSetup(final FMLCommonSetupEvent event) {
        LOGGER.info("Boss Scaling Mod loaded!");
    }
}