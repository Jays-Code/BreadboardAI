# Breadboard AI: Autonomous Content Director

This repository contains a stabilized and reorganized local development environment for Breadboard AI, featuring a multi-agent pipeline for autonomous content production.

## 📂 Project Structure

| Directory | Description |
| :--- | :--- |
| **`src/boards/`** | Breadboard graph definitions (TypeScript BGL). |
| **`src/bridge/`** | The Express-based Mind Link server for agent communication. |
| **`src/scripts/`** | Helper scripts for CLI execution and serialization. |
| **`tools/editor/`** | Local "Professional" Visual Editor (Vite + Lit). |
| **`logs/`** | Execution and build output logs. |
| **`output/`** | Generated JSON payloads and board results. |

## 🚀 Services & Ports

Manage your development environment using the following ports:

| Port | Service | Start Command |
| :--- | :--- | :--- |
| **3000** | **Mind Link Bridge** | `npm run bridge` |
| **5173** | **Standard Debugger** | `npm run dev` |
| **5174** | **Professional Editor** | `npm run editor` |

## 🧠 The "Mind Link" Workflow

The agents in your boards use the **Antigravity Bridge** to perform autonomous tasks:

1. **Request**: A Breadboard node sends a JSON task to `localhost:3000/generate`.
2. **Brain Sync**: The bridge writes the task to `.agent/brain/requests.json`.
3. **Agent Loop**: The AI (Antigravity) picks up the task and writes a response to `responses.json`.
4. **Resolution**: The bridge picks up the response and returns it to the Graph.

## 🛠️ Developer Scripts

- **Run Graph**: `npm run run-graph` (Executes `prompt-to-post.ts` via CLI).
- **Serialize Board**: `npx tsx src/scripts/serialize_graph.mts` (Generates BGL JSON).
- **Hard Reset**: Use `fuser -k <port>/tcp` if services become unresponsive.

---
> [!NOTE]
> All services are configured with custom proxies (`breadboard-proxy.ts`) on Port 5174 to prevent schema serialization crashes and handle legacy node signatures.
