#!/bin/bash

# Localhost Health Check Script
# Checks if the development server is listening and responding.

# --- Context Detection ---
PORT=5173 # Default

if [ -f "vite.config.ts" ] || [ -f "vite.config.js" ]; then
  DETECTED_PORT=$(grep -oP 'port:\s*\K\d+' vite.config.* | head -n 1)
  [ -n "$DETECTED_PORT" ] && PORT=$DETECTED_PORT
elif [ -f "package.json" ]; then
  # Fallback: check for next.js or other common defaults
  if grep -q "next" package.json; then PORT=3000; fi
fi

URL="http://localhost:$PORT"
echo "🔍 Detected environment. Checking $URL..."

# Check if port is listening
if ! lsof -i :$PORT > /dev/null; then
  echo "❌ Error: Port $PORT is NOT listening."
  exit 1
fi

# Check if HTTP response is successful
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")

if [ "$HTTP_STATUS" -eq 200 ]; then
  echo "✅ Success: Server is responding on port $PORT (HTTP 200)."
  exit 0
else
  echo "❌ Error: Server on port $PORT returned HTTP $HTTP_STATUS."
  exit 1
fi
