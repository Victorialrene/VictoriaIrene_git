package com.example.bossscaling;

import net.minecraft.network.chat.Component;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.server.MinecraftServer;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.world.Difficulty;
import net.minecraft.world.entity.*;
import net.minecraft.world.entity.ai.attributes.AttributeModifier;
import net.minecraft.world.entity.ai.attributes.Attributes;
import net.minecraft.world.entity.item.ItemEntity;
import net.minecraft.world.item.ItemStack;
import net.minecraftforge.event.DifficultyChangeEvent;
import net.minecraftforge.event.entity.EntityJoinLevelEvent;
import net.minecraftforge.event.entity.EntityLeaveLevelEvent;
import net.minecraftforge.event.entity.living.LivingDeathEvent;
import net.minecraftforge.event.entity.living.LivingDropsEvent;
import net.minecraftforge.event.entity.living.LivingHurtEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.registries.ForgeRegistries;
import net.minecraftforge.server.ServerLifecycleHooks;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class BossEventHandler {

    private static final UUID SCALING_MODIFIER_UUID = UUID.fromString("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
    private static final UUID DOUBLE_HEALTH_UUID = UUID.fromString("c1d2e3f4-a5b6-7890-abcd-ef0123456789");
    private static final String SCALING_MODIFIER_NAME = "Boss scaling multiplier";
    private static final Map<UUID, Map<UUID, Float>> DAMAGE_TRACKER = new ConcurrentHashMap<>();

    @SubscribeEvent
    public void onBossJoin(EntityJoinLevelEvent event) {
        if (event.getLevel().isClientSide()) return;
        Entity entity = event.getEntity();
        if (!(entity instanceof LivingEntity living)) return;

        ResourceLocation id = ForgeRegistries.ENTITY_TYPES.getKey(entity.getType());
        if (id == null) return;
        String idStr = id.toString();

        ServerLevel serverLevel = (ServerLevel) event.getLevel();
        BossScalingData data = BossScalingData.get(serverLevel);

        boolean inConfig = Config.SERVER.bossEntityIds.get().contains(idStr);
        boolean inDoubleHealth = data.getDoubleHealthBosses().contains(idStr);
        if (!inConfig && !inDoubleHealth) return;

        if (data.isBossRemoved(idStr)) return;

        // 获取该实体的特定倍率（如果有），否则使用全局倍率
        double entityMultiplier = Config.SERVER.getHealthMultiplierForEntity(idStr);

        boolean alreadyScaled = living.getPersistentData().contains("boss_scaled");

        if (alreadyScaled) {
            int playerCount = living.getPersistentData().getInt("boss_scale_player_count");
            double healthRatio = living.getPersistentData().getDouble("boss_scale_health_ratio");

            double diffMul = getDifficultyMultiplier(serverLevel.getDifficulty());
            double playerScaling = 1.0 + (playerCount - 1) * entityMultiplier;
            double totalMultiplier = playerScaling * diffMul;

            applyScalingModifier(living, totalMultiplier);
            // 先应用双倍修饰符，再设置血量
            if (data.getDoubleHealthBosses().contains(idStr)) {
                applyDoubleHealthModifier(living);
            }
            double newMax = living.getMaxHealth();
            living.setHealth((float) (newMax * healthRatio));
            return;
        }

        // 首次生成
        int onlineCount = Config.SERVER.useGlobalPlayers.get()
                ? serverLevel.getServer().getPlayerList().getPlayerCount()
                : serverLevel.getEntitiesOfClass(ServerPlayer.class, living.getBoundingBox().inflate(64.0)).size();
        if (onlineCount <= 0) onlineCount = 1;
        int effectivePlayers = data.getEffectivePlayerCount(onlineCount);
        if (effectivePlayers <= 0) effectivePlayers = 1;

        double diffMul = getDifficultyMultiplier(serverLevel.getDifficulty());
        double playerScaling = 1.0 + (effectivePlayers - 1) * entityMultiplier;
        double totalMultiplier = playerScaling * diffMul;

        applyScalingModifier(living, totalMultiplier);
        // 先应用双倍修饰符，再设置血量
        if (data.getDoubleHealthBosses().contains(idStr)) {
            applyDoubleHealthModifier(living);
        }

        double healthRatio = living.getHealth() / living.getMaxHealth();
        living.getPersistentData().putBoolean("boss_scaled", true);
        living.getPersistentData().putInt("boss_scale_player_count", effectivePlayers);
        living.getPersistentData().putDouble("boss_scale_health_ratio", healthRatio);
        living.setHealth(living.getMaxHealth());

        DAMAGE_TRACKER.put(living.getUUID(), new ConcurrentHashMap<>());
    }

    private void applyDoubleHealthModifier(LivingEntity living) {
        var attr = living.getAttribute(Attributes.MAX_HEALTH);
        if (attr != null && attr.getModifier(DOUBLE_HEALTH_UUID) == null) {
            attr.addPermanentModifier(new AttributeModifier(
                    DOUBLE_HEALTH_UUID, "Double health",
                    1.0, AttributeModifier.Operation.MULTIPLY_TOTAL));
        }
    }

    @SubscribeEvent
    public void onDifficultyChange(DifficultyChangeEvent event) {
        Difficulty newDiff = event.getDifficulty();
        double newDiffMul = getDifficultyMultiplier(newDiff);

        MinecraftServer server = ServerLifecycleHooks.getCurrentServer();
        if (server == null) return;

        for (ServerLevel level : server.getAllLevels()) {
            for (Entity entity : level.getAllEntities()) {
                if (!(entity instanceof LivingEntity living)) continue;
                if (!living.getPersistentData().contains("boss_scaled")) continue;

                int playerCount = living.getPersistentData().getInt("boss_scale_player_count");
                if (playerCount <= 0) playerCount = 1;

                // 获取该实体的特定倍率
                ResourceLocation id = ForgeRegistries.ENTITY_TYPES.getKey(entity.getType());
                String idStr = id != null ? id.toString() : "";
                double entityMultiplier = Config.SERVER.getHealthMultiplierForEntity(idStr);

                double playerScaling = 1.0 + (playerCount - 1) * entityMultiplier;
                double newTotalMultiplier = playerScaling * newDiffMul;

                double currentHealth = living.getHealth();
                double oldMaxHealth = living.getMaxHealth();

                applyScalingModifier(living, newTotalMultiplier);

                double newMaxHealth = living.getMaxHealth();
                double healthRatio = oldMaxHealth > 0 ? currentHealth / oldMaxHealth : 1.0;
                living.setHealth((float) (newMaxHealth * healthRatio));
            }
        }
    }

    @SubscribeEvent
    public void onBossHurt(LivingHurtEvent event) {
        if (event.getEntity().level().isClientSide()) return;
        LivingEntity entity = event.getEntity();
        if (!entity.getPersistentData().contains("boss_scaled")) return;

        if (event.getSource().getEntity() instanceof ServerPlayer player) {
            Map<UUID, Float> map = DAMAGE_TRACKER.get(entity.getUUID());
            if (map != null) map.merge(player.getUUID(), event.getAmount(), Float::sum);
        }
    }

    @SubscribeEvent
    public void onBossDeath(LivingDeathEvent event) {
        if (event.getEntity().level().isClientSide()) return;
        LivingEntity entity = event.getEntity();
        if (!entity.getPersistentData().contains("boss_scaled")) return;

        ResourceLocation id = ForgeRegistries.ENTITY_TYPES.getKey(entity.getType());
        if (id == null) return;

        ServerLevel serverLevel = (ServerLevel) entity.level();
        BossScalingData data = BossScalingData.get(serverLevel);

        if (Config.SERVER.autoRemoveOnDeath.get()) {
            data.removeBoss(id.toString());
            data.removeDoubleHealthBoss(id.toString());
        }

        Map<UUID, Float> playerDamage = DAMAGE_TRACKER.remove(entity.getUUID());
        if (playerDamage != null && !playerDamage.isEmpty()) {
            List<Map.Entry<UUID, Float>> sorted = new ArrayList<>(playerDamage.entrySet());
            sorted.sort((a, b) -> Float.compare(b.getValue(), a.getValue()));

            float totalDamage = 0;
            for (var e : sorted) totalDamage += e.getValue();

            StringBuilder msg = new StringBuilder("§6Boss " + entity.getDisplayName().getString() + " §6被击杀！伤害排名：\n");
            int rank = 1;
            for (var e : sorted) {
                ServerPlayer player = serverLevel.getServer().getPlayerList().getPlayer(e.getKey());
                if (player != null) {
                    msg.append("§e").append(rank).append(". ").append(player.getName().getString())
                            .append(" - ").append(String.format("%.1f", e.getValue() / totalDamage * 100)).append("%\n");
                    if (++rank > 3) break;
                }
            }
            serverLevel.getServer().getPlayerList().broadcastSystemMessage(Component.literal(msg.toString()), false);
        } else {
            serverLevel.getServer().getPlayerList().broadcastSystemMessage(
                    Component.literal("§6Boss " + entity.getDisplayName().getString() + " §6被击杀！"), false);
        }
    }

    @SubscribeEvent
    public void onBossDrops(LivingDropsEvent event) {
        if (!Config.SERVER.enableLootScaling.get()) return;
        LivingEntity entity = event.getEntity();
        if (!entity.getPersistentData().contains("boss_scaled")) return;

        String entityId = ForgeRegistries.ENTITY_TYPES.getKey(entity.getType()).toString();
        List<? extends String> configList = Config.SERVER.lootBossEntityIds.get();
        BossScalingData data = entity.level() instanceof ServerLevel sl ? BossScalingData.get(sl) : null;
        Set<String> dynamicList = data != null ? data.getLootBosses() : Collections.emptySet();

        if (!configList.isEmpty() || !dynamicList.isEmpty()) {
            if (!configList.contains(entityId) && !dynamicList.contains(entityId)) return;
        }

        if (entity.level() instanceof ServerLevel serverLevel) {
            int nearby = serverLevel.getEntitiesOfClass(ServerPlayer.class,
                    entity.getBoundingBox().inflate(Config.SERVER.lootRadius.get())).size();
            if (nearby <= 0) nearby = 1;
            double mult = 1.0 + (nearby - 1) * Config.SERVER.lootMultiplierPerPlayer.get();
            if (mult <= 1.0) return;

            for (ItemEntity itemEntity : new ArrayList<>(event.getDrops())) {
                ItemStack stack = itemEntity.getItem();
                int newCount = (int) Math.floor(stack.getCount() * mult);
                if (newCount > stack.getMaxStackSize()) {
                    int remaining = newCount;
                    while (remaining > 0) {
                        int size = Math.min(remaining, stack.getMaxStackSize());
                        ItemStack copy = stack.copy();
                        copy.setCount(size);
                        itemEntity.level().addFreshEntity(new ItemEntity(itemEntity.level(),
                                itemEntity.getX(), itemEntity.getY(), itemEntity.getZ(), copy));
                        remaining -= size;
                    }
                    itemEntity.discard();
                } else if (newCount > 0) {
                    stack.setCount(newCount);
                }
            }
        }
    }

    @SubscribeEvent
    public void onEntityLeave(EntityLeaveLevelEvent event) {
        if (event.getLevel().isClientSide()) return;
        if (event.getEntity() instanceof LivingEntity living && living.getPersistentData().contains("boss_scaled")) {
            DAMAGE_TRACKER.remove(event.getEntity().getUUID());
        }
    }

    private void applyScalingModifier(LivingEntity entity, double mult) {
        var attr = entity.getAttribute(Attributes.MAX_HEALTH);
        if (attr == null) return;
        attr.removeModifier(SCALING_MODIFIER_UUID);
        if (mult == 1.0) return;
        attr.addPermanentModifier(new AttributeModifier(
                SCALING_MODIFIER_UUID, SCALING_MODIFIER_NAME,
                mult - 1.0, AttributeModifier.Operation.MULTIPLY_TOTAL));
    }

    private double getDifficultyMultiplier(Difficulty difficulty) {
        return switch (difficulty) {
            case EASY -> Config.SERVER.difficultyEasy.get();
            case NORMAL -> Config.SERVER.difficultyNormal.get();
            case HARD -> Config.SERVER.difficultyHard.get();
            default -> 0;
        };
    }
}