package com.heavyspear.item;

import java.util.List;
import java.util.function.Predicate;

import com.blackgear.vanillabackport.common.level.items.spear.SpearItem;
import net.minecraft.ChatFormatting;
import net.minecraft.core.Direction;
import net.minecraft.network.chat.Component;
import net.minecraft.world.damagesource.DamageSource;
import net.minecraft.network.protocol.game.ClientboundSetEntityMotionPacket;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.sounds.SoundEvent;
import net.minecraft.sounds.SoundEvents;
import net.minecraft.world.entity.Entity;
import net.minecraft.world.entity.EquipmentSlot;
import net.minecraft.world.entity.LivingEntity;
import net.minecraft.world.entity.TamableAnimal;
import net.minecraft.world.entity.ai.attributes.Attributes;
import net.minecraft.world.entity.decoration.ArmorStand;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.item.Items;
import net.minecraft.world.item.MaceItem;
import net.minecraft.world.item.Tier;
import net.minecraft.world.item.TooltipFlag;
import net.minecraft.world.item.enchantment.EnchantmentHelper;
import net.minecraft.world.level.Level;
import net.minecraft.world.phys.Vec3;

/**
 * A spear that keeps VanillaBackport's spear behaviour and adds the mace's
 * smash attack on top of it.
 *
 * <p>Both halves are data-driven where possible:</p>
 * <ul>
 *     <li>Spear reach, charge attack and Lunge come from the
 *     {@code minecraft:spears} / {@code minecraft:lunge_enchantable} item tags
 *     and from VanillaBackport's data components installed by
 *     {@link SpearItem}'s constructor.</li>
 *     <li>Density, Breach and Wind Burst come from the
 *     {@code minecraft:enchantable/mace} tag. Breach and Wind Burst are
 *     generic enchantment effects; Density needs the fall-damage hook below,
 *     which is copied from {@link MaceItem}.</li>
 * </ul>
 */
public class HeavySpearItem extends SpearItem {
    private static final float SMASH_ATTACK_KNOCKBACK_RADIUS = 3.5F;
    private static final float SMASH_ATTACK_KNOCKBACK_POWER = 0.7F;
    private static final float SMASH_ATTACK_HEAVY_THRESHOLD = 5.0F;

    public HeavySpearItem(Tier tier, Item.Properties properties) {
        // attack speed, use-movement multiplier and the six kinetic-weapon
        // thresholds are the netherite spear's values, except that the heavy
        // spear swings a little slower. The extra damage comes from the tier.
        super(
                tier,
                1.35F,  // seconds per spear swing
                1.20F,  // movement multiplier while charging
                0.40F,
                2.50F, 7.00F,
                5.50F, 5.10F,
                8.75F, 4.60F,
                properties
        );
    }

    @Override
    public void appendHoverText(ItemStack stack, Item.TooltipContext context, List<Component> tooltip, TooltipFlag flag) {
        super.appendHoverText(stack, context, tooltip, flag);
        tooltip.add(Component.translatable("item.heavyspear.heavy_spear.desc").withStyle(ChatFormatting.GRAY));
    }

    /**
     * Mace smash damage. This is deliberately the same formula as
     * {@link MaceItem#getAttackDamageBonus(Entity, float, DamageSource)},
     * including Density's {@code smash_damage_per_fallen_block} contribution.
     */
    @Override
    public float getAttackDamageBonus(Entity attacker, float fallDistance, DamageSource source) {
        Entity directEntity = source.getDirectEntity();
        if (!(directEntity instanceof LivingEntity living)) {
            return 0.0F;
        }
        if (!MaceItem.canSmashAttack(living)) {
            return 0.0F;
        }

        float actualFallDistance = living.fallDistance;
        float bonus;
        if (actualFallDistance <= 3.0F) {
            bonus = 4.0F * actualFallDistance;
        } else if (actualFallDistance <= 8.0F) {
            bonus = 12.0F + 2.0F * (actualFallDistance - 3.0F);
        } else {
            bonus = 22.0F + (actualFallDistance - 8.0F);
        }

        if (living.level() instanceof ServerLevel serverLevel) {
            bonus += EnchantmentHelper.modifyFallBasedDamage(
                    serverLevel,
                    living.getWeaponItem(),
                    attacker,
                    source,
                    0.0F
            ) * actualFallDistance;
        }
        return bonus;
    }

