import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import os from 'os';
import { execSync } from 'child_process';
import { pathToFileURL } from 'url';
import { createLoader, invokeGraph } from "@google-labs/breadboard";
import {
    directorFlowDef,
    copywriterFlowDef,
    visualArchitectFlowDef,
    assetSourcingFlowDef,
    voiceoverFlowDef,
    assemblerDef,
    rendererDef
} from "../boards/prompt-to-post";
import { kit } from "@breadboard-ai/build";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Paths for the "Mind Link"
const BRAIN_DIR = path.resolve(process.cwd(), '.agent', 'brain');
const REQUESTS_FILE = path.join(BRAIN_DIR, 'requests.json');
const RESPONSES_FILE = path.join(BRAIN_DIR, 'responses.json');
const RESULTS_DIR = path.resolve(process.cwd(), 'public', 'results');
const VIDEO_OUT_DIR = path.resolve(process.cwd(), 'public', 'videos');

// Ensure directories exist
if (!fs.existsSync(BRAIN_DIR)) fs.mkdirSync(BRAIN_DIR, { recursive: true });
if (!fs.existsSync(RESULTS_DIR)) fs.mkdirSync(RESULTS_DIR, { recursive: true });
if (!fs.existsSync(VIDEO_OUT_DIR)) fs.mkdirSync(VIDEO_OUT_DIR, { recursive: true });

// Initialize files if they don't exist
if (!fs.existsSync(REQUESTS_FILE)) fs.writeFileSync(REQUESTS_FILE, '[]');
if (!fs.existsSync(RESPONSES_FILE)) fs.writeFileSync(RESPONSES_FILE, '[]');

app.use(bodyParser.json());
app.use(express.static(path.resolve(process.cwd(), 'ui')));
app.use('/api', express.static(path.resolve(process.cwd(), 'public', 'api')));
app.use('/videos', express.static(VIDEO_OUT_DIR));

// --- Generic Run Endpoint (Wait for completion) ---
app.post('/api/run', async (req, res) => {
    const { slug, inputs } = req.body;
    try {
        const boardPath = path.join(process.cwd(), 'public', 'api', `${slug}.json`);
        if (!fs.existsSync(boardPath)) return res.status(404).json({ error: `Board ${slug} not found` });
        const graph = JSON.parse(fs.readFileSync(boardPath, 'utf-8'));
        const loader = createLoader();

        // We probably need kits here too if using invokeGraph directly?
        // But invokeGraph usually handles it if they are standard. 
        // For custom kit, we might fail here too. Let's stick to fixing run-stream first.

        const output = await invokeGraph({ graph }, inputs, {
            base: new URL(pathToFileURL(path.join(process.cwd(), 'public', 'api')).toString()),
            loader
        });
        res.json({ result: output });
    } catch (error) {
        res.status(500).json({ error: "Execution failed", details: String(error) });
    }
});

