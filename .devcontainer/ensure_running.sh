#!/bin/bash
# .devcontainer/ensure_running.sh
# Checks if core services are running without triggering heavy initialization

LOG="/tmp/attach_history.log"
echo "[$(date)] Attach: SHLVL=$SHLVL" >> "$LOG"

# 1. Start Memory Guard if missing (very cheap check)
if ! pgrep -f "memory_guard.sh" > /dev/null; then
    echo "[$(date)] Memory guard missing. Restarting..." >> "$LOG"
    nohup bash /workspaces/BreadboardAI/.devcontainer/memory_guard.sh > /tmp/memory_guard.log 2>&1 &
fi

# 2. Check if main servers are running. If NOT, we don't start them HERE
# because that can trigger recursion. We leave it to the user or initial startup.
# However, for a better UX, we can log a warning.
if ! pgrep -f "src/bridge/server.ts" > /dev/null; then
    echo "[$(date)] WARNING: Bridge Server is NOT running." >> "$LOG"
fi

if ! pgrep -f "vite.*vite.config.ts$" > /dev/null; then
    echo "[$(date)] WARNING: Vite Dev Server is NOT running." >> "$LOG"
fi
