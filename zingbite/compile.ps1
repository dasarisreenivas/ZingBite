$javac = "C:\Program Files\Java\jdk-25.0.2\bin\javac.exe"
$outDir1 = "C:\Users\HP\eclipse-workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\zingbite\WEB-INF\classes"
$outDir2 = "d:\ZingBite\zingbite\target\classes"

# Create output directories if they don't exist
if (-not (Test-Path $outDir1)) { New-Item -ItemType Directory -Force -Path $outDir1 }
if (-not (Test-Path $outDir2)) { New-Item -ItemType Directory -Force -Path $outDir2 }

# Gather lib jar paths
$libJars = Get-ChildItem "C:\Users\HP\eclipse-workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\zingbite\WEB-INF\lib\*.jar" | ForEach-Object { $_.FullName }
$tomcatJars = Get-ChildItem "D:\apache-tomcat-10.0.27\lib\*.jar" | ForEach-Object { $_.FullName }
$classpath = ($libJars + $tomcatJars) -join ";"

# Gather java files
$javaFiles = Get-ChildItem "src/main/java" -Filter *.java -Recurse | ForEach-Object { $_.FullName }

Write-Host "Compiling $($javaFiles.Count) Java files..."
Write-Host "Output Directory 1: $outDir1"

# Run javac
$params = @(
    "-cp", $classpath,
    "-d", $outDir1,
    "-encoding", "UTF-8"
)
$params += $javaFiles

& $javac $params

if ($LASTEXITCODE -eq 0) {
    Write-Host "Compilation to $outDir1 succeeded!"
    
    # Sync classes to target/classes
    Write-Host "Copying compiled classes to target/classes..."
    Copy-Item -Path "$outDir1\*" -Destination $outDir2 -Recurse -Force
    Write-Host "Sync complete!"
} else {
    Write-Error "Compilation failed with exit code $LASTEXITCODE"
    exit $LASTEXITCODE
}
