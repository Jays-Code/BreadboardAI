
$projectRoot = "G:\My Drive\CodingProjects\BreadboardAI"
$tempDir = "$env:TEMP\BreadboardBuild"
$zipPath = "$projectRoot\node_modules.zip"

Write-Host "Creating temp build environment at $tempDir..." -ForegroundColor Cyan
if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force }
New-Item -ItemType Directory -Path $tempDir | Out-Null

Copy-Item "$projectRoot\package.json" $tempDir
# Copy lock file if exists
if (Test-Path "$projectRoot\package-lock.json") { Copy-Item "$projectRoot\package-lock.json" $tempDir }

Set-Location $tempDir
Write-Host "Running npm install in temp dir (Fast & Safe)..." -ForegroundColor Cyan

# Use cmd /c to ensure npm is found
cmd /c npm install

if (-not (Test-Path "node_modules")) {
    Write-Host "npm install failed." -ForegroundColor Red
    exit 1
}

Write-Host "Zipping node_modules..." -ForegroundColor Cyan
Compress-Archive -Path "node_modules" -DestinationPath "node_modules.zip" -CompressionLevel Optimal

Write-Host "Moving zip to Drive (Only one I/O operation)..." -ForegroundColor Cyan
Move-Item "node_modules.zip" $zipPath -Force

Write-Host "Cleanup..."
Set-Location "$env:USERPROFILE"
Remove-Item $tempDir -Recurse -Force

Write-Host "Done! node_modules.zip is ready at $zipPath" -ForegroundColor Green
