# run_tests.ps1 - Execute E2E tests for ZingBite

$pythonExe = "C:\Users\HP\AppData\Local\hermes\hermes-agent\venv\Scripts\python.exe"

# Add the root directory to PYTHONPATH so utils can be imported in tests
$env:PYTHONPATH = "d:\ZingBite\zingbite-e2e"

Write-Host "Running All ZingBite E2E Tests..."
& $pythonExe -m pytest -v tests/

exit $LASTEXITCODE
