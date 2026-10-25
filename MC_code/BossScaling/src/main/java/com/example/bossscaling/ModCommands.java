package com.example.bossscaling;

import com.mojang.brigadier.CommandDispatcher;
import com.mojang.brigadier.arguments.IntegerArgumentType;
import com.mojang.brigadier.context.CommandContext;
import com.mojang.brigadier.suggestion.SuggestionProvider;
import net.minecraft.commands.CommandSourceStack;
import net.minecraft.commands.Commands;
import net.minecraft.commands.SharedSuggestionProvider;
import net.minecraft.commands.arguments.ResourceLocationArgument;
import net.minecraft.network.chat.Component;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.world.entity.Entity;
import net.minecraft.world.entity.LivingEntity;
import net.minecraft.world.entity.ai.attributes.AttributeModifier;
import net.minecraft.world.entity.ai.attributes.Attributes;
import net.minecraftforge.event.RegisterCommandsEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.registries.ForgeRegistries;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Mod.EventBusSubscriber(modid = BossScalingMod.MODID)
public class ModCommands {

    private static final SuggestionProvider<CommandSourceStack> ENTITY_SUGGESTIONS =
            (ctx, builder) -> SharedSuggestionProvider.suggestResource(
                    ForgeRegistries.ENTITY_TYPES.getKeys(), builder);
    private static final UUID DOUBLE_HEALTH_UUID = UUID.fromString("c1d2e3f4-a5b6-7890-abcd-ef0123456789");

    @SubscribeEvent
    public static void onRegisterCommands(RegisterCommandsEvent event) {
        CommandDispatcher<CommandSourceStack> d = event.getDispatcher();
        d.register(Commands.literal("bossscaling")
                .requires(source -> source.hasPermission(2))
                .then(Commands.literal("setplayers")
                        .then(Commands.argument("count", IntegerArgumentType.integer(-1))
                                .executes(ModCommands::setPlayers)))
                .then(Commands.literal("addboss")
                        .then(Commands.argument("entity", ResourceLocationArgument.id())
                                .suggests(ENTITY_SUGGESTIONS)
                                .executes(ModCommands::addBoss)))
                .then(Commands.literal("removeboss")
                        .then(Commands.argument("entity", ResourceLocationArgument.id())
                                .suggests(ENTITY_SUGGESTIONS)
                                .executes(ModCommands::removeBoss)))
                .then(Commands.literal("list")
                        .executes(ModCommands::list))
                .then(Commands.literal("listadded")
                        .executes(ModCommands::listAdded))
                .then(Commands.literal("lootboss")
                        .then(Commands.literal("add")
                                .then(Commands.argument("entity", ResourceLocationArgument.id())
                                        .suggests(ENTITY_SUGGESTIONS)
                                        .executes(ModCommands::addLootBoss)))
                        .then(Commands.literal("remove")
                                .then(Commands.argument("entity", ResourceLocationArgument.id())
                                        .suggests(ENTITY_SUGGESTIONS)
                                        .executes(ModCommands::removeLootBoss)))
                        .then(Commands.literal("list")
                                .executes(ModCommands::listLootBosses)))
        );
    }

    private static int setPlayers(CommandContext<CommandSourceStack> ctx) {
        int count = IntegerArgumentType.getInteger(ctx, "count");
        CommandSourceStack source = ctx.getSource();
        ServerLevel level = source.getLevel();
        BossScalingData data = BossScalingData.get(level);
        int online = source.getServer().getPlayerList().getPlayerCount();
        if (count > online && count != -1) {
            source.sendFailure(Component.literal("不能大于当前在线玩家数 (" + online + ")"));
            return 0;
        }
        data.setManualPlayers(count);
        if (count == -1) {
            source.sendSuccess(() -> Component.literal("已重置为跟随在线玩家数"), true);
        } else {
            source.sendSuccess(() -> Component.literal("已将有效玩家计数设置为 " + count), true);
        }
        return 1;
    }

    private static int addBoss(CommandContext<CommandSourceStack> ctx) {
        ResourceLocation id = ResourceLocationArgument.getId(ctx, "entity");
        String entityId = id.toString();
        CommandSourceStack source = ctx.getSource();
        if (!ForgeRegistries.ENTITY_TYPES.containsKey(id)) {
            source.sendFailure(Component.literal("实体不存在"));
            return 0;
        }
        ServerLevel level = source.getLevel();
        BossScalingData data = BossScalingData.get(level);

        data.addBoss(entityId);
        data.addDoubleHealthBoss(entityId);

        source.sendSuccess(() -> Component.literal("已将 " + entityId + " 加入缩放列表并开启双倍血量（立即生效）"), true);
        applyDoubleHealthToExisting(source.getServer(), entityId, true);
        return 1;
    }

