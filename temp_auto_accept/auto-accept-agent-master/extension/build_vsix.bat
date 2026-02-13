@echo off
echo Building Auto Accept Agent...
cd /d "%~dp0"
npx vsce package
if %ERRORLEVEL% EQU 0 (
    echo Build successful!
) else (
    echo Build failed with error %ERRORLEVEL%
)
pause
