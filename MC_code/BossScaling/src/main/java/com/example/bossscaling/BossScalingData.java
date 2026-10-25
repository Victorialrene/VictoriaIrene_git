package com.example.bossscaling;

import net.minecraft.nbt.CompoundTag;
import net.minecraft.nbt.ListTag;
import net.minecraft.nbt.StringTag;
import net.minecraft.nbt.Tag;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.world.level.saveddata.SavedData;
import org.jetbrains.annotations.NotNull;

import java.util.*;

public class BossScalingData extends SavedData {
    private static final String DATA_NAME = "bossscaling_data";
    private int manualPlayers = -1;
    private final Set<String> removedBosses = new HashSet<>();
    private final Set<String> lootBosses = new HashSet<>();
    private final Set<String> doubleHealthBosses = new HashSet<>();

    public static BossScalingData load(CompoundTag tag) {
        BossScalingData data = new BossScalingData();
        data.manualPlayers = tag.getInt("ManualPlayers");
        ListTag rem = tag.getList("RemovedBosses", Tag.TAG_STRING);
        for (Tag t : rem) data.removedBosses.add(t.getAsString());
        ListTag loot = tag.getList("LootBosses", Tag.TAG_STRING);
        for (Tag t : loot) data.lootBosses.add(t.getAsString());
        ListTag doubleList = tag.getList("DoubleHealthBosses", Tag.TAG_STRING);
        for (Tag t : doubleList) data.doubleHealthBosses.add(t.getAsString());
        return data;
    }

    @Override
    public @NotNull CompoundTag save(CompoundTag tag) {
        tag.putInt("ManualPlayers", manualPlayers);
        ListTag rem = new ListTag();
        for (String s : removedBosses) rem.add(StringTag.valueOf(s));
        tag.put("RemovedBosses", rem);
        ListTag loot = new ListTag();
        for (String s : lootBosses) loot.add(StringTag.valueOf(s));
        tag.put("LootBosses", loot);
        ListTag doubleList = new ListTag();
        for (String s : doubleHealthBosses) doubleList.add(StringTag.valueOf(s));
        tag.put("DoubleHealthBosses", doubleList);
        return tag;
    }

    public static BossScalingData get(ServerLevel level) {
        return level.getServer().overworld().getDataStorage()
                .computeIfAbsent(BossScalingData::load, BossScalingData::new, DATA_NAME);
    }

    // ---- 业务方法 ----
    public int getEffectivePlayerCount(int online) {
        return manualPlayers == -1 ? online : Math.min(manualPlayers, online);
    }

    public void setManualPlayers(int c) { manualPlayers = c; setDirty(); }
    public int getManualPlayers() { return manualPlayers; }
    public boolean isBossRemoved(String id) { return removedBosses.contains(id); }
    public void removeBoss(String id) { removedBosses.add(id); setDirty(); }
    public void addBoss(String id) { removedBosses.remove(id); setDirty(); }
    public Set<String> getRemovedBosses() { return removedBosses; }
    public Set<String> getLootBosses() { return lootBosses; }
    public void addLootBoss(String id) { lootBosses.add(id); setDirty(); }
    public void removeLootBoss(String id) { lootBosses.remove(id); setDirty(); }
    public Set<String> getDoubleHealthBosses() { return doubleHealthBosses; }
    public void addDoubleHealthBoss(String id) { doubleHealthBosses.add(id); setDirty(); }
    public void removeDoubleHealthBoss(String id) { doubleHealthBosses.remove(id); setDirty(); }
}