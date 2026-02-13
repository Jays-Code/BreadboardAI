
$path = "$env:TEMP\BreadboardBuild"
if (Test-Path $path) {
    Get-ChildItem $path | Select-Object Name, @{Name="Size(MB)";Expression={[math]::Round($_.Length / 1MB, 2)}}
} else {
    Write-Host "Temp dir not found."
}
