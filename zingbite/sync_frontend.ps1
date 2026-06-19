$distDir = "d:\ZingBite\zingbite-react\dist"
$targetDir1 = "C:\Users\HP\eclipse-workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\zingbite"
$targetDir2 = "d:\ZingBite\zingbite\src\main\webapp"

Write-Host "Syncing compiled React frontend assets..."
Write-Host "Source: $distDir"
Write-Host "Target 1 (Tomcat WTP): $targetDir1"
Write-Host "Target 2 (Source Webapp): $targetDir2"

# Clean target assets folders first
$targetAssets1 = Join-Path $targetDir1 "assets"
if (Test-Path $targetAssets1) {
    Remove-Item -Path "$targetAssets1\*" -Recurse -Force
    Write-Host "Cleaned old assets in Target 1: $targetAssets1"
}

$targetAssets2 = Join-Path $targetDir2 "assets"
if (Test-Path $targetAssets2) {
    Remove-Item -Path "$targetAssets2\*" -Recurse -Force
    Write-Host "Cleaned old assets in Target 2: $targetAssets2"
}

# Ensure target directories exist and copy
if (-not (Test-Path $targetDir1)) {
    Write-Warning "Target directory 1 does not exist. Skipping Tomcat copy."
} else {
    Copy-Item -Path "$distDir\*" -Destination $targetDir1 -Recurse -Force
    Write-Host "Successfully synced to Tomcat WTP deployment!"
}

if (-not (Test-Path $targetDir2)) {
    Write-Warning "Target directory 2 does not exist."
} else {
    Copy-Item -Path "$distDir\*" -Destination $targetDir2 -Recurse -Force
    Write-Host "Successfully synced to Source Webapp!"
}

Write-Host "Frontend sync complete!"
