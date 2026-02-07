---
name: Localhost Repair
description: Troubleshooting and repairing the development server on port 5173.
---

# Localhost Repair

This skill provides tools to diagnose and fix issues with the development server when it becomes unresponsive or fails to load.

## Mechanism
- **Auto-Detection**: The scripts automatically scan `vite.config.ts`, `package.json`, and other config files to determine the correct port, server type, and start command.
- **Health Check**: Pings the detected port to see if it's listening and returning a 200 OK status.
- **Repair**: Stops existing processes on the detected port, clears orphaned instances of the detected server type, and restarts the server using the discovered command (e.g., `npm run dev`).

## Usage
Run the health check:
```bash
bash .agent/skills/localhost_repair/scripts/check_health.sh
```

Run the repair:
```bash
bash .agent/skills/localhost_repair/scripts/repair.sh
```

## Workflow
Use the slash command `/fix-localhost` to run the full diagnostic and repair sequence.
