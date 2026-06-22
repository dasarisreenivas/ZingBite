# sync_frontend.ps1
# Script to compile and sync the React frontend to the Gateway service

$mvn = "D:\apache-maven-3.9.6\bin\mvn.cmd"

Write-Host "1. Building React Frontend..." -ForegroundColor Cyan
Push-Location "d:\ZingBite\zingbite-react"
cmd.exe /c "npm run build"
if ($LASTEXITCODE -ne 0) {
    Write-Error "React build failed!"
    Pop-Location
    exit $LASTEXITCODE
}
Pop-Location

Write-Host "2. Syncing assets into Gateway Service..." -ForegroundColor Cyan
Push-Location "d:\ZingBite\zingbite-microservices"
& $mvn -pl gateway-service compile
if ($LASTEXITCODE -ne 0) {
    Write-Error "Gateway sync failed!"
    Pop-Location
    exit $LASTEXITCODE
}
Pop-Location

Write-Host "Frontend sync complete! Please restart the gateway-service." -ForegroundColor Green
