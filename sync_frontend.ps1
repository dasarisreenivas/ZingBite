$distDir = "d:\ZingBite\zingbite-react\dist"
$webappDir = "d:\ZingBite\zingbite\src\main\webapp"
$wtpDir = "C:\Users\HP\eclipse-workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\zingbite"

# Verify dist exists
if (-not (Test-Path $distDir)) {
    Write-Error "dist directory not found. Build first."
    exit 1
}

# 1. Clean and sync webapp directory
Write-Host "Syncing webapp assets..."
if (Test-Path "$webappDir\assets") {
    Remove-Item -Path "$webappDir\assets\*" -Force -Recurse
} else {
    New-Item -ItemType Directory -Force -Path "$webappDir\assets"
}
Copy-Item -Path "$distDir\assets\*" -Destination "$webappDir\assets" -Force -Recurse
Copy-Item -Path "$distDir\index.html" -Destination "$webappDir\index.html" -Force

# 2. Clean and sync WTP deployment directory
Write-Host "Syncing WTP deployment assets..."
if (Test-Path $wtpDir) {
    if (Test-Path "$wtpDir\assets") {
        Remove-Item -Path "$wtpDir\assets\*" -Force -Recurse
    } else {
        New-Item -ItemType Directory -Force -Path "$wtpDir\assets"
    }
    Copy-Item -Path "$distDir\assets\*" -Destination "$wtpDir\assets" -Force -Recurse
    Copy-Item -Path "$distDir\index.html" -Destination "$wtpDir\index.html" -Force
} else {
    Write-Warning "WTP directory $wtpDir not found. Skipping deployment sync."
}

Write-Host "Frontend sync completed successfully!"
