# Setup script for Auto Accept Agent
# This script adds the --remote-debugging-port=9000 flag to Antigravity shortcuts.

$flag = " --remote-debugging-port=9000"
$idename = "Antigravity"

Write-Host "Searching for $idename shortcuts..." -ForegroundColor Cyan

$shortcuts = Get-ChildItem -Path "$env:PUBLIC\Desktop", "$env:USERPROFILE\Desktop", "$env:APPDATA\Microsoft\Windows\Start Menu\Programs", "$env:PROGRAMDATA\Microsoft\Windows\Start Menu\Programs" -Filter "*$idename*.lnk" -Recurse

if ($shortcuts.Count -eq 0) {
    Write-Warning "No $idename shortcuts found. Please add '$flag' manually to your IDE shortcut Target field."
    exit
}

$shell = New-Object -ComObject WScript.Shell

foreach ($shortcut in $shortcuts) {
    Write-Host "Updating shortcut: $($shortcut.FullName)" -ForegroundColor Green
    $lnk = $shell.CreateShortcut($shortcut.FullName)
    
    if ($lnk.Arguments -notlike "*$flag*") {
        $lnk.Arguments += $flag
        $lnk.Save()
        Write-Host "Successfully updated." -ForegroundColor Green
    } else {
        Write-Host "Shortcut already has the flag." -ForegroundColor Yellow
    }
}

Write-Host "`nSetup complete! Please RESTART Antigravity completely for changes to take effect." -ForegroundColor Cyan
Write-Host "Verify by looking for 'Auto Accept: ON' in the status bar after installing the VSIX." -ForegroundColor Cyan
