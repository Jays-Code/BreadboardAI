#!/bin/bash
# Definitive Bridge Server Restoration Script
set -e

PROJECT_ROOT="/workspaces/BreadboardAI"
EDITOR_NM="$PROJECT_ROOT/tools/editor/node_modules"
ROOT_NM="$PROJECT_ROOT/node_modules"

echo "[1/4] Synchronizing Core Scopes..."
mkdir -p "$ROOT_NM/@breadboard-ai" "$ROOT_NM/@google-labs"
cp -LR "$EDITOR_NM/@breadboard-ai/." "$ROOT_NM/@breadboard-ai/" 2>/dev/null || true
cp -LR "$EDITOR_NM/@google-labs/." "$ROOT_NM/@google-labs/" 2>/dev/null || true

echo "[2/4] Fixing Deep Dependency Resolution..."
# Ensure the Build Kit can see the core Breadboard package
mkdir -p "$ROOT_NM/@breadboard-ai/build/node_modules/@google-labs"
ln -snf "$ROOT_NM/@google-labs/breadboard" "$ROOT_NM/@breadboard-ai/build/node_modules/@google-labs/breadboard"

echo "[3/4] Resolving Entry Points and Missing Assets..."
# Fix the main index.js for packages that don't respect the exports map
mkdir -p "$ROOT_NM/@google-labs/breadboard/dist/src"
cp "$ROOT_NM/@google-labs/breadboard/dist/src/index.js" "$ROOT_NM/@google-labs/breadboard/index.js" 2>/dev/null || true

# Find and place mermaid.js exactly where the Build Kit expects it
MERMAID_SOURCE=$(find "$ROOT_NM" -name "mermaid.js" | grep "@google-labs/breadboard" | head -n 1)
if [ -n "$MERMAID_SOURCE" ]; then
    echo "Found mermaid.js at $MERMAID_SOURCE, linking to dist/src/mermaid.js"
    cp "$MERMAID_SOURCE" "$ROOT_NM/@google-labs/breadboard/dist/src/mermaid.js"
fi

echo "[4/4] Activating Bridge Server on Port 3000..."
cd "$PROJECT_ROOT"
# Kill any zombies
pkill -9 -f "tsx src/bridge/server.ts" || true
# Start cleanly
nohup /usr/local/bin/node --import "$EDITOR_NM/tsx/dist/loader.mjs" src/bridge/server.ts > bridge.log 2>&1 &
echo "[Success] Bridge Server backgrounded. Checking port 3000..."
sleep 3
lsof -i :3000
