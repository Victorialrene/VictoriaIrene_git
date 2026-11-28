package com.heavyspear.registry;

import com.heavyspear.HeavySpear;
import com.heavyspear.item.HeavySpearItem;
import com.heavyspear.item.HeavySpearTier;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.Rarity;
import net.neoforged.bus.api.IEventBus;
import net.neoforged.neoforge.registries.DeferredItem;
import net.neoforged.neoforge.registries.DeferredRegister;

public final class ModItems {
    public static final DeferredRegister.Items ITEMS = DeferredRegister.createItems(HeavySpear.MODID);

    public static final DeferredItem<HeavySpearItem> HEAVY_SPEAR = ITEMS.register(
            "heavy_spear",
            () -> new HeavySpearItem(
                    HeavySpearTier.INSTANCE,
                    new Item.Properties()
                            .fireResistant()
                            .rarity(Rarity.RARE)
            )
    );

    private ModItems() {
    }

    public static void register(IEventBus modEventBus) {
        ITEMS.register(modEventBus);
    }
}