    private static int removeBoss(CommandContext<CommandSourceStack> ctx) {
        ResourceLocation id = ResourceLocationArgument.getId(ctx, "entity");
        String entityId = id.toString();
        CommandSourceStack source = ctx.getSource();
        if (!ForgeRegistries.ENTITY_TYPES.containsKey(id)) {
            source.sendFailure(Component.literal("实体不存在"));
            return 0;
        }
        ServerLevel level = source.getLevel();
        BossScalingData data = BossScalingData.get(level);

        data.removeBoss(entityId);
        data.removeDoubleHealthBoss(entityId);

        source.sendSuccess(() -> Component.literal("已将 " + entityId + " 从缩放列表移除并关闭双倍血量"), true);
        applyDoubleHealthToExisting(source.getServer(), entityId, false);
        return 1;
    }

    private static int list(CommandContext<CommandSourceStack> ctx) {
        CommandSourceStack source = ctx.getSource();
        BossScalingData data = BossScalingData.get(source.getLevel());
        source.sendSuccess(() -> Component.literal("当前有效玩家计数：" +
                (data.getManualPlayers() == -1 ? "跟随在线" : String.valueOf(data.getManualPlayers()))), false);
        source.sendSuccess(() -> Component.literal("配置缩放列表：" + Config.SERVER.bossEntityIds.get()), false);
        if (!data.getRemovedBosses().isEmpty())
            source.sendSuccess(() -> Component.literal("已被指令移除的实体：" + data.getRemovedBosses()), false);
        return 1;
    }

    private static int listAdded(CommandContext<CommandSourceStack> ctx) {
        CommandSourceStack source = ctx.getSource();
        BossScalingData data = BossScalingData.get(source.getLevel());
        Set<String> added = data.getDoubleHealthBosses();
        if (added.isEmpty()) {
            source.sendSuccess(() -> Component.literal("当前没有通过指令添加的实体。"), false);
        } else {
            source.sendSuccess(() -> Component.literal("当前指令添加的实体（双倍+缩放）：" + added), false);
        }
        return 1;
    }

    private static int addLootBoss(CommandContext<CommandSourceStack> ctx) {
        ResourceLocation id = ResourceLocationArgument.getId(ctx, "entity");
        String entityId = id.toString();
        CommandSourceStack source = ctx.getSource();
        if (!ForgeRegistries.ENTITY_TYPES.containsKey(id)) {
            source.sendFailure(Component.literal("实体不存在"));
            return 0;
        }
        ServerLevel level = source.getLevel();
        BossScalingData data = BossScalingData.get(level);
        data.addLootBoss(entityId);
        source.sendSuccess(() -> Component.literal("已将 " + entityId + " 加入掉落翻倍列表"), true);
        return 1;
    }

    private static int removeLootBoss(CommandContext<CommandSourceStack> ctx) {
        ResourceLocation id = ResourceLocationArgument.getId(ctx, "entity");
        String entityId = id.toString();
        CommandSourceStack source = ctx.getSource();
        ServerLevel level = source.getLevel();
        BossScalingData data = BossScalingData.get(level);
        data.removeLootBoss(entityId);
        source.sendSuccess(() -> Component.literal("已将 " + entityId + " 从掉落翻倍列表移除"), true);
        return 1;
    }

    private static int listLootBosses(CommandContext<CommandSourceStack> ctx) {
        CommandSourceStack source = ctx.getSource();
        BossScalingData data = BossScalingData.get(source.getLevel());
        Set<String> dynList = data.getLootBosses();
        List<? extends String> cfgList = Config.SERVER.lootBossEntityIds.get();
        source.sendSuccess(() -> Component.literal("配置文件翻倍列表：" + (cfgList.isEmpty() ? "无" : cfgList)), false);
        source.sendSuccess(() -> Component.literal("指令动态翻倍列表：" + (dynList.isEmpty() ? "无" : dynList)), false);
        return 1;
    }

    private static void applyDoubleHealthToExisting(net.minecraft.server.MinecraftServer server,
                                                    String entityId, boolean add) {
        for (ServerLevel world : server.getAllLevels()) {
            for (Entity entity : world.getAllEntities()) {
                if (entity instanceof LivingEntity living &&
                        ForgeRegistries.ENTITY_TYPES.getKey(entity.getType()).toString().equals(entityId)) {
                    var attr = living.getAttribute(Attributes.MAX_HEALTH);
                    if (attr == null) continue;
                    AttributeModifier existing = attr.getModifier(DOUBLE_HEALTH_UUID);
                    if (existing != null) attr.removeModifier(existing);
                    if (add) {
                        attr.addPermanentModifier(new AttributeModifier(
                                DOUBLE_HEALTH_UUID, "Double health",
                                1.0, AttributeModifier.Operation.MULTIPLY_TOTAL));
                    }
                }
            }
        }
    }
}