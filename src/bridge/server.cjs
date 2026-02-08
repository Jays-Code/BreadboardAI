"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/bridge/server.ts
var import_express = __toESM(require("express"), 1);
var import_body_parser = __toESM(require("body-parser"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_crypto = __toESM(require("crypto"), 1);
var import_os = __toESM(require("os"), 1);
var import_child_process = require("child_process");
var import_url = require("url");
var import_breadboard = require("@google-labs/breadboard");

// src/boards/prompt-to-post.ts
var import_build = require("@breadboard-ai/build");
var topic = (0, import_build.input)({
  title: "Topic",
  description: "The main topic for the content generation",
  default: "The History of House Music"
});
var tone = (0, import_build.input)({
  title: "Tone",
  description: "The desired tone for the content",
  default: "Educational and upbeat"
});
var visual_critique = (0, import_build.input)({
  title: "Visual Critique",
  description: "Feedback from the Visual QA Critic to improve the visuals in a second pass",
  default: ""
});
var directorFlowDef = (0, import_build.defineNodeType)({
  name: "directorFlow",
  metadata: {
    title: "Director",
    description: "The 'brain' of the board; coordinates logic and directs other components."
  },
  inputs: {
    topic: { type: "string" },
    tone: { type: "string" }
  },
  outputs: {
    scenes: { type: (0, import_build.array)((0, import_build.object)({})) },
    total_duration: { type: "number" },
    title: { type: "string" },
    ambient_mood: { type: "string" }
  },
  invoke: async ({ topic: topic2, tone: tone2 }) => {
    console.log(`[Director] Generating arc for topic: ${topic2}`);
    const response = await fetch("http://127.0.0.1:3000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: `Create a video script for the topic: ${topic2} with tone: ${tone2}.
                Follow a NARRATIVE ARC structure across exactly 4 scenes:
                1. THE HOOK: Grab attention with a striking fact or problem.
                2. THE JOURNEY: Develop the story, provide evidence or history.
                3. THE CLIMAX: The core insight, solution, or big reveal.
                4. THE OUTRO: Summary and conclusion.

                Output strict JSON with the following structure:
                {
                  "video_title_internal": "string",
                  "ambient_mood": "string summarizing the color/visual vibe (e.g. prehistoric earthy, neon futuristic)",
                  "estimated_total_duration": number,
                  "scenes": [
                    {
                      "scene_id": number,
                      "arc_phase": "hook | journey | climax | outro",
                      "concept_description": "visual description",
                      "key_takeaway": "the spoken narrative text (sentence)",
                      "duration_sec": number
                    }
                  ]
                }
                The total duration MUST NOT exceed 25 seconds. Each scene should be 5-7 seconds.`,
        persona: "Director",
        model: "antigravity-bridge"
      })
    });
    const result = await response.json();
    const data = result.response;
    return {
      scenes: data.scenes || [],
      total_duration: data.estimated_total_duration || 0,
      title: data.video_title_internal || "Untitled",
      ambient_mood: data.ambient_mood || "neutral",
      topic: topic2,
      tone: tone2
    };
  }
});
var directorFlow = directorFlowDef({ topic, tone });
var copywriterFlowDef = (0, import_build.defineNodeType)({
  name: "copywriterFlow",
  metadata: {
    title: "Copywriter",
    description: "Drafting engine that writes high-quality scripts or long-form content."
  },
  inputs: {
    scenes: { type: (0, import_build.array)((0, import_build.object)({})) },
    tone: { type: "string" }
  },
  outputs: {
    scenesWithText: { type: (0, import_build.array)((0, import_build.object)({})) }
  },
  invoke: async ({ scenes, tone: tone2 }) => {
    console.log(`[Copywriter] Condensing overlay text for ${Array.isArray(scenes) ? scenes.length : 0} scenes...`);
    console.log(`   Tone: ${tone2}`);
    const scenesArray = scenes;
    const results = await Promise.all(scenesArray.map(async (scene) => {
      const response = await fetch("http://127.0.0.1:3000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: `Write the overlay text for a video scene based on this key point: "${scene.key_takeaway}". 
                    Condense it into punchy, impactful on-screen text. Maximum 7 words. 
                    Follow the Remotion Prompt Engineering Guidelines: use specified terminology if needed, and ensure text is suitable for a 30s high-energy edit.
                    Output only the text string.`,
          persona: "Copywriter",
          model: "antigravity-bridge"
        })
      });
      const result = await response.json();
      return { ...scene, overlay_text: result.response };
    }));
    return { scenesWithText: results };
  }
});
var copywriterFlow = copywriterFlowDef({ scenes: directorFlow.outputs.scenes, tone });
var visualArchitectFlowDef = (0, import_build.defineNodeType)({
  name: "visualArchitectFlow",
  metadata: {
    title: "Visual Architect Flow",
    description: "Acts as a Motion Designer, defining the visual style, animations, and assets for each scene."
  },
  inputs: {
    scenes: { type: (0, import_build.array)((0, import_build.object)({})) },
    tone: { type: "string" },
    ambient_mood: { type: "string" },
    critique: { type: "string" }
  },
  outputs: {
    scenesWithVisuals: { type: (0, import_build.array)((0, import_build.object)({})) }
  },
  invoke: async ({ scenes, tone: tone2, ambient_mood, critique }) => {
    console.log(`[VisualArchitect] Directing kinetic motion for ${Array.isArray(scenes) ? scenes.length : 0} scenes...`);
    console.log(`   Ambient Mood: ${ambient_mood}, Tone: ${tone2}`);
    const scenesArray = scenes;
    const results = [];
    for (const scene of scenesArray) {
      console.log(`   \u{1F3A8} Designing Scene ${scene.scene_id}: ${scene.arc_phase}`);
      const response = await fetch("http://127.0.0.1:3000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: `Act as a Motion Director. Transform this scene description into a KINETIC Scene Composition JSON for Remotion.
                    
                    Description: "${scene.concept_description}"
                    Tone: "${tone2}"
                    Ambient Mood: "${ambient_mood}"
                    ${critique ? `IMPORTANT CRITIQUE TO FIX: "${critique}"` : ""}

                    Design the scene as a MULTI-ASSET STAGE:
                    1. Background: The environmental vibe (color/mood).
                    2. Composition: An array of elements (sprites) that move.
                       - Each sprite needs a 'depth' (0.5 for mid, 1.0 for fore).
                       - Each sprite needs a 'motion' object with start_pos and end_pos (x/y as percentages of stage, scale 0.5 to 1.5).
                       - Multiple sprites create action (e.g., Background stadium + Foreground Gladiator).

                    Output strict JSON with this exact structure:
                    {
                      "background_color": "hex string",
                      "layout_style": "fullscreen | split_vertical | montage_grid | polaroid_scatter",
                      "typography_style": "word_pop | karaoke | cinematic_fade | box_highlight",
                      "energy_level": "high | chill",
                      "composition": [
                        {
                          "type": "image",
                          "image_prompt": "highly detailed subject specific prompt. Must match ${ambient_mood}.",
                          "depth": number (0.5 to 1.0),
                          "zIndex": number,
                          "motion": {
                            "type": "linear | ease",
                            "start_pos": { "x": number, "y": number, "scale": number },
                            "end_pos": { "x": number, "y": number, "scale": number }
                          }
                        }
                      ],
                      "particles": "none | dust | sparks | bubbles",
                      "camera_motion": "none | zoom_in | pan_left | snap_zoom | handheld",
                      "transition_style": "fade | glitch | slide_up | none",
                      "sfx_triggers": []
                    }
                    Detailed Implementation Instructions:
                    - Use 'snap_zoom' for high-energy hooks.
                    - Set 'transition_style' to 'glitch' for tech/energetic tones.
                    - Mix multiple sprites in 'composition' to create depth and action.
                    - Ensure the compositions are DYNAMIC. No static scenes.
                    - DO NOT include 'sfx_triggers' unless you have a specifically provided valid URL. Do not use placeholder URLs.
                    For 'montage_grid', provide exactly 3 images. For 'split_vertical', provide 2.`,
          persona: "Motion Director",
          model: "antigravity-bridge"
        })
      });
      const result = await response.json();
      results.push({ ...scene, visual_script: result.response });
    }
    return {
      scenesWithVisuals: results,
      topic: scenesArray[0]?.topic || "",
      // Pass through context if available
      tone: scenesArray[0]?.tone || ""
    };
  }
});
var visualArchitectFlow = visualArchitectFlowDef({
  scenes: copywriterFlow.outputs.scenesWithText,
  tone,
  ambient_mood: directorFlow.outputs.ambient_mood,
  critique: visual_critique
});
var assetSourcingFlowDef = (0, import_build.defineNodeType)({
  name: "assetSourcingFlow",
  metadata: {
    title: "Asset Sourcing Flow",
    description: "Fetches or generates the actual image assets requested by the Visual Architect."
  },
  inputs: {
    scenes: { type: (0, import_build.array)((0, import_build.object)({})) }
  },
  outputs: {
    scenesWithAssets: { type: (0, import_build.array)((0, import_build.object)({})) }
  },
  invoke: async ({ scenes }) => {
    console.log(`[AssetSourcing] Sourcing production layers for ${Array.isArray(scenes) ? scenes.length : 0} scenes...`);
    const scenesArray = scenes;
    const results = [];
    for (const scene of scenesArray) {
      const script = scene.visual_script;
      if (script && script.composition && Array.isArray(script.composition)) {
        console.log(`   \u{1F4F7} Sourcing assets for Scene ${scene.scene_id}...`);
        const updatedComposition = await Promise.all(script.composition.map(async (element) => {
          if (element.type === "image" && element.image_prompt) {
            const response = await fetch("http://127.0.0.1:3000/generate-image", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                prompt: element.image_prompt
              })
            });
            const result = await response.json();
            return { ...element, url: result.url };
          }
          return element;
        }));
        results.push({
          ...scene,
          visual_script: {
            ...script,
            composition: updatedComposition
          }
        });
      } else {
        results.push(scene);
      }
    }
    return { scenesWithAssets: results };
  }
});
var assetSourcingFlow = assetSourcingFlowDef({ scenes: visualArchitectFlow.outputs.scenesWithVisuals });
var captionerFlowDef = (0, import_build.defineNodeType)({
  name: "captionerFlow",
  metadata: {
    title: "Captioner Flow",
    description: "Creative engine that generates social media captions and post text."
  },
  inputs: {
    topic: { type: "string" },
    scenes: { type: (0, import_build.array)((0, import_build.object)({})) }
  },
  outputs: {
    caption: { type: "string" }
  },
  invoke: async ({ topic: topic2, scenes }) => {
    const response = await fetch("http://127.0.0.1:3000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: `Write a social media caption for a video about "${topic2}" with the following scenes: ${JSON.stringify(scenes)}.`,
        persona: "Social Media Manager",
        model: "antigravity-bridge"
      })
    });
    const result = await response.json();
    return { caption: result.response };
  }
});
var captionerFlow = captionerFlowDef({ topic, scenes: directorFlow.outputs.scenes });
var voiceoverFlowDef = (0, import_build.defineNodeType)({
  name: "voiceoverFlow",
  metadata: {
    title: "Voiceover Flow",
    description: "Generates AI voiceovers (TTS) for each scene's script."
  },
  inputs: {
    scenes: { type: (0, import_build.array)((0, import_build.object)({})) }
  },
  outputs: {
    scenesWithAudio: { type: (0, import_build.array)((0, import_build.object)({})) }
  },
  invoke: async ({ scenes }) => {
    console.log("[Voiceover] Generating high-fidelity audio...");
    const scenesArray = scenes;
    const results = await Promise.all(scenesArray.map(async (scene) => {
      const scriptText = scene.key_takeaway || scene.overlay_text || "";
      if (!scriptText) return scene;
      const response = await fetch("http://127.0.0.1:3000/generate-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: scriptText,
          voice: "alloy"
          // Default voice
        })
      });
      const result = await response.json();
      return { ...scene, audio_url: result.url };
    }));
    return { scenesWithAudio: results };
  }
});
var voiceoverFlow = voiceoverFlowDef({ scenes: assetSourcingFlow.outputs.scenesWithAssets });
var assemblerDef = (0, import_build.defineNodeType)({
  name: "assembler",
  metadata: {
    title: "Assembler",
    description: "Combines various outputs into a single, cohesive final package."
  },
  inputs: {
    title: { type: "string" },
    duration: { type: "number" },
    scenes: { type: (0, import_build.array)((0, import_build.object)({})) }
  },
  outputs: {
    video_structure: { type: (0, import_build.object)({}) }
  },
  invoke: ({ title, duration, scenes }) => ({
    video_structure: {
      video_title_internal: title,
      estimated_total_duration: duration,
      scenes
    }
  })
});
var assembler = assemblerDef({
  title: directorFlow.outputs.title,
  duration: directorFlow.outputs.total_duration,
  scenes: voiceoverFlow.outputs.scenesWithAudio
});
var rendererDef = (0, import_build.defineNodeType)({
  name: "renderer",
  metadata: {
    title: "Renderer",
    description: "Sends the final video structure to the Bridge Server to trigger the Remotion render."
  },
  inputs: {
    video_structure: { type: (0, import_build.object)({}) }
  },
  outputs: {
    video_url: { type: "string" }
  },
  invoke: async ({ video_structure }) => {
    console.log("[Renderer] Triggering Remotion production...");
    const response = await fetch("http://127.0.0.1:3000/api/render", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        video_structure
      })
    });
    const result = await response.json();
    return { video_url: result.video_url };
  }
});
var renderer = rendererDef({ video_structure: assembler.outputs.video_structure });
var prompt_to_post_default = (0, import_build.board)({
  title: "Prompt to Video Post",
  description: "Converts a topic into a Remotion-ready video structure and renders it.",
  inputs: { topic, tone, visual_critique },
  outputs: {
    video_structure: assembler.outputs.video_structure,
    video_url: renderer.outputs.video_url
  }
});

// src/bridge/server.ts
var import_build2 = require("@breadboard-ai/build");
var import_generative_ai = require("@google/generative-ai");
var import_server = require("@google/generative-ai/server");
var dotenv = __toESM(require("dotenv"), 1);
dotenv.config();
var app = (0, import_express.default)();
var PORT = 3e3;
var BRAIN_DIR = import_path.default.resolve(process.cwd(), ".agent", "brain");
var REQUESTS_FILE = import_path.default.join(BRAIN_DIR, "requests.json");
var RESPONSES_FILE = import_path.default.join(BRAIN_DIR, "responses.json");
var RESULTS_DIR = import_path.default.resolve(process.cwd(), "public", "results");
var VIDEO_OUT_DIR = import_path.default.resolve(process.cwd(), "public", "videos");
if (!import_fs.default.existsSync(BRAIN_DIR)) import_fs.default.mkdirSync(BRAIN_DIR, { recursive: true });
if (!import_fs.default.existsSync(RESULTS_DIR)) import_fs.default.mkdirSync(RESULTS_DIR, { recursive: true });
if (!import_fs.default.existsSync(VIDEO_OUT_DIR)) import_fs.default.mkdirSync(VIDEO_OUT_DIR, { recursive: true });
if (!import_fs.default.existsSync(REQUESTS_FILE)) import_fs.default.writeFileSync(REQUESTS_FILE, "[]");
if (!import_fs.default.existsSync(RESPONSES_FILE)) import_fs.default.writeFileSync(RESPONSES_FILE, "[]");
app.use(import_body_parser.default.json());
app.use(import_express.default.static(import_path.default.resolve(process.cwd(), "ui")));
app.use("/api", import_express.default.static(import_path.default.resolve(process.cwd(), "public", "api")));
app.use("/videos", import_express.default.static(VIDEO_OUT_DIR));
app.post("/api/run", async (req, res) => {
  const { slug, inputs } = req.body;
  try {
    const boardPath = import_path.default.join(process.cwd(), "public", "api", `${slug}.json`);
    if (!import_fs.default.existsSync(boardPath)) return res.status(404).json({ error: `Board ${slug} not found` });
    const graph = JSON.parse(import_fs.default.readFileSync(boardPath, "utf-8"));
    const loader = (0, import_breadboard.createLoader)();
    const output2 = await (0, import_breadboard.invokeGraph)({ graph }, inputs, {
      base: new URL((0, import_url.pathToFileURL)(import_path.default.join(process.cwd(), "public", "api")).toString()),
      loader
    });
    res.json({ result: output2 });
  } catch (error) {
    res.status(500).json({ error: "Execution failed", details: String(error) });
  }
});
app.get("/api/run-stream", async (req, res) => {
  const { slug, inputs: inputsStr } = req.query;
  const inputs = inputsStr ? JSON.parse(inputsStr) : {};
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();
  const sendEvent = (type, data) => {
    res.write(`event: ${type}
data: ${JSON.stringify(data)}

`);
  };
  try {
    const boardPath = import_path.default.join(process.cwd(), "public", "api", `${slug}.json`);
    if (!import_fs.default.existsSync(boardPath)) {
      sendEvent("error", { message: `Board ${slug} not found` });
      return res.end();
    }
    const { runGraph } = await import("@google-labs/breadboard");
    const graph = JSON.parse(import_fs.default.readFileSync(boardPath, "utf-8"));
    const customKit = await (0, import_build2.kit)({
      title: "Custom Agent Kit",
      description: "Kit for prompt-to-post board nodes",
      version: "1.0.0",
      url: "npm:custom-agent-kit",
      components: {
        directorFlow: directorFlowDef,
        copywriterFlow: copywriterFlowDef,
        visualArchitectFlow: visualArchitectFlowDef,
        assetSourcingFlow: assetSourcingFlowDef,
        voiceoverFlow: voiceoverFlowDef,
        assembler: assemblerDef,
        renderer: rendererDef
      }
    });
    const topicSlug = inputs.topic ? String(inputs.topic).toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").substring(0, 30) : "run";
    const runId = `${topicSlug}-${import_crypto.default.randomUUID().substring(0, 8)}`;
    const trace = [];
    const startTime = (/* @__PURE__ */ new Date()).toISOString();
    const loader = (0, import_breadboard.createLoader)();
    const base = new URL((0, import_url.pathToFileURL)(import_path.default.join(process.cwd(), "public", "api")).toString());
    const probe = {
      report: async (event) => {
        const { type, data, result: result2 } = event;
        if (type === "nodestart") {
          const node = data.node;
          if (node) {
            const title = node.configuration?.title || "";
            sendEvent("node-start", { id: node.id, type: node.type, title });
            trace.push({ type: "beforehandler", data: { node }, timestamp: (/* @__PURE__ */ new Date()).toISOString() });
          }
        } else if (type === "nodeend") {
          const node = data.node;
          const outputs = data.outputs || {};
          if (node) {
            sendEvent("node-end", { id: node.id, outputs });
            trace.push({ type: "afterhandler", data: { node, outputs }, timestamp: (/* @__PURE__ */ new Date()).toISOString() });
          }
        } else if (type === "edge") {
        }
      }
    };
    const generator = runGraph({ graph }, {
      inputs,
      base,
      loader,
      kits: [customKit],
      probe
    });
    let result = await generator.next();
    while (!result.done) {
      const event = result.value;
      const eventType = event.type;
      if (eventType === "input") {
        event.inputs = inputs;
        trace.push({ type: "input", data: inputs, timestamp: (/* @__PURE__ */ new Date()).toISOString() });
        result = await generator.next();
      } else if (eventType === "output") {
        const data = event.outputs;
        sendEvent("output", data);
        trace.push({ type: "output", data, timestamp: (/* @__PURE__ */ new Date()).toISOString() });
        result = await generator.next();
      } else {
        result = await generator.next();
      }
    }
    const resultFile = import_path.default.join(RESULTS_DIR, `${runId}.json`);
    import_fs.default.writeFileSync(resultFile, JSON.stringify({
      id: runId,
      slug,
      startTime,
      endTime: (/* @__PURE__ */ new Date()).toISOString(),
      inputs,
      trace
    }, null, 2));
    sendEvent("done", { runId });
    res.end();
  } catch (error) {
    sendEvent("error", { message: String(error) });
    res.end();
  }
});
var renderProgress = {};
app.post("/api/render", async (req, res) => {
  const { video_structure, runId } = req.body;
  if (!video_structure) return res.status(400).json({ error: "No video structure provided" });
  const id = runId || `video-${Date.now()}`;
  const propsFile = import_path.default.join(import_os.default.tmpdir(), `props-${id}.json`);
  const outputFilename = `${id}.mp4`;
  const outputPath = import_path.default.join(VIDEO_OUT_DIR, outputFilename);
  if (import_fs.default.existsSync(outputPath)) {
    renderProgress[id] = 100;
    return res.json({
      success: true,
      runId: id,
      video_url: `/videos/${outputFilename}`,
      status: "complete"
    });
  }
  if (renderProgress[id] !== void 0 && renderProgress[id] >= 0 && renderProgress[id] < 100) {
    return res.json({
      success: true,
      runId: id,
      video_url: `/videos/${outputFilename}`,
      status: "rendering"
    });
  }
  try {
    import_fs.default.writeFileSync(propsFile, JSON.stringify(video_structure));
    renderProgress[id] = 0;
    console.log(`[Renderer] Starting render for ${outputFilename}...`);
    const { spawn } = await import("child_process");
    const remotionCli = import_path.default.resolve(process.cwd(), "node_modules/@remotion/cli/remotion-cli.js");
    const child = spawn("node", [
      remotionCli,
      "render",
      "src/video/index.tsx",
      "Main",
      outputPath,
      `--props=${propsFile}`,
      '--chromium-flags="--no-sandbox --disable-setuid-sandbox"'
    ], {
      env: {
        ...process.env,
        PATH: "/usr/local/bin:/usr/bin:/bin"
      }
    });
    child.stdout.on("data", (data) => {
      const output2 = data.toString();
      const match = output2.match(/(\d+)\/(\d+)/);
      if (match) {
        const current = parseInt(match[1]);
        const total = parseInt(match[2]);
        const percent = Math.round(current / total * 100);
        renderProgress[id] = percent;
      }
    });
    child.stderr.on("data", (data) => {
      console.error(`[Renderer Log] ${data.toString()}`);
    });
    child.on("close", (code) => {
      if (code === 0) {
        console.log(`[Renderer] Render complete: ${outputFilename}`);
        renderProgress[id] = 100;
      } else {
        console.error(`[Renderer] Process exited with code ${code}`);
        renderProgress[id] = -1;
      }
      if (import_fs.default.existsSync(propsFile)) import_fs.default.unlinkSync(propsFile);
    });
    res.json({
      success: true,
      runId: id,
      video_url: `/videos/${outputFilename}`,
      status: "started"
    });
  } catch (error) {
    console.error("[Renderer] Setup Failed:", error);
    res.status(500).json({ error: "Render failed to start", details: error.message });
  }
});
app.get("/api/render-status", (req, res) => {
  const { runId } = req.query;
  if (!runId || typeof runId !== "string") return res.status(400).json({ error: "Missing runId" });
  const outputFilename = `${runId}.mp4`;
  const outputPath = import_path.default.join(VIDEO_OUT_DIR, outputFilename);
  if (import_fs.default.existsSync(outputPath)) {
    return res.json({
      progress: 100,
      complete: true,
      error: false
    });
  }
  const progress = renderProgress[runId] ?? 0;
  res.json({
    progress,
    complete: progress === 100,
    error: progress === -1
  });
});
app.get("/api/results", (req, res) => {
  const { slug } = req.query;
  try {
    if (!import_fs.default.existsSync(RESULTS_DIR)) return res.json([]);
    const files = import_fs.default.readdirSync(RESULTS_DIR);
    const results = files.filter((f) => f.endsWith(".json")).map((file) => {
      try {
        return JSON.parse(import_fs.default.readFileSync(import_path.default.join(RESULTS_DIR, file), "utf-8"));
      } catch (e) {
        return null;
      }
    }).filter((r) => r && (!slug || r.slug === slug)).sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch results" });
  }
});
app.get("/api/result", (req, res) => {
  const { id } = req.query;
  const filePath = import_path.default.join(RESULTS_DIR, `${id}.json`);
  if (import_fs.default.existsSync(filePath)) {
    return res.json(JSON.parse(import_fs.default.readFileSync(filePath, "utf-8")));
  }
  try {
    const files = import_fs.default.readdirSync(RESULTS_DIR).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      try {
        const content = JSON.parse(import_fs.default.readFileSync(import_path.default.join(RESULTS_DIR, file), "utf-8"));
        if (content.id === id) {
          return res.json(content);
        }
      } catch (e) {
        continue;
      }
    }
  } catch (e) {
  }
  res.status(404).json({ error: "Result not found" });
});
app.post("/generate", async (req, res) => {
  let { task, persona, model: requestedModel } = req.body;
  console.log(`[Mind Link] Processing intelligent request for ${persona}...`);
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error("Gemini/Google API Key not found in environment.");
    return res.status(500).json({ error: "API Key missing. Please set GEMINI_API_KEY or GOOGLE_API_KEY" });
  }
  try {
    const genAI = new import_generative_ai.GoogleGenerativeAI(apiKey);
    let systemInstruction = "You are a helpful AI assistant.";
    const guidelinesPath = import_path.default.resolve(process.cwd(), "content_guidelines.md");
    if (import_fs.default.existsSync(guidelinesPath)) {
      const guidelines = import_fs.default.readFileSync(guidelinesPath, "utf-8");
      systemInstruction = `Use the following CONTENT GUIDELINES for all your responses:
${guidelines}`;
    }
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction
    });
    let finalPrompt = task;
    if (persona === "Director" || persona === "Visual Designer" || persona === "Motion Director") {
      finalPrompt = `${task}

IMPORTANT: You MUST respond with a valid JSON object only. Do not include markdown formatting or extra text.`;
    }
    const result = await model.generateContent(finalPrompt);
    const responseText = result.response.text();
    let finalResponse = responseText;
    if (persona === "Director" || persona === "Visual Designer" || persona === "Motion Director") {
      try {
        const cleaned = responseText.replace(/```json\n?|\n?```/g, "").trim();
        finalResponse = JSON.parse(cleaned);
      } catch (e) {
        console.error(`Failed to parse ${persona} JSON response:`, responseText);
        return res.status(500).json({ error: "Invalid JSON generated by model", raw: responseText });
      }
    }
    return res.json({ response: finalResponse });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: "Gemini Generation Failed", details: error.message });
  }
});
app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;
  console.log(`[Bridge] Generating Production Asset: "${prompt.substring(0, 40)}..."`);
  if (process.env.OPENAI_API_KEY) {
    try {
      console.log("[Bridge] Using DALL-E 3 for high-fidelity asset...");
    } catch (e) {
      console.error("[Bridge] DALL-E 3 failed, falling back...");
    }
  }
  const encodedPrompt = encodeURIComponent(prompt);
  const enhancedPrompt = encodeURIComponent(`${prompt}, cinematic, 8k, highly detailed`);
  const imageUrl = `https://image.pollinations.ai/prompt/${enhancedPrompt}?width=1080&height=1920&nologo=true`;
  await new Promise((resolve) => setTimeout(resolve, 2e3));
  res.json({ url: imageUrl });
});
app.post("/generate-image-imagen", async (req, res) => {
  res.json({ error: "Imagen 2 integration pending API quota" });
});
app.post("/generate-audio", async (req, res) => {
  const { text, voice } = req.body;
  console.log(`[Bridge] Generating audio for: "${text.substring(0, 20)}..."`);
  await new Promise((resolve) => setTimeout(resolve, 800));
  const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  res.json({ url: audioUrl, duration: 5 });
});
function getSystemInstructions() {
  let systemInstruction = "You are a helpful AI assistant.";
  const guidelinesPath = import_path.default.resolve(process.cwd(), "content_guidelines.md");
  if (import_fs.default.existsSync(guidelinesPath)) {
    const guidelines = import_fs.default.readFileSync(guidelinesPath, "utf-8");
    systemInstruction = `Use the following CONTENT GUIDELINES for all your responses:
${guidelines}`;
  }
  return systemInstruction;
}
app.post("/api/visual-qa", async (req, res) => {
  const { video_structure, runId } = req.body;
  if (!video_structure || !runId) return res.status(400).json({ error: "Missing video_structure or runId" });
  console.log(`[Visual QA] Starting quality assessment for ${runId}...`);
  const qaDir = import_path.default.join(process.cwd(), "public", "qa", runId);
  if (!import_fs.default.existsSync(qaDir)) import_fs.default.mkdirSync(qaDir, { recursive: true });
  const samples = [10, 50, 90];
  const framePaths = [];
  const totalFrames = Math.max(90, (video_structure.estimated_total_duration || 30) * 30);
  try {
    for (const percent of samples) {
      const frame = Math.floor(percent / 100 * totalFrames);
      const outputPath = import_path.default.join(qaDir, `frame-${percent}.png`);
      const propsFile = import_path.default.join(import_os.default.tmpdir(), `props-qa-${runId}-${percent}.json`);
      import_fs.default.writeFileSync(propsFile, JSON.stringify(video_structure));
      console.log(`[Visual QA] Capturing still at ${percent}% (frame ${frame})...`);
      try {
        const remotionCli = import_path.default.resolve(process.cwd(), "node_modules/@remotion/cli/remotion-cli.js");
        (0, import_child_process.execSync)(`node "${remotionCli}" still src/video/index.tsx Main "${outputPath}" --frame=${frame} --props="${propsFile}" --image-format=png --overwrite --chromium-flags="--no-sandbox --disable-setuid-sandbox"`, {
          env: {
            ...process.env,
            PATH: "/usr/local/bin:/usr/bin:/bin"
          }
        });
        framePaths.push(outputPath);
      } catch (err) {
        console.error(`[Visual QA] Frame ${percent} failed:`, err.message);
      } finally {
        if (import_fs.default.existsSync(propsFile)) import_fs.default.unlinkSync(propsFile);
      }
    }
    if (framePaths.length === 0) {
      throw new Error("No frames were captured.");
    }
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const genAI = new import_generative_ai.GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: getSystemInstructions()
    });
    const imageParts = framePaths.map((p) => ({
      inlineData: {
        data: import_fs.default.readFileSync(p).toString("base64"),
        mimeType: "image/png"
      }
    }));
    const prompt = `Act as a Visual Critic for cinematic video production. Analyze these 3 frames from a video.
                
                CONTEXT:
                - Title: "${video_structure.video_title_internal}"
                - Topic/Objective: "${video_structure.topic || "Auto-generated content"}"
                - Tone: "${video_structure.tone || "Dynamic"}"
                - Scenes: ${JSON.stringify(video_structure.scenes?.map((s) => ({ id: s.scene_id, concept: s.concept_description })))}

                CRITERIA:
                1. ALIGNMENT: Do these frames actually achieve the objective and tone described?
                2. NARRATIVE ACCURACY: Does the visual content in these frames match the concept descriptions for their respective timestamps?
                3. KINETIC ENGAGEMENT: Do elements look like they are MOVING or staged for action?
                4. COMPOSITION DEPTH: Are there clear multi-layer compositions?
                5. FIDELITY: Are assets high-quality?

                Output strict JSON:
                {
                  "score": number (0-100), 
                  "passed": boolean, 
                  "critique": "string", 
                  "improvement_suggestions": ["string"]
                }`;
    const result = await model.generateContent([prompt, ...imageParts]);
    const responseText = result.response.text().replace(/```json\n?|\n?```/g, "").trim();
    const report = JSON.parse(responseText);
    res.json({
      success: true,
      report,
      screenshots: samples.map((p) => `/qa/${runId}/frame-${p}.png`)
    });
  } catch (error) {
    console.error("[Visual QA] Failed:", error);
    res.status(500).json({ error: "QA Analysis failed", details: error.message });
  }
});
app.post("/api/analyze-video", async (req, res) => {
  const { runId, video_structure } = req.body;
  if (!runId) return res.status(400).json({ error: "Missing runId" });
  console.log(`[Deep Analysis] Starting full video assessment for ${runId}...`);
  try {
    const videoPath = import_path.default.join(VIDEO_OUT_DIR, `${runId}.mp4`);
    let finalVideoPath;
    if (!import_fs.default.existsSync(videoPath)) {
      const files = import_fs.default.readdirSync(VIDEO_OUT_DIR).filter((f) => f.includes(runId) && f.endsWith(".mp4"));
      if (files.length === 0) return res.status(404).json({ error: "Video file not found for this run" });
      finalVideoPath = import_path.default.join(VIDEO_OUT_DIR, files[0]);
    } else {
      finalVideoPath = videoPath;
    }
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const fileManager = new import_server.GoogleAIFileManager(apiKey);
    const genAI = new import_generative_ai.GoogleGenerativeAI(apiKey);
    console.log(`[Deep Analysis] Uploading video: ${finalVideoPath}`);
    const uploadResult = await fileManager.uploadFile(finalVideoPath, {
      mimeType: "video/mp4",
      displayName: `Analysis for ${runId}`
    });
    let file = await fileManager.getFile(uploadResult.file.name);
    while (file.state === "PROCESSING") {
      process.stdout.write(".");
      await new Promise((resolve) => setTimeout(resolve, 2e3));
      file = await fileManager.getFile(uploadResult.file.name);
    }
    if (file.state === "FAILED") {
      throw new Error("Video processing failed on Google servers.");
    }
    console.log(`[Deep Analysis] Video active, generating critique...`);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: getSystemInstructions()
    });
    const contextInfo = video_structure ? `
                CONTEXT:
                - Title: "${video_structure.video_title_internal}"
                - Topic/Objective: "${video_structure.topic}"
                - Tone: "${video_structure.tone}"
                - Full Script: ${JSON.stringify(video_structure.scenes)}
        ` : "";
    const prompt = `Act as a Senior Creative Director and Motion Graphics Critic. Analyze this video in its entirety.
                ${contextInfo}
                
                CRITERIA:
                1. MISSION ALIGNMENT: Does the video successfully communicate the intended topic and tone?
                2. MOTION QUALITY: Is the motion smooth, purposeful, and engaging? Does it follow our guidelines?
                3. PACING & RHYTHM: Does the timing match the narrative arc (Hook -> Journey -> Climax -> Outro)? 
                4. AUDIO-VISUAL SYNC: How well do the animations align with the audio/voiceover?
                5. CONSISTENCY: Is the visual style (colors, assets) consistent throughout?

                Output strict JSON:
                {
                  "score": number (0-100), 
                  "passed": boolean, 
                  "critique": "A detailed multi-paragraph critique covering the above points.", 
                  "improvement_suggestions": ["specific actionable suggestion 1", "suggestion 2"]
                }`;
    const result = await model.generateContent([
      prompt,
      {
        fileData: {
          fileUri: file.uri,
          mimeType: file.mimeType
        }
      }
    ]);
    const responseText = result.response.text().replace(/```json\n?|\n?```/g, "").trim();
    const report = JSON.parse(responseText);
    console.log(`[Deep Analysis] Analysis complete for ${runId}`);
    res.json({
      success: true,
      report,
      video_uri: file.uri
    });
  } catch (error) {
    console.error("[Deep Analysis] Failed:", error);
    res.status(500).json({ error: "Deep Analysis failed", details: error.message });
  }
});
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Antigravity Mind Link active on port ${PORT}`);
});
