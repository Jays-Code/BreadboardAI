#!/bin/bash
# Bridge Server Dependency Restoration Script
set -e

echo "[Fix] Synchronizing Breadboard dependencies..."
mkdir -p node_modules/@breadboard-ai node_modules/@google-labs

# Force copy from stable editor modules
cp -R tools/editor/node_modules/@breadboard-ai/. node_modules/@breadboard-ai/ 2>/dev/null || true
cp -R tools/editor/node_modules/@google-labs/. node_modules/@google-labs/ 2>/dev/null || true

# Repair the Build Kit scope
mkdir -p node_modules/@breadboard-ai/build/node_modules/@google-labs
ln -snf ../../../@google-labs/breadboard node_modules/@breadboard-ai/build/node_modules/@google-labs/breadboard

# Repair the main package entry point
ln -snf dist/src/index.js node_modules/@google-labs/breadboard/index.js

# Locate and fix mermaid.js if it exists in a sub-path
FIND_MERMAID=$(find node_modules/@google-labs/breadboard -name "mermaid.js" | head -n 1)
if [ -n "$FIND_MERMAID" ]; then
    echo "[Fix] Relocating mermaid.js from $FIND_MERMAID"
    mkdir -p node_modules/@google-labs/breadboard/dist/src
    cp "$FIND_MERMAID" node_modules/@google-labs/breadboard/dist/src/mermaid.js
fi

echo "[Fix] Starting Bridge Server..."
npm run bridge