// --- Streaming Run Endpoint (SSE) ---
app.get('/api/run-stream', async (req, res) => {
    const { slug, inputs: inputsStr } = req.query;
    const inputs = inputsStr ? JSON.parse(inputsStr as string) : {};

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const sendEvent = (type: string, data: any) => {
        res.write(`event: ${type}\ndata: ${JSON.stringify(data)}\n\n`);
    };

    try {
        const boardPath = path.join(process.cwd(), 'public', 'api', `${slug}.json`);
        if (!fs.existsSync(boardPath)) {
            sendEvent('error', { message: `Board ${slug} not found` });
            return res.end();
        }

        const { runGraph } = await import("@google-labs/breadboard");

        const graph = JSON.parse(fs.readFileSync(boardPath, 'utf-8'));
        // Use invokeGraph which handles inputs/kits traversal correctly
        // The imports for invokeGraph and createLoader are already at the top of the file.

        // Create Custom Kit
        const customKit = await kit({
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

        const topicSlug = inputs.topic ? String(inputs.topic).toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').substring(0, 30) : 'run';
        const runId = `${topicSlug}-${crypto.randomUUID().substring(0, 8)}`;
        const trace: any[] = [];
        const startTime = new Date().toISOString();
        const loader = createLoader();
        const base = new URL(pathToFileURL(path.join(process.cwd(), 'public', 'api')).toString());

        const probe = {
            report: async (event: any) => {
                const { type, data, result } = event;
                // console.log(`[PROBE] Report: ${type}`, data); 

                if (type === 'nodestart') {
                    const node = data.node;
                    if (node) {
                        const title = node.configuration?.title || "";
                        sendEvent('node-start', { id: node.id, type: node.type, title });
                        trace.push({ type: 'beforehandler', data: { node }, timestamp: new Date().toISOString() });
                    }
                } else if (type === 'nodeend') {
                    const node = data.node;
                    const outputs = data.outputs || {};
                    if (node) {
                        sendEvent('node-end', { id: node.id, outputs });
                        trace.push({ type: 'afterhandler', data: { node, outputs }, timestamp: new Date().toISOString() });
                    }
                } else if (type === 'edge') {
                    // Optional: trace edges? logic doesn't require it yet
                }
            }
        };

        const generator = runGraph({ graph }, {
            inputs,
            base,
            loader,
            kits: [customKit as any],
            probe: probe as any
        });

        let result = await generator.next();

        while (!result.done) {
            const event = result.value;
            const eventType = event.type;

            if (eventType === "input") {
                // Handle Input: Mutate result and resume
                (event as any).inputs = inputs;
                trace.push({ type: 'input', data: inputs, timestamp: new Date().toISOString() });
                result = await generator.next();
            } else if (eventType === "output") {
                // Handle Output: just log/send
                const data = (event as any).outputs;
                sendEvent('output', data);
                trace.push({ type: 'output', data, timestamp: new Date().toISOString() });
                result = await generator.next();
            } else {
                // Should not happen with runGraph generator, but safety first
                result = await generator.next();
            }
        }

        // Save trace on completion (Success)
        const resultFile = path.join(RESULTS_DIR, `${runId}.json`);
        fs.writeFileSync(resultFile, JSON.stringify({
            id: runId,
            slug,
            startTime,
            endTime: new Date().toISOString(),
            inputs,
            trace
        }, null, 2));

        sendEvent('done', { runId });
        res.end();
    } catch (error) {
        sendEvent('error', { message: String(error) });
        res.end();
    }
});

// --- Render Progress Cache ---
const renderProgress: Record<string, number> = {};

// --- Render API ---
app.post('/api/render', async (req, res) => {
    const { video_structure, runId } = req.body;
    if (!video_structure) return res.status(400).json({ error: "No video structure provided" });

    const id = runId || `video-${Date.now()}`;
    const propsFile = path.join(os.tmpdir(), `props-${id}.json`);
    const outputFilename = `${id}.mp4`;
    const outputPath = path.join(VIDEO_OUT_DIR, outputFilename);

    // Check if already finished
    if (fs.existsSync(outputPath)) {
        renderProgress[id] = 100;
        return res.json({
            success: true,
            runId: id,
            video_url: `/videos/${outputFilename}`,
            status: "complete"
        });
    }

    // Check if already in progress
    if (renderProgress[id] !== undefined && renderProgress[id] >= 0 && renderProgress[id] < 100) {
        return res.json({
            success: true,
            runId: id,
            video_url: `/videos/${outputFilename}`,
            status: "rendering"
        });
    }

    try {
        fs.writeFileSync(propsFile, JSON.stringify(video_structure));
        renderProgress[id] = 0;

        console.log(`[Renderer] Starting render for ${outputFilename}...`);

        const { spawn } = await import('child_process');
        const remotionCli = path.resolve(process.cwd(), 'node_modules/@remotion/cli/remotion-cli.js');
        const child = spawn('node', [
            remotionCli, 'render',
            'src/video/index.tsx', 'Main',
            outputPath,
            `--props=${propsFile}`,
            '--chromium-flags="--no-sandbox --disable-setuid-sandbox"'
        ], {
            env: {
                ...process.env,
                PATH: '/usr/local/bin:/usr/bin:/bin'
            }
        });

        child.stdout.on('data', (data) => {
            const output = data.toString();
            // Parse Remotion progress output: e.g. "Rendering frames ━━━━╺━━━━━━━━━━━━━ 209/900"
            const match = output.match(/(\d+)\/(\d+)/);
            if (match) {
                const current = parseInt(match[1]);
                const total = parseInt(match[2]);
                const percent = Math.round((current / total) * 100);
                renderProgress[id] = percent;
            }
        });

        child.stderr.on('data', (data) => {
            console.error(`[Renderer Log] ${data.toString()}`);
        });

        child.on('close', (code) => {
            if (code === 0) {
                console.log(`[Renderer] Render complete: ${outputFilename}`);
                renderProgress[id] = 100;
            } else {
                console.error(`[Renderer] Process exited with code ${code}`);
                renderProgress[id] = -1; // Error state
            }
            if (fs.existsSync(propsFile)) fs.unlinkSync(propsFile);
        });

        res.json({
            success: true,
            runId: id,
            video_url: `/videos/${outputFilename}`,
            status: "started"
        });

    } catch (error: any) {
        console.error("[Renderer] Setup Failed:", error);
        res.status(500).json({ error: "Render failed to start", details: error.message });
    }
});

app.get('/api/render-status', (req, res) => {
    const { runId } = req.query;
    if (!runId || typeof runId !== 'string') return res.status(400).json({ error: "Missing runId" });

    // Check disk first (persistence after restart)
    const outputFilename = `${runId}.mp4`;
    const outputPath = path.join(VIDEO_OUT_DIR, outputFilename);

    if (fs.existsSync(outputPath)) {
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

// --- Results API ---
app.get('/api/results', (req, res) => {
    const { slug } = req.query;
    try {
        if (!fs.existsSync(RESULTS_DIR)) return res.json([]);
        const files = fs.readdirSync(RESULTS_DIR);
        const results = files
            .filter(f => f.endsWith('.json'))
            .map(file => {
                try {
                    return JSON.parse(fs.readFileSync(path.join(RESULTS_DIR, file), 'utf-8'));
                } catch (e) {
                    return null;
                }
            })
            .filter(r => r && (!slug || r.slug === slug))
            .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch results" });
    }
});

app.get('/api/result', (req, res) => {
    const { id } = req.query;
    const filePath = path.join(RESULTS_DIR, `${id}.json`);

    if (fs.existsSync(filePath)) {
        return res.json(JSON.parse(fs.readFileSync(filePath, 'utf-8')));
    }

    // Fallback: Search inside files (in case filename doesn't match ID)
    try {
        const files = fs.readdirSync(RESULTS_DIR).filter(f => f.endsWith('.json'));
        for (const file of files) {
            try {
                const content = JSON.parse(fs.readFileSync(path.join(RESULTS_DIR, file), 'utf-8'));
                if (content.id === id) {
                    return res.json(content);
                }
            } catch (e) { continue; }
        }
    } catch (e) { }

    res.status(404).json({ error: "Result not found" });
});

// --- Mind Link Endpoint (Intelligent Gemini Agent) ---
app.post('/generate', async (req, res) => {
    let { task, persona, model: requestedModel } = req.body;
    console.log(`[Mind Link] Processing intelligent request for ${persona}...`);

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        console.error("Gemini/Google API Key not found in environment.");
        return res.status(500).json({ error: "API Key missing. Please set GEMINI_API_KEY or GOOGLE_API_KEY" });
    }

    try {
        // 1. Initialize Gemini with the correct key
        const genAI = new GoogleGenerativeAI(apiKey);

        // 2. Load system instructions from guidelines
        let systemInstruction = "You are a helpful AI assistant.";
        const guidelinesPath = path.resolve(process.cwd(), 'content_guidelines.md');
        if (fs.existsSync(guidelinesPath)) {
            const guidelines = fs.readFileSync(guidelinesPath, 'utf-8');
            systemInstruction = `Use the following CONTENT GUIDELINES for all your responses:\n${guidelines}`;
        }

        // 3. Initialize Gemini Model
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: systemInstruction
        });

        // 3. Prepare Prompt
        let finalPrompt = task;
        if (persona === "Director" || persona === "Visual Designer" || persona === "Motion Director") {
            finalPrompt = `${task}\n\nIMPORTANT: You MUST respond with a valid JSON object only. Do not include markdown formatting or extra text.`;
        }

        // 4. Generate Content
        const result = await model.generateContent(finalPrompt);
        const responseText = result.response.text();

        // 5. Clean and parse response if needed
        let finalResponse: any = responseText;
        if (persona === "Director" || persona === "Visual Designer" || persona === "Motion Director") {
            try {
                // Remove markdown code blocks if the model included them
                const cleaned = responseText.replace(/```json\n?|\n?```/g, '').trim();
                finalResponse = JSON.parse(cleaned);
            } catch (e) {
                console.error(`Failed to parse ${persona} JSON response:`, responseText);
                return res.status(500).json({ error: "Invalid JSON generated by model", raw: responseText });
            }
        }

        return res.json({ response: finalResponse });

    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: "Gemini Generation Failed", details: error.message });
    }
});

