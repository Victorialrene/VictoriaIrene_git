# tools/

构建辅助文件，不是模组运行所需内容。运行模组只需要 `build/libs/heavyspear-1.21.1-1.0.0.jar`。

| 文件 | 作用 |
| --- | --- |
| `build-offline.ps1` | 离线构建：JDK 21 的 `javac` 直接编译 `src/main/java`，再打包成 jar |
| `classpath.txt` | 上面脚本使用的编译类路径（一行，本机路径） |
| `make_textures.py` | 生成重矛贴图与图标；从 `libs/VanillaBackport-...jar` 读取原始长矛贴图 |
| `README.md` | 本文件 |

## 推荐方式：Gradle

需要 JDK 21、联网、以及 `libs/VanillaBackport-neoforge-1.2.21.1-1.2.2.jar`：

```bat
gradlew.bat build
```

产物同样是 `build/libs/heavyspear-1.21.1-1.0.0.jar`。

## 备用方式：离线 javac

本仓库的成品 jar 是在**离线**环境下用这条路径产出的：

```powershell
powershell -ExecutionPolicy Bypass -File tools\build-offline.ps1 -Version 1.0.0
```

脚本做四件事：

1. `javac` 编译 `src/main/java` → `build/classes`；
2. 把 `src/main/resources` 拷到 `build/staging`，把 TOML 里的 `${version}` 换成实际版本；
3. 写 `MANIFEST.MF`；
4. 用 JDK 的 `jar` 打包 → `build/libs/heavyspear-1.21.1-1.0.0.jar`。

### 踩坑记录

- `javac @argfile` 在 Windows 上会把反斜杠当转义符，所以参数文件里的路径统一用 `/`。
- 类路径超过 32K 时不能直接放命令行，必须写 `@argfile`。
- `neoforge.mods.toml` 必须是 **UTF-8 无 BOM**；Windows PowerShell 5.1 的 `Get-Content` 默认按 ANSI 读会把中文描述读坏，脚本里已改用 `File.ReadAllText(..., UTF8)`。
- `classpath.txt` 是本机生成的，换机器/换 NeoForge 版本要重新生成。

## classpath.txt 怎么来的

本机已有 NeoForge 21.1.249 的 ModDevGradle 编译缓存。可以从任意一个能构建的 NeoForge 21.1.249 工程里取 `javac` 的 `-classpath`，再在末尾追加：

```text
D:/.../heavyspear/libs/VanillaBackport-neoforge-1.2.21.1-1.2.2.jar
```

更稳的生成方式：在工程里执行

```bat
gradlew.bat dependencies --configuration compileClasspath
```

或直接用 Gradle 构建，不依赖这个文件。
