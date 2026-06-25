$repoRoot = "d:\ZingBite"
$envFile = Join-Path $repoRoot ".env"
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
}
$services = @("auth-service", "orders-service", "restaurant-service", "delivery-service", "careers-service", "chat-service", "ai-service", "gateway-service")
$mlServiceRoot = Join-Path $repoRoot "zingbite-ml-service"

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

if (Test-Path $mlServiceRoot) {
    $python = Get-ZingBitePython
    if ($python) {
        if (-not $env:ZINGBITE_ML_SERVICE_URL) {
            $env:ZINGBITE_ML_SERVICE_URL = "http://localhost:5010"
        }
        Write-Host "Starting zingbite-ml-service..."
        Start-Process -FilePath $python.FilePath -ArgumentList $python.Args -WorkingDirectory $mlServiceRoot -WindowStyle Hidden
        Start-Sleep -Seconds 2
    } else {
        Write-Warning "Python was not found. Skipping zingbite-ml-service. Set ZINGBITE_PYTHON to enable it."
    }
}

foreach ($service in $services) {
    $jarPath = "d:\ZingBite\zingbite-microservices\$service\target\$service-0.0.1-SNAPSHOT.jar"
    Write-Host "Starting $service..."
    Start-Process -FilePath "java.exe" -ArgumentList "-jar `"$jarPath`"" -WorkingDirectory "d:\ZingBite\zingbite-microservices" -NoNewWindow
    Start-Sleep -Seconds 2
}
Write-Host "Headless services launched!"
# Keep the process alive so that the sandbox task does not exit and terminate child processes
while ($true) {
    Start-Sleep -Seconds 60
}
