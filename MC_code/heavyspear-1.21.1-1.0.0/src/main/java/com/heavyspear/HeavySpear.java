package com.heavyspear;

import com.heavyspear.registry.ModItems;
import net.minecraft.world.item.CreativeModeTabs;
import net.neoforged.bus.api.IEventBus;
import net.neoforged.fml.common.Mod;
import net.neoforged.neoforge.event.BuildCreativeModeTabContentsEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Heavy Spear - a NeoForge 1.21.1 add-on for VanillaBackport's spear.
 *
 * <p>The weapon deliberately combines two normally separate systems:
 * the spear's reach/charge attack (including the {@code minecraft:lunge}
 * enchantment) and the mace's smash attack (Density, Breach, Wind Burst).</p>
 */
@Mod(HeavySpear.MODID)
public final class HeavySpear {
    public static final String MODID = "heavyspear";
    public static final Logger LOGGER = LoggerFactory.getLogger("HeavySpear");

    public HeavySpear(IEventBus modEventBus) {
        ModItems.register(modEventBus);
        modEventBus.addListener(this::addCreativeTabItems);
    }

    private void addCreativeTabItems(BuildCreativeModeTabContentsEvent event) {
        if (event.getTabKey() == CreativeModeTabs.COMBAT) {
            event.accept(ModItems.HEAVY_SPEAR);
        }
    }
}
