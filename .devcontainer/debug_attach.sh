#!/bin/bash
# .devcontainer/debug_attach.sh
# Logs attach events to /tmp to debug recursion loops without triggering HMR

LOG="/tmp/attach_history.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$TIMESTAMP] Attach detected: SHLVL=$SHLVL, USER=$USER, PWD=$PWD" >> "$LOG"

# If recursion is detected, log it loudly
if [ "$SHLVL" -gt 10 ]; then
    echo "[$TIMESTAMP] !!! RECURSION DETECTED !!! SHLVL exceeding safe limits." >> "$LOG"
fi
