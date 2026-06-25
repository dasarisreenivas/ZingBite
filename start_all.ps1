# start_all.ps1
# PowerShell script to start all ZingBite microservices concurrently

param(
    [ValidateSet("1", "2", "3")]
    [string]$Mode
)

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$microservicesRoot = Join-Path $repoRoot "zingbite-microservices"
$frontendRoot = Join-Path $repoRoot "zingbite-react"
$mlServiceRoot = Join-Path $repoRoot "zingbite-ml-service"
$envFile = Join-Path $repoRoot ".env"
$OutputEncoding = [Text.UTF8Encoding]::new($false)
[Console]::OutputEncoding = [Text.UTF8Encoding]::new($false)

if (Test-Path $envFile) {
    foreach ($line in Get-Content $envFile) {
        $trimmed = $line.Trim()
        if (-not $trimmed -or $trimmed.StartsWith("#")) {
            continue
        }

        $separator = $trimmed.IndexOf("=")
        if ($separator -le 0) {
            continue
        }

        $name = $trimmed.Substring(0, $separator).Trim()
        $value = $trimmed.Substring($separator + 1).Trim()
        [Environment]::SetEnvironmentVariable($name, $value, "Process")
    }
    Write-Host "Loaded local configuration from .env" -ForegroundColor DarkGreen
}

$mvn = (Get-Command mvn.cmd -ErrorAction SilentlyContinue).Source
if (-not $mvn) {
    $mvn = Get-ChildItem "$HOME\.m2\wrapper\dists\apache-maven-*\*\apache-maven-*\bin\mvn.cmd" -ErrorAction SilentlyContinue |
        Sort-Object LastWriteTime -Descending |
        Select-Object -First 1 -ExpandProperty FullName
}
if (-not $mvn) {
    throw "Maven was not found. Install Maven or add mvn.cmd to PATH."
}
$services = @("auth-service", "orders-service", "restaurant-service", "delivery-service", "careers-service", "chat-service", "ai-service", "gateway-service")

function Get-ZingBitePython {
    if ($env:ZINGBITE_PYTHON -and (Test-Path $env:ZINGBITE_PYTHON)) {
        return @{ FilePath = $env:ZINGBITE_PYTHON; Args = @("app.py") }
    }

    $python = (Get-Command python.exe -ErrorAction SilentlyContinue).Source
    if ($python) {
        return @{ FilePath = $python; Args = @("app.py") }
    }

    $py = (Get-Command py.exe -ErrorAction SilentlyContinue).Source
    if ($py) {
        return @{ FilePath = $py; Args = @("-3", "app.py") }
    }

    return $null
}

function Start-ZingBiteMlService {
    if (-not (Test-Path $mlServiceRoot)) {
        return
    }

    $python = Get-ZingBitePython
    if (-not $python) {
        Write-Warning "Python was not found. Skipping zingbite-ml-service. Set ZINGBITE_PYTHON to enable it."
        return
    }

    if (-not $env:ZINGBITE_ML_SERVICE_URL) {
        $env:ZINGBITE_ML_SERVICE_URL = "http://localhost:5010"
    }

    Write-Host "Launching zingbite-ml-service at $env:ZINGBITE_ML_SERVICE_URL..." -ForegroundColor DarkGreen
    Start-Process -FilePath $python.FilePath -ArgumentList $python.Args -WorkingDirectory $mlServiceRoot -WindowStyle Hidden
    Start-Sleep -Seconds 2
}

function Stop-ZingBiteServices {
    $running = @(Get-CimInstance Win32_Process -Filter "name = 'java.exe'" -ErrorAction Stop |
        Where-Object {
            $_.CommandLine -like "*$microservicesRoot*"
        })
    $mlRunning = @(Get-CimInstance Win32_Process -ErrorAction Stop |
        Where-Object {
            $_.Name -like "python*" -and $_.CommandLine -like "*$mlServiceRoot*"
        })

    if ($running.Count -eq 0 -and $mlRunning.Count -eq 0) {
        return
    }

    $processIds = @($running + $mlRunning | Select-Object -ExpandProperty ProcessId -Unique)
    Write-Host "Stopping existing ZingBite services before restart..." -ForegroundColor Yellow
    Stop-Process -Id $processIds -Force -ErrorAction Stop

    $deadline = (Get-Date).AddSeconds(15)
    do {
        $remaining = @(Get-Process -Id $processIds -ErrorAction SilentlyContinue)
        if ($remaining.Count -gt 0) {
            Start-Sleep -Milliseconds 250
        }
    } while ($remaining.Count -gt 0 -and (Get-Date) -lt $deadline)

    if ($remaining.Count -gt 0) {
        throw "Some existing ZingBite services did not stop within 15 seconds."
    }
}

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "      ZingBite Microservices Launcher        " -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "1. Start via Maven (Dev Mode - slower startup, no manual build required)"
Write-Host "2. Build & Start via JARs (Fast Mode - fast startup, builds all projects first)"
Write-Host "3. Start via JARs directly (Fastest - starts existing built JARs immediately)"
$choice = if ($Mode) { $Mode } else { Read-Host "Select option [1-3]" }

if ($choice -eq "2") {
    Write-Host "Building the frontend..." -ForegroundColor Yellow
    Push-Location $frontendRoot
    & npm.cmd run build
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Frontend build failed! Cannot launch services."
        Pop-Location
        exit $LASTEXITCODE
    }
    Pop-Location

    Stop-ZingBiteServices

    Write-Host "Building all services (skipping tests)..." -ForegroundColor Yellow
    Push-Location $microservicesRoot
    & $mvn clean package -DskipTests
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Build failed! Cannot launch services."
        Pop-Location
        exit $LASTEXITCODE
    }
    Pop-Location
}

if ($choice -eq "1") {
    Stop-ZingBiteServices
    Start-ZingBiteMlService
    Write-Host "Launching services via Maven..." -ForegroundColor Green
    foreach ($service in $services) {
        Write-Host "Launching $service..." -ForegroundColor DarkGreen
        Start-Process -FilePath cmd.exe -ArgumentList "/k", "title $service & `"$mvn`" -pl $service spring-boot:run" -WorkingDirectory $microservicesRoot
        Start-Sleep -Seconds 2
    }
} elseif ($choice -eq "2" -or $choice -eq "3") {
    if ($choice -eq "3") {
        Stop-ZingBiteServices
    }
    Start-ZingBiteMlService
    Write-Host "Launching services via JAR files..." -ForegroundColor Green
    foreach ($service in $services) {
        $jarPath = Join-Path $microservicesRoot "$service\target\$service-0.0.1-SNAPSHOT.jar"
        if (-not (Test-Path $jarPath)) {
            Write-Warning "JAR for $service not found! Please run option 2 to build first."
            continue
        }
        Write-Host "Launching $service..." -ForegroundColor DarkGreen
        Start-Process -FilePath cmd.exe -ArgumentList "/k", "title $service & java -jar `"$jarPath`"" -WorkingDirectory $microservicesRoot
        Start-Sleep -Seconds 1
    }
} else {
    Write-Host "Invalid option. Exiting." -ForegroundColor Red
}

Write-Host "All services launched!" -ForegroundColor Green
