#!/bin/bash

# Antigravity server symlink workaround
# Bug: Antigravity 1.16.5 looks for node at .../bin/{commit}/node
# but server installs to .../bin/{version}-{commit}/node

echo "[Fix] Starting Antigravity connection fix..."

# The server directory is usually in the user's home directory
SERVER_DIR="$HOME/.antigravity-server/bin"

if [ ! -d "$SERVER_DIR" ]; then
    echo "[Fix] Server directory $SERVER_DIR not found yet. Waiting..."
fi

# Run in a loop to catch the server installation when it happens
# Using a subshell to allow backgrounding
(
    mkdir -p "$SERVER_DIR"
    while true; do
        # Check for directories matching the pattern version-commit
        for dir in "$SERVER_DIR"/*-*; do
            if [ -d "$dir" ]; then
                dirname=$(basename "$dir")
                # Extract commit hash (everything after the first hyphen)
                commit="${dirname#*-}"
                
                # Check if we got a valid commit hash
                if [ -n "$commit" ] && [ "$commit" != "$dirname" ]; then
                   symlink="$SERVER_DIR/$commit"
                   if [ ! -e "$symlink" ]; then
                       ln -s "$dir" "$symlink" 2>/dev/null && echo "[Fix] Created symlink $commit -> $dirname"
                   fi
                fi
            fi
        done
        # Sleep short enough to beat the IDE's connection attempt but long enough to not burn CPU
        sleep 0.2
    done
) >/tmp/antigravity-fix.log 2>&1 &

echo "[Fix] Background monitor started."
