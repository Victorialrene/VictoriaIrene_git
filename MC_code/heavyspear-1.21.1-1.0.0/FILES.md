# Heavy Spear 1.0.0 完整文件清单

本清单对应交付的 **完整源码包** + **已编译成品 jar**。  
源码包包含所有未打包的 `.java`、`.json`、`.png`、Gradle 配置、构建脚本和说明文档。

## 根目录

| 文件 | 说明 |
| --- | --- |
| `build.gradle` | ModDevGradle 构建脚本；NeoForge 21.1.249、Java 21、`compileOnly` VanillaBackport |
| `settings.gradle` | Gradle 插件仓库与项目名 |
| `gradle.properties` | Gradle 内存 / 并行参数 |
| `gradlew` / `gradlew.bat` | Gradle Wrapper 启动脚本（Gradle 8.10.2） |
| `gradle/wrapper/gradle-wrapper.jar` | Gradle Wrapper JAR |
| `gradle/wrapper/gradle-wrapper.properties` | Wrapper 分发地址 |
| `README.md` | 中文安装、合成、属性、附魔、构建与排查说明 |
| `FILES.md` | 本文件清单 |
| `CHANGELOG.md` | 版本变更记录 |
| `LICENSE` | MIT 许可证 |
| `.gitignore` | 构建产物 / 本机依赖忽略规则 |
| `SHA256SUMS.txt` | 成品 jar 的 SHA-256 校验值 |
| `build/libs/heavyspear-1.21.1-1.0.0.jar` | 可直接安装的成品模组 |

## Java 源码

根目录：`src/main/java/com/heavyspear/`

| 文件 | 说明 |
| --- | --- |
| `HeavySpear.java` | 模组入口：注册物品、把重矛加入创造模式“战斗”标签页 |
| `item/HeavySpearItem.java` | 继承 VanillaBackport `SpearItem`；重写重锤落地猛击、密度伤害、击退、修复材料、tooltip |
| `item/HeavySpearTier.java` | 下界合金级 `Tier`：2031 耐久、+7 攻击伤害、15 附魔能力、下界合金锭修复 |
| `registry/ModItems.java` | `DeferredRegister.Items` 注册 `heavyspear:heavy_spear` |

## 资源文件

根目录：`src/main/resources/`

| 文件 | 说明 |
| --- | --- |
| `META-INF/neoforge.mods.toml` | NeoForge 元数据：modId `heavyspear`，依赖 `vanillabackport`，版本占位符 `${version}` |
| `icon.png` | 128×128 模组图标（灰色重矛） |
| `assets/heavyspear/lang/en_us.json` | 英文名称与 tooltip |
| `assets/heavyspear/lang/zh_cn.json` | 中文名称“重矛”与 tooltip |
| `assets/heavyspear/models/item/heavy_spear.json` | 物品模型：手持长矛姿态 + 物品栏旋转 |
| `assets/heavyspear/textures/item/heavy_spear.png` | 32×32 灰钢重矛贴图 |

## 数据包

根目录：`src/main/resources/data/`

### 重矛自己的数据

| 文件 | 说明 |
| --- | --- |
| `heavyspear/recipe/heavy_spear.json` | 重锤核心 + 下界合金长矛 → 重矛 |
| `heavyspear/advancement/recipes/combat/heavy_spear.json` | 拿到重锤核心时解锁配方 |

### 追加到原版/前置模组的物品标签

| 文件 | 作用 |
| --- | --- |
| `minecraft/tags/item/spears.json` | 让重矛被识别为长矛（VanillaBackport 的蓄力/长矛逻辑） |
| `minecraft/tags/item/lunge_enchantable.json` | 让重矛能附 `lunge`（突刺） |
| `minecraft/tags/item/enchantable/mace.json` | 让重矛能附密度、破甲、风爆 |
| `minecraft/tags/item/enchantable/fire_aspect.json` | 让重矛能附火焰附加（重锤也支持） |
| `minecraft/tags/item/enchantable/weapon.json` | 通用武器附魔 |
| `minecraft/tags/item/enchantable/sharp_weapon.json` | 锋利/亡灵杀手/节肢杀手（VanillaBackport 长矛支持） |
| `minecraft/tags/item/enchantable/durability.json` | 耐久/经验修补 |

> 所有标签文件都是 `"replace": false`，只追加 `heavyspear:heavy_spear`，不会覆盖原版或其它模组的条目。

## 构建辅助

根目录：`tools/`

| 文件 | 说明 |
| --- | --- |
| `build-offline.ps1` | 离线构建：JDK 21 `javac` + `jar`，本机已跑通 |
| `classpath.txt` | 本机 NeoForge 21.1.249 + VanillaBackport 的编译类路径（一行） |
| `make_textures.py` | 从 VanillaBackport 的下界合金长矛贴图生成灰色重矛贴图与图标（Pillow） |
| `README.md` | 两种构建方式、classpath 生成方式与踩坑说明 |

## 本机依赖目录

| 路径 | 说明 |
| --- | --- |
| `libs/README.md` | 说明把 VanillaBackport jar 放在这里用于编译 |
| `libs/VanillaBackport-neoforge-1.2.21.1-1.2.2.jar` | **仅本机编译用，不随源码包分发**（第三方模组，版权归其作者） |

## 不包含的中间产物

以下目录是构建缓存，不属于源码，也不在源码包内：

- `build/classes/`
- `build/staging/`
- `build/tmp/`
- `.gradle/`
- `testserver/`（曾用于尝试安装测试服务端，已删除）
