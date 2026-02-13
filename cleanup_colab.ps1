
Write-Host "IMPORTANT: Please ensure Antigravity (VS Code) is completely CLOSED before running this script." -ForegroundColor Red
Write-Host "Press any key to continue once the editor is closed..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

$extensionsPath = "$env:USERPROFILE\.antigravity\extensions"
$storagePath = "$env:APPDATA\antigravity\User\globalStorage"
$manifestPath = "$extensionsPath\extensions.json"

# Define patterns to cleanup
$patterns = @(
    "ms-toolsai.jupyter*", 
    "google.colab*",
    "extensions.json"
)

# 1. Clean Extensions Directory
Write-Host "`nCleaning Extensions in $extensionsPath..." -ForegroundColor Cyan
if (Test-Path $extensionsPath) {
    foreach ($pattern in $patterns) {
        $items = Get-ChildItem -Path $extensionsPath -Filter $pattern -ErrorAction SilentlyContinue
        if ($items) {
            foreach ($item in $items) {
                Write-Host "Removing $($item.FullName)..."
                try {
                    Remove-Item -Path $item.FullName -Recurse -Force -ErrorAction Stop
                    Write-Host "Successfully removed $($item.Name)" -ForegroundColor Green
                } catch {
                    Write-Host "Failed to remove $($item.Name): $($_.Exception.Message)" -ForegroundColor Red
                }
            }
        }
    }
    
    # Explicitly ensure manifest is gone
    if (Test-Path $manifestPath) {
        Write-Host "Explicitly removing extensions.json..."
        Remove-Item -Path $manifestPath -Force -ErrorAction SilentlyContinue
    }
} else {
    Write-Host "Extensions folder not found." -ForegroundColor Red
}

Write-Host "NOTE: 'auto-accept-agent' folder was preserved." -ForegroundColor Yellow

# 2. Clean Global Storage
Write-Host "`nCleaning Global Storage in $storagePath..." -ForegroundColor Cyan
if (Test-Path $storagePath) {
    foreach ($pattern in $patterns) {
        $items = Get-ChildItem -Path $storagePath -Filter $pattern -ErrorAction SilentlyContinue
        if ($items) {
            foreach ($item in $items) {
                Write-Host "Removing $($item.FullName)..."
                try {
                    Remove-Item -Path $item.FullName -Recurse -Force -ErrorAction Stop
                    Write-Host "Successfully removed $($item.Name)" -ForegroundColor Green
                } catch {
                    Write-Host "Failed to remove $($item.Name): $($_.Exception.Message)" -ForegroundColor Red
                }
            }
        }
    }
} else {
    Write-Host "Global Storage folder not found." -ForegroundColor Red
}

Write-Host "`nCleanup complete. You can now restart Antigravity." -ForegroundColor Green
Pause
