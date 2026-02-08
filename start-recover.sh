#!/bin/bash
# Clean start script
echo "Starting Bridge Server..."
node src/bridge/server.cjs > bridge_log.txt 2>&1 &
echo "Starting Dev Server..."
npm run dev > dev_log.txt 2>&1 &
sleep 15
echo "Checking health..."
bash .agent/skills/localhost_repair/scripts/check_health.sh