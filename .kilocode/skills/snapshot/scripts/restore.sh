#!/bin/bash

# Snapshot Restore Script
# Resets workspace to a specific checkpoint.

TARGET="${1:-latest}"
SNAPSHOT_LOG=".agent/skills/snapshot/snapshots.log"

# SAFETY: Check for uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
  if [[ "$2" != "--force" ]]; then
    echo "ERROR: Uncommitted changes detected. Aborting restore to prevent data loss."
    echo "Use --force to override."
    exit 1
  fi
fi

if [[ "$TARGET" == "latest" ]]; then
  # Grab last tag from log
  TARGET=$(tail -n 1 "$SNAPSHOT_LOG" | awk '{print $3}')
  if [[ -z "$TARGET" ]]; then
    echo "ERROR: No snapshots found in log."
    exit 1
  fi
fi

echo "WARNING: This will hard reset the workspace to '$TARGET'."
# In an interactive shell we might ask for confirmation, but for agent use we rely on the input arguments.

git reset --hard "$TARGET"
echo "✅ Restored to $TARGET"
