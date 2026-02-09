#!/bin/bash

# Localhost Repair Script
# Kills orphaned processes and restarts the dev server.

# --- Context Detection ---
PORT=5173
START_CMD="npm run dev"
PROC_TYPE="vite"

if [ -f "vite.config.ts" ] || [ -f "vite.config.js" ]; then
  DETECTED_PORT=$(grep -hoP 'port:\s*\K\d+' vite.config.* | head -n 1)
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
  
  # Check if listening on IPv4 (0.0.0.0) vs IPv6 (::)
  if netstat -tulnp | grep -q "0.0.0.0:$PORT"; then
    echo "💡 Verified: Server is using IPv4 (0.0.0.0), which is ideal for IDE proxying."
  else
    echo "⚠️ Warning: Server is listening on IPv6 or localhost only. If unreachable, try forcing '0.0.0.0' in your config."
  fi

  # Configuration Check (Modern Best Practices)
  if [ -f "vite.config.ts" ]; then
    if ! grep -q "strictPort: true" vite.config.ts; then
      echo "📝 Tip: Add 'strictPort: true' to your vite.config.ts to prevent random port mapping."
    fi
  fi
else
  echo "❌ Error: Server failed to restart. Check dev_output.txt for details."
  exit 1
fi
