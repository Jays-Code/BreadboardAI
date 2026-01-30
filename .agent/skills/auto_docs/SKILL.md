---
name: Auto-Docs Generator
description: Automatically updates CHANGELOG.md and README.md based on progress_log.txt entries.
---

# Auto-Docs Generator

This skill keeps project documentation in sync with the actual work performed by the agent.

## How it Works
1.  Reads `Agent Ralph Instructions/progress_log.txt`.
2.  Parses the latest "Task" entries (identifying Action, Files Modified, and Outcome).
3.  Updates `CHANGELOG.md` with a formatted list of changes.
4.  Updates the "Recent Progress" section in `README.md`.

## Usage
Run the sync script:
```bash
node .agent/skills/auto_docs/scripts/sync_docs.js
```

## Configuration
- Input Log: `Agent Ralph Instructions/progress_log.txt`
- Output Files: `CHANGELOG.md`, `README.md`
