$distDir = "d:\ZingBite\zingbite-react\dist"
$targetDir1 = "C:\Users\HP\eclipse-workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\zingbite"
$targetDir2 = "d:\ZingBite\zingbite\src\main\webapp"

Write-Host "Syncing compiled React frontend assets..."
Write-Host "Source: $distDir"
Write-Host "Target 1 (Tomcat WTP): $targetDir1"
Write-Host "Target 2 (Source Webapp): $targetDir2"

# Ensure target directories exist
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
