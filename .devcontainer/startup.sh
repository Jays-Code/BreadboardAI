#!/bin/bash

# Ensure we are in the project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.." || exit 1

# 0. Safety Guards
# Explicit recursion check
if [ "$SHLVL" -gt 4 ]; then
    echo "[Startup] CRITICAL: Shell level too high ($SHLVL). Aborting to prevent infinite recursion."
    exit 1
fi

# Atomic lockfile creation using mkdir (idempotent and race-condition safe)
LOCKDIR="/tmp/startup_v2.lock"
if ! mkdir "$LOCKDIR" 2>/dev/null; then
    # Check if the locking process actually exists
    if [ -f "$LOCKDIR/pid" ]; then
        OLD_PID=$(cat "$LOCKDIR/pid")
        if ps -p "$OLD_PID" > /dev/null 2>&1; then
            echo "[Startup] Another instance is already running (PID: $OLD_PID). skipping."
            exit 0
        fi
    fi
    # Stale lock or partial creation, cleanup and retry once
    rm -rf "$LOCKDIR"
    mkdir "$LOCKDIR" || exit 1
fi
echo $$ > "$LOCKDIR/pid"
trap 'rm -rf "$LOCKDIR"' EXIT

# Cooldown to prevent rapid re-attach loops
LAST_RUN_FILE="/tmp/startup.last_run"
NOW=$(date +%s)
if [ -f "$LAST_RUN_FILE" ]; then
    LAST_RUN=$(cat "$LAST_RUN_FILE")
    DIFF=$((NOW - LAST_RUN))
    if [ "$DIFF" -lt 15 ]; then
        echo "[Startup] Cooldown active ($DIFF seconds). Skipping."
        exit 0
    fi
fi
echo "$NOW" > "$LAST_RUN_FILE"

# Start Memory Guard if not running
if ! pgrep -f "memory_guard.sh" > /dev/null; then
    bash /workspaces/BreadboardAI/.devcontainer/memory_guard.sh > /tmp/memory_guard.log 2>&1 &
fi

echo "[Startup] Initializing services (Logs -> /tmp/)..."

# 2. Start the Frontend (Vite)
# Precision pgrep to avoid matching other node processes
if ! pgrep -f "vite.*vite.config.ts$" > /dev/null; then
    echo "[Startup] Starting Vite dev server..."
    nohup /usr/local/bin/node /workspaces/BreadboardAI/node_modules/.bin/vite --config /workspaces/BreadboardAI/vite.config.ts > /tmp/vite.log 2>&1 &
    sleep 1
fi

# 3. Start the Bridge Server
if ! pgrep -f "src/bridge/server.ts" > /dev/null; then
    echo "[Startup] Starting Bridge Server (Port 3000)..."
    nohup bash /workspaces/BreadboardAI/fix_bridge.sh > /tmp/bridge_fix.log 2>&1 &
    sleep 1
fi

# 4. Start the Editor UI
if ! pgrep -f "tools/editor/vite.config.ts$" > /dev/null; then
    echo "[Startup] Starting Editor UI (Port 5174)..."
    nohup /usr/local/bin/node /workspaces/BreadboardAI/node_modules/.bin/vite --config /workspaces/BreadboardAI/tools/editor/vite.config.ts > /tmp/editor.log 2>&1 &
fi

echo "[Startup] Services checked. Logs in /tmp/"
exit 0
