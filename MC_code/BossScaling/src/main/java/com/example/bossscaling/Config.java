package com.example.bossscaling;

import com.google.common.collect.Lists;
import net.minecraftforge.common.ForgeConfigSpec;
import net.minecraftforge.fml.ModLoadingContext;
import net.minecraftforge.fml.config.ModConfig;
import org.apache.commons.lang3.tuple.Pair;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Config {
    public static final ForgeConfigSpec COMMON_CONFIG;
    public static final ServerConfig SERVER;

    static {
        final Pair<ServerConfig, ForgeConfigSpec> pair = new ForgeConfigSpec.Builder().configure(ServerConfig::new);
        SERVER = pair.getLeft();
        COMMON_CONFIG = pair.getRight();
    }

    public static void register() {
        ModLoadingContext.get().registerConfig(ModConfig.Type.COMMON, COMMON_CONFIG);
    }

    public static class ServerConfig {
        public final ForgeConfigSpec.DoubleValue healthMultiplierPerPlayer;
        public final ForgeConfigSpec.BooleanValue useGlobalPlayers;
        public final ForgeConfigSpec.ConfigValue<List<? extends String>> bossEntityIds;
        public final ForgeConfigSpec.DoubleValue difficultyEasy;
        public final ForgeConfigSpec.DoubleValue difficultyNormal;
        public final ForgeConfigSpec.DoubleValue difficultyHard;
        public final ForgeConfigSpec.BooleanValue enableLootScaling;
        public final ForgeConfigSpec.DoubleValue lootMultiplierPerPlayer;
        public final ForgeConfigSpec.IntValue lootRadius;
        public final ForgeConfigSpec.ConfigValue<List<? extends String>> lootBossEntityIds;
        public final ForgeConfigSpec.BooleanValue autoRemoveOnDeath;
        public final ForgeConfigSpec.ConfigValue<List<? extends String>> entitySpecificMultipliers;

        // 解析缓存
        private Map<String, Double> specificMultiplierMap = null;

        ServerConfig(ForgeConfigSpec.Builder builder) {
            builder.push("boss_scaling");

            healthMultiplierPerPlayer = builder
                    .comment("每多一名玩家，基础生命值的额外比例 (0~20)")
                    .defineInRange("healthMultiplierPerPlayer", 0.5, 0.0, 20.0);

            useGlobalPlayers = builder
                    .comment("true: 使用全服在线玩家数；false: 使用 Boss 周围64格内的玩家数")
                    .define("useGlobalPlayers", true);

            bossEntityIds = builder
                    .comment("需要缩放的 Boss 实体注册名列表")
                    .defineList("bossEntityIds",
                            Lists.newArrayList("minecraft:ender_dragon", "minecraft:wither"),
                            obj -> obj instanceof String);

            builder.push("difficulty_multipliers");
            difficultyEasy = builder.defineInRange("easy", 1.0, 0.1, 100.0);
            difficultyNormal = builder.defineInRange("normal", 1.0, 0.1, 100.0);
            difficultyHard = builder.defineInRange("hard", 2.0, 0.1, 100.0);
            builder.pop();

            builder.push("loot_scaling");
            enableLootScaling = builder
                    .comment("启用掉落物数量根据附近玩家数翻倍")
                    .define("enableLootScaling", true);
            lootMultiplierPerPlayer = builder
                    .comment("每多一名附近玩家，掉落物数量额外增加的倍率")
                    .defineInRange("lootMultiplierPerPlayer", 0.2, 0.0, 10.0);
            lootRadius = builder
                    .comment("检测附近玩家的范围（半径，格）")
                    .defineInRange("lootRadius", 64, 1, 256);
            lootBossEntityIds = builder
                    .comment("单独指定哪些实体会受到掉落翻倍影响，留空则所有bossEntityIds列表中的实体都生效")
                    .defineList("lootBossEntityIds", Lists.newArrayList(), obj -> obj instanceof String);
            builder.pop();

            autoRemoveOnDeath = builder
                    .comment("Boss死亡后是否自动从缩放列表和双倍列表中移除")
                    .define("autoRemoveOnDeath", true);

            entitySpecificMultipliers = builder
                    .comment("指定特定实体的玩家数量倍率，格式: \"modid:entity_name:倍率\"，例如 \"minecraft:wither:2.0\"",
                            "未列出的实体使用全局 healthMultiplierPerPlayer")
                    .defineList("entitySpecificMultipliers", Lists.newArrayList(), obj -> obj instanceof String);

            builder.pop();
        }

        /** 获取指定实体的血量倍率，若无特定配置则返回全局值 */
        public double getHealthMultiplierForEntity(String entityId) {
            if (specificMultiplierMap == null) {
                specificMultiplierMap = new HashMap<>();
                for (String entry : entitySpecificMultipliers.get()) {
                    String[] parts = entry.split(":");
                    if (parts.length == 3) {
                        try {
                            double mult = Double.parseDouble(parts[2]);
                            specificMultiplierMap.put(parts[0] + ":" + parts[1], mult);
                        } catch (NumberFormatException ignored) {
                            BossScalingMod.LOGGER.warn("Invalid multiplier format: {}", entry);
                        }
                    }
                }
            }
            return specificMultiplierMap.getOrDefault(entityId, healthMultiplierPerPlayer.get());
        }
    }
}