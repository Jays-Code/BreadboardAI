#!/bin/bash

# Snapshot Checkpoint Script
# Creates a git tag/commit for safety status.

MSG="${1:-Auto-Checkpoint}"
SNAPSHOT_LOG=".agent/skills/snapshot/snapshots.log"
mkdir -p "$(dirname "$SNAPSHOT_LOG")"

# SAFETY: Prevent running on main/master
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$CURRENT_BRANCH" == "main" || "$CURRENT_BRANCH" == "master" ]]; then
  echo "ERROR: Snapshotting is forbidden on '$CURRENT_BRANCH'. Switch to a feature branch."
  exit 1
fi

# Create a safety commit (allow-empty to ensure we can always tag)
git add .
git commit -m "SNAPSHOT: $MSG" --allow-empty

# Tag it
HASH=$(git rev-parse --short HEAD)
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
TAG="snap-${TIMESTAMP}-${HASH}"

git tag "$TAG"

echo "[$TIMESTAMP] $TAG : $MSG" >> "$SNAPSHOT_LOG"
echo "✅ Checkpoint created: $TAG"
