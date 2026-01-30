#!/bin/bash

# Localhost Repair Script
# Kills orphaned processes and restarts the dev server.

# --- Context Detection ---
PORT=5173
START_CMD="npm run dev"
PROC_TYPE="vite"

if [ -f "vite.config.ts" ] || [ -f "vite.config.js" ]; then
  DETECTED_PORT=$(grep -oP 'port:\s*\K\d+' vite.config.* | head -n 1)
  [ -n "$DETECTED_PORT" ] && PORT=$DETECTED_PORT
  PROC_TYPE="vite"
elif [ -f "package.json" ]; then
  if grep -q "next" package.json; then 
    PORT=3000; 
    PROC_TYPE="next-server"; 
    START_CMD="npm run dev";
  fi
fi

echo "🚀 Initiating Repair for $PROC_TYPE on port $PORT..."

# 1. Kill any existing processes on the detected port
echo "Stopping any processes on port $PORT..."
fuser -k $PORT/tcp || true

# 2. Kill orphaned processes by type
echo "Cleaning up orphaned $PROC_TYPE processes..."
pkill -f $PROC_TYPE || true

# 3. Restart the server in the background
echo "Restarting server using '$START_CMD'..."
nohup $START_CMD > dev_output.txt 2>&1 &

# 4. Wait for startup
echo "Waiting for server to initialize..."
sleep 5

# 5. Final verification
if lsof -i :$PORT > /dev/null; then
  echo "✅ Success: Server restarted and listening on port $PORT."
else
  echo "❌ Error: Server failed to restart. Check dev_output.txt for details."
  exit 1
fi
