# libs/

编译期依赖目录。

把 **VanillaBackport** 的 NeoForge 1.21.1 jar 放在这里：

```text
libs/VanillaBackport-neoforge-1.2.21.1-1.2.2.jar
```

用途：

- `build.gradle` 的 `compileOnly files(...)` 需要它来编译 `HeavySpearItem extends SpearItem`；
- `tools/build-offline.ps1` 的 `classpath.txt` 末尾也指向它；
- `tools/make_textures.py` 从它里面读取原版下界合金长矛贴图。

**它不会被打进本模组的 jar，也不随源码包分发。**  
VanillaBackport 的版权与许可归其作者 BlackGear 所有，请从你的整合包或官方发布页获取。
