# run_tests.ps1 - Execute E2E tests for ZingBite

$pythonExe = if ($env:ZINGBITE_PYTHON) {
    $env:ZINGBITE_PYTHON
} else {
    (Get-Command python -ErrorAction Stop).Source
}

# Add the root directory to PYTHONPATH so utils can be imported in tests
$env:PYTHONPATH = $PSScriptRoot

Write-Host "Running All ZingBite E2E Tests..."
& $pythonExe -m pytest -v tests/

exit $LASTEXITCODE
