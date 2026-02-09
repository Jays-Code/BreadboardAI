#!/bin/bash

# Antigravity server symlink workaround
# Bug: Antigravity 1.16.5 looks for node at .../bin/{commit}/node
# but server installs to .../bin/{version}-{commit}/node

echo "[Fix] Starting Antigravity connection fix..."

# Idempotency check: Atomic lock
FIX_LOCK="/tmp/antigravity-fix-v2.lock"
if ! mkdir "$FIX_LOCK" 2>/dev/null; then
    echo "[Fix] Antigravity fix monitor already running. Skipping."
    exit 0
fi
trap 'rm -rf "$FIX_LOCK"' EXIT
echo $$ > "$FIX_LOCK/pid"

# The server directory is usually in the user's home directory
SERVER_DIR="$HOME/.antigravity-server/bin"

# Run in a loop with a 2-hour timeout
START_LOOP=$(date +%s)
(
    mkdir -p "$SERVER_DIR"
    while true; do
        NOW_LOOP=$(date +%s)
        if [ $((NOW_LOOP - START_LOOP)) -gt 7200 ]; then
            echo "[Fix] Timeout reached. Exiting."
            exit 0
        fi

        # Check for directories matching the pattern version-commit
        for dir in "$SERVER_DIR"/*-*; do
            if [ -d "$dir" ]; then
                dirname=$(basename "$dir")
                commit="${dirname#*-}"
                if [ -n "$commit" ] && [ "$commit" != "$dirname" ]; then
                   symlink="$SERVER_DIR/$commit"
                   if [ ! -e "$symlink" ]; then
                       ln -s "$dir" "$symlink" 2>/dev/null && echo "[Fix] Created symlink $commit -> $dirname"
                   fi
                fi
            fi
        done
        sleep 1
    done
) >/tmp/antigravity-fix.log 2>&1 &

echo "[Fix] Background monitor started (2h timeout)."