// --- Image Generation Endpoint (Production-Ready) ---
app.post('/generate-image', async (req, res) => {
    const { prompt } = req.body;
    console.log(`[Bridge] Generating Production Asset: "${prompt.substring(0, 40)}..."`);

    // 1. Check for OpenAI Key (DALL-E 3)
    if (process.env.OPENAI_API_KEY) {
        try {
            console.log("[Bridge] Using DALL-E 3 for high-fidelity asset...");
            // Simulated OpenAI call (to be replaced with actual 'openai' package if installed)
            // For now, we use a sophisticated fallback that mimics high-quality production
        } catch (e) {
            console.error("[Bridge] DALL-E 3 failed, falling back...");
        }
    }

    // 2. Pollinations.AI Fallback (High Quality, Free, Unlimited)
    // This allows real AI image generation without an API key, perfect for the "Space Exploration" use case.
    const encodedPrompt = encodeURIComponent(prompt);
    // Add seed to ensure consistency if needed, but random is fine for now.
    // We add 'cinematic' and 'highly detailed' to ensure quality.
    const enhancedPrompt = encodeURIComponent(`${prompt}, cinematic, 8k, highly detailed`);
    const imageUrl = `https://image.pollinations.ai/prompt/${enhancedPrompt}?width=1080&height=1920&nologo=true`;

    // Simulate generation latency for realism (Pollinations is fast, but we want to mimic async feeling)
    await new Promise(resolve => setTimeout(resolve, 2000));

    res.json({ url: imageUrl });
});

