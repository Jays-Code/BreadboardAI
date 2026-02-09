#!/bin/bash

# Ensure we are in the project root
cd /workspaces/BreadboardAI

echo "[Startup] Starting services sequentially to prevent resource spikes..."

# 1. Start the Ghost Bridge (Ollama & Qdrant)
# if ! lsof -i :11434 > /dev/null 2>&1; then
#     echo "[Startup] Starting Ghost Bridge proxy..."
#     nohup /usr/local/bin/node /workspaces/BreadboardAI/ollama-proxy.cjs > /workspaces/BreadboardAI/proxy.log 2>&1 &
#     sleep 2
# fi

# 2. Start the Frontend (Vite)
if ! lsof -i :5173 > /dev/null 2>&1; then
    echo "[Startup] Starting Vite dev server..."
    nohup /workspaces/BreadboardAI/tools/editor/node_modules/.bin/vite --config /workspaces/BreadboardAI/vite.config.ts > /workspaces/BreadboardAI/vite.log 2>&1 &
    sleep 5
fi

# 3. Start the Bridge Server
if ! lsof -i :3000 > /dev/null 2>&1; then
    echo "[Startup] Fixing Breadboard build resolution..."
    # Ensure Build Kit can find Breadboard
    mkdir -p /workspaces/BreadboardAI/node_modules/@breadboard-ai/build/node_modules/@google-labs
    ln -snf /workspaces/BreadboardAI/node_modules/@google-labs/breadboard /workspaces/BreadboardAI/node_modules/@breadboard-ai/build/node_modules/@google-labs/breadboard || true
    # Fix entry point for packages that ignore exports
    ln -snf /workspaces/BreadboardAI/node_modules/@google-labs/breadboard/dist/src/index.js /workspaces/BreadboardAI/node_modules/@google-labs/breadboard/index.js || true
    # Fix missing mermaid.js
    mkdir -p /workspaces/BreadboardAI/node_modules/@google-labs/breadboard/dist/src
    cp /workspaces/BreadboardAI/node_modules/mermaid/dist/mermaid.js /workspaces/BreadboardAI/node_modules/@google-labs/breadboard/dist/src/mermaid.js 2>/dev/null || true
    
    echo "[Startup] Starting Bridge Server (Port 3000)..."
    nohup /usr/local/bin/node --import /workspaces/BreadboardAI/node_modules/tsx/dist/loader.mjs /workspaces/BreadboardAI/src/bridge/server.ts > /workspaces/BreadboardAI/bridge.log 2>&1 &
    sleep 5
fi




# 4. Start the Editor UI
if ! lsof -i :5174 > /dev/null 2>&1; then
    echo "[Startup] Starting Editor UI (Port 5174)..."
    nohup /workspaces/BreadboardAI/tools/editor/node_modules/.bin/vite --config /workspaces/BreadboardAI/tools/editor/vite.config.ts > /workspaces/BreadboardAI/editor.log 2>&1 &
fi

echo "[Startup] All background services initialized."
exit 0
