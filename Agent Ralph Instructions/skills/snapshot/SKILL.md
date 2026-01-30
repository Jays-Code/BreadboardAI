---
name: Snapshot & Restore
description: Safety checkpointing for agent operations.
---

# Snapshot & Restore

This skill provides a safety net for the agent to save and restore state before performing risky operations.

## CRITICAL SAFETY RULES
1.  **NO RAW GIT COMMANDS**: You are FORBIDDEN from running `git reset`, `git commit`, or `git push` manually. You MUST use the provided scripts.
2.  **USE WRAPPERS ONLY**: Always use `checkpoint.sh` to save state and `restore.sh` to revert.
3.  **CHECK OUTPUT**: If a script fails (e.g., due to dirty state), STOP and notify the user.

## Scripts
- `checkpoint.sh`: Creates a local git snapshot. Fails if on protected branches (main/master).
- `restore.sh [snapshot_id]`: Reverts the workspace to a snapshot. Fails if uncommitted changes exist (unless forced).

## Usage
### Create Checkpoint
```bash
bash .agent/skills/snapshot/scripts/checkpoint.sh "Pre-Refactor Safety"
```

### Restore Checkpoint
```bash
# Restore latest
bash .agent/skills/snapshot/scripts/restore.sh

# Restore specific ID
bash .agent/skills/snapshot/scripts/restore.sh <hash>
```
