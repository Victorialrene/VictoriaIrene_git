<#
.SYNOPSIS
    Offline build for Heavy Spear: compiles with javac against a prepared
    NeoForge 21.1.249 + VanillaBackport classpath and packages the mod jar.

.DESCRIPTION
    This is the fallback used when Gradle cannot resolve its dependencies.
    A normal machine with internet access should use `gradlew.bat build`.

    tools/classpath.txt must contain one line: the compile classpath.  It is
    machine-specific; regenerate it from a working ModDevGradle project if
    your paths differ.  The last entry must point at the VanillaBackport jar.

.PARAMETER ClasspathFile
    One-line classpath file. Defaults to tools/classpath.txt.

.PARAMETER Version
    Version written into META-INF/neoforge.mods.toml and the manifest.

.PARAMETER JdkHome
    JDK 21 installation. Defaults to the JDK used to build this project.
#>
[CmdletBinding()]
param(
    [string]$ClasspathFile,
    [string]$Version = '1.0.0',
    [string]$JdkHome = 'C:\Program Files\Java\jdk-21.0.12.1'
)

$ErrorActionPreference = 'Stop'

$toolsDir = $PSScriptRoot
if (-not $toolsDir) { $toolsDir = Split-Path -Parent $MyInvocation.MyCommand.Path }
if (-not $ClasspathFile) { $ClasspathFile = Join-Path $toolsDir 'classpath.txt' }

$root = Split-Path -Parent $toolsDir
$javac = Join-Path $JdkHome 'bin\javac.exe'
$jarTool = Join-Path $JdkHome 'bin\jar.exe'
foreach ($tool in @($javac, $jarTool)) {
    if (-not (Test-Path $tool)) { throw "JDK tool not found: $tool" }
}
if (-not (Test-Path $ClasspathFile)) { throw "Classpath file not found: $ClasspathFile" }

$classpath = (Get-Content $ClasspathFile -Raw).Trim()
if (-not $classpath) { throw "Classpath file is empty: $ClasspathFile" }

function To-ForwardSlashes([string]$path) { $path.Replace('\', '/') }

# Use the jar from this project's libs/ when present.  This keeps a copied
# source bundle working even if classpath.txt still contains the original
# machine's absolute VanillaBackport path.
$localVanillaBackport = Join-Path $root 'libs\VanillaBackport-neoforge-1.2.21.1-1.2.2.jar'
if (Test-Path $localVanillaBackport) {
    $entries = $classpath -split ';' | Where-Object { $_ -and ($_ -notmatch 'VanillaBackport') }
    $classpath = (($entries + (To-ForwardSlashes $localVanillaBackport)) -join ';')
}

$buildDir = Join-Path $root 'build'
$classesDir = Join-Path $buildDir 'classes'
$stagingDir = Join-Path $buildDir 'staging'
$tmpDir = Join-Path $buildDir 'tmp'
$outputJar = Join-Path $buildDir "libs\heavyspear-1.21.1-$Version.jar"

foreach ($dir in @($classesDir, $tmpDir, (Split-Path $outputJar))) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}
if (Test-Path $classesDir) { Remove-Item -Recurse -Force $classesDir }
New-Item -ItemType Directory -Force -Path $classesDir | Out-Null

Write-Host '[1/4] compiling sources'
$sources = Get-ChildItem (Join-Path $root 'src/main/java') -Recurse -Filter *.java |
    ForEach-Object { To-ForwardSlashes $_.FullName }
$argFile = Join-Path $tmpDir 'javac.args'
$argLines = @(
    '-d', (To-ForwardSlashes $classesDir),
    '-encoding', 'UTF-8',
    '-proc:none',
    '-Xlint:all',
    '-classpath', ('"' + $classpath.Replace('\', '/') + '"')
) + $sources
Set-Content -Path $argFile -Value $argLines -Encoding ASCII
& $javac "@$argFile"
if ($LASTEXITCODE -ne 0) { throw "javac failed with exit code $LASTEXITCODE" }

Write-Host '[2/4] staging resources'
if (Test-Path $stagingDir) { Remove-Item -Recurse -Force $stagingDir }
New-Item -ItemType Directory -Force -Path $stagingDir | Out-Null
Copy-Item (Join-Path $classesDir 'com') $stagingDir -Recurse -Force
Copy-Item (Join-Path $root 'src/main/resources/*') $stagingDir -Recurse -Force

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$tomlPath = Join-Path $stagingDir 'META-INF/neoforge.mods.toml'
$toml = [System.IO.File]::ReadAllText($tomlPath, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText($tomlPath, $toml.Replace('${version}', $Version), $utf8NoBom)

Write-Host '[3/4] writing manifest'
$manifestPath = Join-Path $tmpDir 'MANIFEST.MF'
$manifestLines = @(
    'Manifest-Version: 1.0',
    'Implementation-Title: Heavy Spear',
    "Implementation-Version: $Version",
    'Implementation-Vendor: Heavy Spear contributors'
)
[System.IO.File]::WriteAllText($manifestPath, (($manifestLines -join "`r`n") + "`r`n"), $utf8NoBom)

Write-Host '[4/4] packaging jar'
if (Test-Path $outputJar) { Remove-Item -Force $outputJar }
& $jarTool --create --file $outputJar --manifest $manifestPath -C $stagingDir .
if ($LASTEXITCODE -ne 0) { throw "jar failed with exit code $LASTEXITCODE" }

Write-Host "done: $outputJar"