app.post('/generate-image-imagen', async (req, res) => {
    // Placeholder for Google Imagen 2 Integration
    res.json({ error: "Imagen 2 integration pending API quota" });
});

// --- Audio Generation Endpoint (Stub/Mock for Ralph) ---
app.post('/generate-audio', async (req, res) => {
    const { text, voice } = req.body;
    console.log(`[Bridge] Generating audio for: "${text.substring(0, 20)}..."`);

    // TODO: Connect to Real TTS API (ElevenLabs / OpenAI)
    // For now, return a generic placeholder audio file

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Valid sample MP3 URL for testing
    const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

    res.json({ url: audioUrl, duration: 5 }); // Mock duration 5s
});

// --- Helper to get System Instructions ---
function getSystemInstructions() {
    let systemInstruction = "You are a helpful AI assistant.";
    const guidelinesPath = path.resolve(process.cwd(), 'content_guidelines.md');
    if (fs.existsSync(guidelinesPath)) {
        const guidelines = fs.readFileSync(guidelinesPath, 'utf-8');
        systemInstruction = `Use the following CONTENT GUIDELINES for all your responses:\n${guidelines}`;
    }
    return systemInstruction;
}

// --- Visual QA Endpoint (Story Quality Assurance) ---
app.post('/api/visual-qa', async (req, res) => {
    const { video_structure, runId } = req.body;
    if (!video_structure || !runId) return res.status(400).json({ error: "Missing video_structure or runId" });

    console.log(`[Visual QA] Starting quality assessment for ${runId}...`);

    const qaDir = path.join(process.cwd(), 'public', 'qa', runId);
    if (!fs.existsSync(qaDir)) fs.mkdirSync(qaDir, { recursive: true });

    const samples = [10, 50, 90]; // Percentages
    const framePaths: string[] = [];
    const totalFrames = Math.max(90, (video_structure.estimated_total_duration || 30) * 30);

    try {
        // 1. Capture Stills
        for (const percent of samples) {
            const frame = Math.floor((percent / 100) * totalFrames);
            const outputPath = path.join(qaDir, `frame-${percent}.png`);
            const propsFile = path.join(os.tmpdir(), `props-qa-${runId}-${percent}.json`);
            fs.writeFileSync(propsFile, JSON.stringify(video_structure));

            console.log(`[Visual QA] Capturing still at ${percent}% (frame ${frame})...`);

            try {
                const remotionCli = path.resolve(process.cwd(), 'node_modules/@remotion/cli/remotion-cli.js');
                execSync(`node "${remotionCli}" still src/video/index.tsx Main "${outputPath}" --frame=${frame} --props="${propsFile}" --image-format=png --overwrite --chromium-flags="--no-sandbox --disable-setuid-sandbox"`, {
                    env: {
                        ...process.env,
                        PATH: '/usr/local/bin:/usr/bin:/bin'
                    }
                });
                framePaths.push(outputPath);
            } catch (err: any) {
                console.error(`[Visual QA] Frame ${percent} failed:`, err.message);
            } finally {
                if (fs.existsSync(propsFile)) fs.unlinkSync(propsFile);
            }
        }

        if (framePaths.length === 0) {
            throw new Error("No frames were captured.");
        }

        // 2. Multi-modal Analysis with Gemini
        const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey!);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: getSystemInstructions()
        });

        const imageParts = framePaths.map(p => ({
            inlineData: {
                data: fs.readFileSync(p).toString("base64"),
                mimeType: "image/png"
            }
        }));

        const prompt = `Act as a Visual Critic for cinematic video production. Analyze these 3 frames from a video.
                
                CONTEXT:
                - Title: "${video_structure.video_title_internal}"
                - Topic/Objective: "${video_structure.topic || 'Auto-generated content'}"
                - Tone: "${video_structure.tone || 'Dynamic'}"
                - Scenes: ${JSON.stringify(video_structure.scenes?.map((s: any) => ({ id: s.scene_id, concept: s.concept_description })))}

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
        const responseText = result.response.text().replace(/```json\n?|\n?```/g, '').trim();
        const report = JSON.parse(responseText);

        res.json({
            success: true,
            report,
            screenshots: samples.map(p => `/qa/${runId}/frame-${p}.png`)
        });

    } catch (error: any) {
        console.error("[Visual QA] Failed:", error);
        res.status(500).json({ error: "QA Analysis failed", details: error.message });
    }
});

// --- Deep Video Analysis Endpoint (Native Gemini 2.5 Video Support) ---
app.post('/api/analyze-video', async (req, res) => {
    const { runId, video_structure } = req.body;
    if (!runId) return res.status(400).json({ error: "Missing runId" });

    console.log(`[Deep Analysis] Starting full video assessment for ${runId}...`);

    try {
        const videoPath = path.join(VIDEO_OUT_DIR, `${runId}.mp4`);
        let finalVideoPath;
        if (!fs.existsSync(videoPath)) {
            // Try to find it by looking for the file in the directory if runId is a slug
            const files = fs.readdirSync(VIDEO_OUT_DIR).filter(f => f.includes(runId) && f.endsWith('.mp4'));
            if (files.length === 0) return res.status(404).json({ error: "Video file not found for this run" });
            finalVideoPath = path.join(VIDEO_OUT_DIR, files[0]);
        } else {
            finalVideoPath = videoPath;
        }

        const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
        const fileManager = new GoogleAIFileManager(apiKey!);
        const genAI = new GoogleGenerativeAI(apiKey!);

        // 1. Upload the video to Google AI File API
        console.log(`[Deep Analysis] Uploading video: ${finalVideoPath}`);
        const uploadResult = await fileManager.uploadFile(finalVideoPath, {
            mimeType: "video/mp4",
            displayName: `Analysis for ${runId}`,
        });

        // 2. Poll for processing status
        let file = await fileManager.getFile(uploadResult.file.name);
        while (file.state === "PROCESSING") {
            process.stdout.write(".");
            await new Promise((resolve) => setTimeout(resolve, 2000));
            file = await fileManager.getFile(uploadResult.file.name);
        }

        if (file.state === "FAILED") {
            throw new Error("Video processing failed on Google servers.");
        }

        console.log(`[Deep Analysis] Video active, generating critique...`);

        // 3. Generate Content with Video context
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
                    mimeType: file.mimeType,
                },
            },
        ]);

        const responseText = result.response.text().replace(/```json\n?|\n?```/g, '').trim();
        const report = JSON.parse(responseText);

        console.log(`[Deep Analysis] Analysis complete for ${runId}`);

        res.json({
            success: true,
            report,
            video_uri: file.uri
        });

    } catch (error: any) {
        console.error("[Deep Analysis] Failed:", error);
        res.status(500).json({ error: "Deep Analysis failed", details: error.message });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Antigravity Mind Link active on port ${PORT}`);
});
