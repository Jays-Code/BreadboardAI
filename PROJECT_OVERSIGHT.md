# 🎬 Project: Autonomous Content Director

## 🎯 The Goal
The goal of this project is to build a "Zero-Touch" content production pipeline. It allows a user to provide a simple topic (e.g., *"The History of Coffee"*) and receive a fully structured JSON file that can be immediately rendered into a 9:16 video (TikTok/Reels) by a Remotion (React) setup.

Instead of a single, unreliable AI prompt, we use **Breadboard AI** to create an "assembly line" of specialist agents, each handling a specific part of the creative process.

---

## 🏗️ The Intended Structure

The project is organized into a 4-stage pipeline within a Breadboard graph.

### Stage 1: The Input Trigger
- **Purpose**: Captures the initial user intent.
- **Data**: `topic` and `tone`.

### Stage 2: The "Director" Node (The Structurer)
- **Persona**: An expert short-form video director.
- **Responsibility**: Breaks the topic down into 3-5 distinct scenes.
- **Output Schema**:
  - `scene_id`: Sequential order.
  - `concept_description`: Instructions for the visual elements.
  - `key_takeaway`: The core fact for the scene.
  - `duration_sec`: Precise timing for the Remotion timeline.

### Stage 3: The "Scene Copywriter" Node
- **Persona**: A video overlay copywriter.
- **Responsibility**: Takes each `key_takeaway` and transforms it into "punchy" on-screen text.
- **Constraint**: Maximum 7 words to ensure mobile readability.

### Stage 4: The "Social Captioner" Node
- **Persona**: Social Media Manager.
- **Responsibility**: Writes the final Instagram/TikTok caption, including hooks and hashtags, based on the full video outline.

---

## 🛠️ Infrastructure: The Antigravity Bridge
Because the agents in Breadboard need to "think" and communicate, we use a custom **Node.js Bridge** (`src/bridge/server.ts`).

1. **Prompt → Bridge**: Breadboard sends a request to the local server.
2. **Bridge → Disk**: The server writes the request to `.agent/brain/requests.json`.
3. **Agent → Response**: The AI agent (Antigravity) monitors the requests, processes them, and writes the answer to `responses.json`.
4. **Bridge → Breadboard**: The server polls the file and sends the data back to the Breadboard graph to continue the flow.

---

## 📦 The Final Output
The pipeline produces a single JSON file (e.g., `house_music_history.json`) formatted specifically for **Remotion**.

```json
{
  "video_title_internal": "The Roots of House",
  "estimated_total_duration": 60,
  "scenes": [
    {
      "scene_id": 1,
      "concept_description": "Vintage footage of Chicago skyline",
      "duration_sec": 10,
      "overlay_text": "Chicago 80s: Where it all began."
    }
    // ... more scenes
  ]
}
```
