package com.heavyspear.item;

import net.minecraft.tags.BlockTags;
import net.minecraft.tags.TagKey;
import net.minecraft.world.item.Items;
import net.minecraft.world.item.crafting.Ingredient;
import net.minecraft.world.item.Tier;
import net.minecraft.world.level.block.Block;

/**
 * Netherite-grade material with a heavier hit than a normal spear.
 *
 * <p>Durability, mining speed and enchantability stay at netherite values;
 * only the attack-damage bonus is raised. The spear's own constructor turns
 * this into the actual main-hand attack-damage modifier.</p>
 */
public enum HeavySpearTier implements Tier {
    INSTANCE;

    @Override
    public int getUses() {
        return 2031;
    }

    @Override
    public float getSpeed() {
        return 9.0F;
    }

    @Override
    public float getAttackDamageBonus() {
        // A netherite spear uses 4.0; the extra 3.0 makes the heavy spear hit
        // like an endgame weapon even before Density / smash damage.
        return 7.0F;
    }

    @Override
    public TagKey<Block> getIncorrectBlocksForDrops() {
        return BlockTags.INCORRECT_FOR_NETHERITE_TOOL;
    }

    @Override
    public int getEnchantmentValue() {
        // Same as a mace, so mace-style enchanting is not artificially harder.
        return 15;
    }

    @Override
    public Ingredient getRepairIngredient() {
        return Ingredient.of(Items.NETHERITE_INGOT);
    }
}