    /**
     * Smash-impact effects: fall-damage immunity, the ground/air sound,
     * particles and the 3.5-block knockback. Durability is handled in
     * {@link #postHurtEnemy(ItemStack, LivingEntity, LivingEntity)}.
     */
    @Override
    public boolean hurtEnemy(ItemStack stack, LivingEntity target, LivingEntity attacker) {
        if (attacker instanceof ServerPlayer player && MaceItem.canSmashAttack(player)) {
            ServerLevel level = player.serverLevel();

            if (player.isIgnoringFallDamageFromCurrentImpulse() && player.currentImpulseImpactPos != null) {
                if (player.currentImpulseImpactPos.y > player.position().y) {
                    player.currentImpulseImpactPos = player.position();
                }
            } else {
                player.currentImpulseImpactPos = player.position();
            }
            player.setIgnoreFallDamageFromCurrentImpulse(true);
            player.setDeltaMovement(player.getDeltaMovement().with(Direction.Axis.Y, 0.01D));
            player.connection.send(new ClientboundSetEntityMotionPacket(player));

            if (target.onGround()) {
                player.setSpawnExtraParticlesOnFall(true);
                SoundEvent sound = player.fallDistance > SMASH_ATTACK_HEAVY_THRESHOLD
                        ? SoundEvents.MACE_SMASH_GROUND_HEAVY
                        : SoundEvents.MACE_SMASH_GROUND;
                level.playSound(null, player.getX(), player.getY(), player.getZ(), sound, player.getSoundSource(), 1.0F, 1.0F);
            } else {
                level.playSound(null, player.getX(), player.getY(), player.getZ(), SoundEvents.MACE_SMASH_AIR, player.getSoundSource(), 1.0F, 1.0F);
            }

            knockback(level, player, target);
        }
        return true;
    }

    @Override
    public void postHurtEnemy(ItemStack stack, LivingEntity target, LivingEntity attacker) {
        stack.hurtAndBreak(1, attacker, EquipmentSlot.MAINHAND);
        if (MaceItem.canSmashAttack(attacker)) {
            attacker.resetFallDistance();
        }
    }

    @Override
    public boolean isValidRepairItem(ItemStack stack, ItemStack repair) {
        return repair.is(Items.NETHERITE_INGOT) || repair.is(Items.BREEZE_ROD);
    }

    private static void knockback(Level level, Player player, Entity target) {
        level.levelEvent(2013, target.getOnPos(), 750);
        level.getEntitiesOfClass(
                        LivingEntity.class,
                        target.getBoundingBox().inflate(SMASH_ATTACK_KNOCKBACK_RADIUS),
                        knockbackPredicate(player, target)
                )
                .forEach(entity -> {
                    Vec3 difference = entity.position().subtract(target.position());
                    double power = getKnockbackPower(player, entity, difference);
                    Vec3 push = difference.normalize().scale(power);
                    if (power > 0.0D) {
                        entity.push(push.x, SMASH_ATTACK_KNOCKBACK_POWER, push.z);
                        if (entity instanceof ServerPlayer serverPlayer) {
                            serverPlayer.connection.send(new ClientboundSetEntityMotionPacket(serverPlayer));
                        }
                    }
                });
    }

    private static Predicate<LivingEntity> knockbackPredicate(Player player, Entity target) {
        return entity -> {
            boolean notSpectator = !entity.isSpectator();
            boolean notSelf = entity != player && entity != target;
            boolean notAllied = !player.isAlliedTo(entity);

            boolean notOwnedTamable = true;
            if (entity instanceof TamableAnimal tamable && tamable.isTame()) {
                notOwnedTamable = !player.getUUID().equals(tamable.getOwnerUUID());
            }

            boolean notMarkerArmorStand = true;
            if (entity instanceof ArmorStand armorStand) {
                notMarkerArmorStand = !armorStand.isMarker();
            }

            boolean withinRadius = entity.distanceToSqr(target) <= SMASH_ATTACK_KNOCKBACK_RADIUS * SMASH_ATTACK_KNOCKBACK_RADIUS;
            return notSpectator && notSelf && notAllied && notOwnedTamable && notMarkerArmorStand && withinRadius;
        };
    }

    private static double getKnockbackPower(Player player, LivingEntity target, Vec3 difference) {
        return (SMASH_ATTACK_KNOCKBACK_RADIUS - difference.length())
                * SMASH_ATTACK_KNOCKBACK_POWER
                * (player.fallDistance > SMASH_ATTACK_HEAVY_THRESHOLD ? 2.0D : 1.0D)
                * (1.0D - target.getAttributeValue(Attributes.KNOCKBACK_RESISTANCE));
    }
}
