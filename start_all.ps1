# start_all.ps1
# PowerShell script to start all ZingBite microservices concurrently

$mvn = "D:\apache-maven-3.9.6\bin\mvn.cmd"
$services = @("auth-service", "orders-service", "restaurant-service", "delivery-service", "careers-service", "chat-service", "gateway-service")

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "      ZingBite Microservices Launcher        " -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "1. Start via Maven (Dev Mode - slower startup, no manual build required)"
Write-Host "2. Build & Start via JARs (Fast Mode - fast startup, builds all projects first)"
Write-Host "3. Start via JARs directly (Fastest - starts existing built JARs immediately)"
$choice = Read-Host "Select option [1-3]"

if ($choice -eq "2") {
    Write-Host "Building all services (skipping tests)..." -ForegroundColor Yellow
    Push-Location "d:\ZingBite\zingbite-microservices"
    & $mvn clean package -DskipTests
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Build failed! Cannot launch services."
        Pop-Location
        exit $LASTEXITCODE
    }
    Pop-Location
}

if ($choice -eq "1") {
    Write-Host "Launching services via Maven..." -ForegroundColor Green
    foreach ($service in $services) {
        Write-Host "Launching $service..." -ForegroundColor DarkGreen
        Start-Process cmd.exe -ArgumentList "/k title $service && cd /d d:\ZingBite\zingbite-microservices && $mvn -pl $service spring-boot:run"
        Start-Sleep -Seconds 2
    }
} elseif ($choice -eq "2" -or $choice -eq "3") {
    Write-Host "Launching services via JAR files..." -ForegroundColor Green
    foreach ($service in $services) {
        $jarPath = "d:\ZingBite\zingbite-microservices\$service\target\$service-0.0.1-SNAPSHOT.jar"
        if (-not (Test-Path $jarPath)) {
            Write-Warning "JAR for $service not found! Please run option 2 to build first."
            continue
        }
        Write-Host "Launching $service..." -ForegroundColor DarkGreen
        Start-Process cmd.exe -ArgumentList "/k title $service && java -jar $jarPath"
        Start-Sleep -Seconds 1
    }
} else {
    Write-Host "Invalid option. Exiting." -ForegroundColor Red
}

Write-Host "All services launched!" -ForegroundColor Green
