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
$services = @("auth-service", "orders-service", "restaurant-service", "delivery-service", "careers-service", "chat-service", "gateway-service")
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
