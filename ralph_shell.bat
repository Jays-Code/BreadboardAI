@echo off
set "SB_PATH=C:\Program Files\Sandboxie-Plus\Start.exe"
set "PS_PATH=C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe"

if "%~1"=="" (
    "%SB_PATH%" /box:RalphBox "%PS_PATH%" -NoExit
) else (
    "%SB_PATH%" /box:RalphBox "%PS_PATH%" -Command "& { %* }"
)