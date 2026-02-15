import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import os from 'os';
import { execSync } from 'child_process';
import { pathToFileURL } from 'url';
import { createLoader, runGraph, asRuntimeKit } from "@google-labs/breadboard";
import {
    directorFlowDef,
    copywriterFlowDef,
    visualArchitectFlowDef,
    assetSourcingFlowDef,
    musicSourcingFlowDef,
    voiceoverFlowDef,
    assemblerDef,
    rendererDef
} from "../boards/prompt-to-post.js";
import {
    analystFlowDef,
    repurposeSourcingFlowDef,
    validateNarrativeFlowDef,
    integratedProductionDef,
    narrativeSelectorFlowDef
} from "../boards/repurpose-video.js";
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

// --- Timestamp Helper ---
function parseTimestampToSeconds(ts: string | number): number {
    if (typeof ts === 'number') return ts;
    if (!ts) return 0;

    // Handle HH:MM:SS or MM:SS
    const parts = ts.toString().split(':').map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return Number(ts) || 0;
}
app.use(express.static(path.resolve(process.cwd(), 'ui')));
app.use('/api', express.static(path.resolve(process.cwd(), 'public', 'api')));
app.use('/videos', express.static(VIDEO_OUT_DIR));
app.use('/assets', express.static(path.resolve(process.cwd(), 'public', 'assets')));

// --- Generic Run Endpoint (Wait for completion) ---
app.post('/api/run', async (req, res) => {
    const { slug, inputs } = req.body;
    try {
        const boardPath = path.join(process.cwd(), 'public', 'api', `${slug}.json`);
        if (!fs.existsSync(boardPath)) return res.status(404).json({ error: `Board ${slug} not found` });
        const graph = JSON.parse(fs.readFileSync(boardPath, 'utf-8'));
        const loader = createLoader();

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
                musicSourcingFlow: musicSourcingFlowDef,
                voiceoverFlow: voiceoverFlowDef,
                assembler: assemblerDef,
                renderer: rendererDef,
                analystFlow: analystFlowDef,
                repurposeSourcingFlow: repurposeSourcingFlowDef,
                validateNarrativeFlow: validateNarrativeFlowDef,
                integratedProduction: integratedProductionDef,
                narrativeSelectorFlow: narrativeSelectorFlowDef
            }
        });

        // Use runGraph for one-shot execution
        const generator = runGraph({ graph }, {
            inputs,
            base: new URL(pathToFileURL(path.join(process.cwd(), 'public', 'api')).toString()),
            loader,
            kits: [asRuntimeKit(customKit as any)]
        });

        let lastOutput = {};
        for await (const event of generator) {
            if (event.type === "output") {
                lastOutput = event.outputs;
            }
        }
        res.json({ result: lastOutput });
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

        const graph = JSON.parse(fs.readFileSync(boardPath, 'utf-8'));
        // Use runGraph which handles inputs/kits traversal correctly
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
                musicSourcingFlow: musicSourcingFlowDef,
                voiceoverFlow: voiceoverFlowDef,
                assembler: assemblerDef,
                renderer: rendererDef,
                analystFlow: analystFlowDef,
                repurposeSourcingFlow: repurposeSourcingFlowDef,
                validateNarrativeFlow: validateNarrativeFlowDef,
                integratedProduction: integratedProductionDef,
                narrativeSelectorFlow: narrativeSelectorFlowDef
            }
        });

        console.log(`[Bridge] Running ${slug} with inputs:`, JSON.stringify(inputs));

        const topicSlug = inputs.topic ? String(inputs.topic).toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').substring(0, 30) : 'run';
        const runId = inputs.runId || `${topicSlug}-${crypto.randomUUID().substring(0, 8)}`;
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
            kits: [asRuntimeKit(customKit as any)],
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

    let id = runId;
    if (!id || id === "") {
        if (video_structure.topic) {
            const topicSlug = video_structure.topic.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').substring(0, 40);
            id = `${topicSlug}-${crypto.randomUUID().substring(0, 5)}`;
            console.log(`[Renderer] Smart ID generated from topic: ${id}`);
        } else {
            id = `video-${Date.now()}`;
            console.log(`[Renderer] No topic found, using timestamp ID: ${id}`);
        }
    }

    let outputPath = path.join(VIDEO_OUT_DIR, `${id}.mp4`);

    // Collision Detection: If the file exists, we need a NEW ID to avoid overwriting or lazy-load bugs.
    if (fs.existsSync(outputPath)) {
        const suffix = crypto.randomUUID().substring(0, 5);
        const oldId = id;
        id = `${id}-${suffix}`;
        console.log(`[Renderer] Collision detected for ID ${oldId}. New unique ID: ${id}`);
        outputPath = path.join(VIDEO_OUT_DIR, `${id}.mp4`);
    }

    const propsFile = path.join(os.tmpdir(), `props-${id}.json`);

    try {
        fs.writeFileSync(propsFile, JSON.stringify(video_structure));
        renderProgress[id] = 0;

        console.log(`[Renderer] Starting render for ${id}.mp4...`);

        const { spawn } = await import('child_process');
        const remotionCli = path.resolve(process.cwd(), 'node_modules/@remotion/cli/remotion-cli.js');
        const child = spawn('node', [
            remotionCli, 'render',
            'src/video/index.tsx', 'Main',
            outputPath,
            `--props=${propsFile}`,
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--loglevel=verbose'
        ], {
            env: { ...process.env },
            timeout: 600000 // 10 minute timeout
        });

        const logMemory = () => {
            const mem = process.memoryUsage();
            console.log(`[Renderer:${id}] Memory: RSS=${Math.round(mem.rss / 1024 / 1024)}MB, Heap=${Math.round(mem.heapUsed / 1024 / 1024)}MB`);
        };

        logMemory();
        const memInterval = setInterval(logMemory, 10000);

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
                console.log(`[Renderer] Render complete: ${id}.mp4`);
                renderProgress[id] = 100;
            } else {
                console.error(`[Renderer] Process exited with code ${code}`);
                renderProgress[id] = -1; // Error state
            }
            if (fs.existsSync(propsFile)) fs.unlinkSync(propsFile);
            clearInterval(memInterval);
        });

        res.json({
            success: true,
            runId: id,
            video_url: `/videos/${id}.mp4`,
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
        if (persona === "Director" || persona === "Visual Designer" || persona === "Motion Director" || persona === "Script Doctor" || persona === "Final Judge") {
            finalPrompt = `${task}\n\nIMPORTANT: You MUST respond with a valid JSON object only. Do not include markdown formatting or extra text.`;
        }

        // 4. Generate Content
        const result = await model.generateContent(finalPrompt);
        const responseText = result.response.text();

        // 5. Clean and parse response if needed
        let finalResponse: any = responseText;
        if (persona === "Director" || persona === "Visual Designer" || persona === "Motion Director" || persona === "Script Doctor" || persona === "Final Judge") {
            try {
                // Robustly remove markdown code blocks
                let cleaned = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                // Sometimes models wrap in ` ` 
                if (cleaned.startsWith('`') && cleaned.endsWith('`')) {
                    cleaned = cleaned.substring(1, cleaned.length - 1);
                }
                finalResponse = JSON.parse(cleaned);
            } catch (e) {
                console.error(`Failed to parse ${persona} JSON response:`, responseText);
                // Attempt to rescue partial JSON or just fail with more detail
                return res.status(500).json({ error: "Invalid JSON generated by model", raw: responseText });
            }
        }

        // MOCK OVERRIDE FOR DIRECTOR DEBUGGING
        if (persona === "Director") {
            const mockResponse = {
                "video_title_internal": "The Future of AI Video",
                "ambient_mood": "neon futuristic",
                "estimated_total_duration": 20,
                "scenes": [
                    {
                        "scene_id": 1,
                        "arc_phase": "hook",
                        "concept_description": "A close-up of a digital eye opening",
                        "key_takeaway": "AI isn't just watching; it's creating.",
                        "duration_sec": 5
                    },
                    {
                        "scene_id": 2,
                        "arc_phase": "journey",
                        "concept_description": "Montage of AI generating art",
                        "key_takeaway": "From pixels to reality in seconds.",
                        "duration_sec": 7
                    },
                    {
                        "scene_id": 3,
                        "arc_phase": "climax",
                        "concept_description": "A human shaking hands with a robot",
                        "key_takeaway": "The collaboration era is here.",
                        "duration_sec": 8
                    }
                ]
            };
            console.log("[Bridge] USING MOCK RESPONSE FOR DIRECTOR");
            return res.json({ response: mockResponse });
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
    console.log(`[Bridge] Enhancing production asset prompt: "${prompt.substring(0, 40)}..."`);

    try {
        const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey!);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: "You are a Master Prompt Engineer for AI Image Generation. Your goal is to take a simple description and turn it into a high-fidelity, cinematic, and professional-grade descriptive prompt for DALL-E or Midjourney. Focus on lighting, texture, composition, and mood. Avoid generic terms; use specific artistic styles."
        });

        const enhancementResult = await model.generateContent(`Enhance this image prompt for a cinematic short-form video: "${prompt}". Output ONLY the enhanced prompt string.`);
        const enhancedPromptText = enhancementResult.response.text().trim();

        console.log(`[Bridge] Enhanced Prompt: "${enhancedPromptText.substring(0, 50)}..."`);

        const POLLINATIONS_URL = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPromptText)}?width=1080&height=1920&nologo=true`;

        try {
            console.log(`[Bridge] Downloading generated image locally from: ${POLLINATIONS_URL}`);
            const filename = `image-${crypto.randomUUID().substring(0, 8)}.png`;
            const imageDir = path.join(process.cwd(), 'public', 'assets', 'images');
            if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });

            const outputPath = path.join(imageDir, filename);
            const response = await fetch(POLLINATIONS_URL, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
                }
            });
            if (response.ok) {
                const buffer = Buffer.from(await response.arrayBuffer());
                fs.writeFileSync(outputPath, buffer);
                console.log(`[Bridge] Image cached locally: /assets/images/${filename}`);
                return res.json({ url: `/assets/images/${filename}` });
            } else {
                console.warn(`[Bridge] Image download failed with status ${response.status}: ${response.statusText}`);
            }
        } catch (downloadError: any) {
            console.warn(`[Bridge] Image download error: ${downloadError.message}`);
        }

        res.json({ url: POLLINATIONS_URL });

    } catch (e: any) {
        console.warn("[Bridge] Prompt enhancement failed, using fallback:", e.message);
        const fallbackPrompt = encodeURIComponent(`${prompt}, cinematic, 8k, highly detailed`);
        const imageUrl = `https://image.pollinations.ai/prompt/${fallbackPrompt}?width=1080&height=1920&nologo=true`;
        res.json({ url: imageUrl });
    }
});

// --- Dynamic Video Sourcing Endpoint (yt-dlp powered) ---
app.post('/api/source-video', async (req, res) => {
    const { prompt, url, start, end } = req.body;

    // 1. Precision Clipping Mode (Specific URL + Timestamps)
    if (url && start && end) {
        console.log(`[Source Video] Precision clipping from ${url}: ${start} -> ${end}`);

        try {
            // Get total duration to prevent hallucinations
            const durationStr = execSync(`yt-dlp --get-duration "${url}"`).toString().trim();
            const totalDuration = parseTimestampToSeconds(durationStr);
            console.log(`[Source Video] Source duration: ${totalDuration}s`);

            let startSec = parseTimestampToSeconds(start);
            let endSec = parseTimestampToSeconds(end);

            // Clamp and Validate
            if (startSec >= totalDuration) {
                console.warn(`[Source Video] Start timestamp ${start} is beyond video duration ${totalDuration}s. Resetting to 0.`);
                startSec = 0;
            }
            if (endSec > totalDuration) {
                console.warn(`[Source Video] End timestamp ${end} is beyond video duration ${totalDuration}s. Clamping to end.`);
                endSec = totalDuration;
            }
            if (endSec <= startSec) {
                endSec = Math.min(startSec + 5, totalDuration);
            }

            // --- Safety Duration Cap ---
            const MAX_CLIP_DURATION = 15;
            if (endSec - startSec > MAX_CLIP_DURATION) {
                console.warn(`[Source Video] Requested clip duration (${endSec - startSec}s) is too long. Capping to ${MAX_CLIP_DURATION}s for disk safety.`);
                endSec = startSec + MAX_CLIP_DURATION;
            }

            const safeName = url.split('/').pop()?.split('?')[0].substring(0, 15).replace(/[^a-z0-9]/g, '') || 'clip';
            const filename = `clip-${safeName}-${crypto.randomUUID().substring(0, 4)}.mp4`;
            const videoAssetsDir = path.join(process.cwd(), 'public', 'assets', 'videos');
            if (!fs.existsSync(videoAssetsDir)) fs.mkdirSync(videoAssetsDir, { recursive: true });
            const outputPath = path.join(videoAssetsDir, filename);

            // yt-dlp precision clipping using --download-sections
            console.log(`[Source Video] Executing yt-dlp clip: ${startSec}s to ${endSec}s...`);
            const section = `*${startSec}-${endSec}`;
            const formatStr = "bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/best[height<=720][ext=mp4]/best";
            try {
                execSync(`yt-dlp -f "${formatStr}" --download-sections "${section}" --no-playlist --force-overwrites --output "${outputPath}" "${url}"`, {
                    stdio: 'pipe',
                    timeout: 45000 // 45s timeout for a single clip
                });
            } catch (clipError: any) {
                console.warn(`[Source Video] Precision clipping failed for ${section}:`);
                if (clipError.stdout) console.warn("  STDOUT:", clipError.stdout.toString());
                if (clipError.stderr) console.warn("  STDERR:", clipError.stderr.toString());
            }

            if (fs.existsSync(outputPath)) {
                console.log(`[Source Video] Asset created: /assets/videos/${filename}`);
                return res.json({ url: `/assets/videos/${filename}` });
            } else {
                throw new Error("yt-dlp finished but file was not created");
            }
        } catch (error: any) {
            console.error("[Source Video] Precision clipping failed:", error.message);
            // Fall through to search if clipping fails
        }
    }

    // 2. Dynamic Search Mode (Existing fallback)
    if (!prompt) return res.status(400).json({ error: "Missing prompt or url/timestamps" });

    let searchPrompt = prompt;
    if (prompt.length > 100) {
        searchPrompt = prompt.split(',')[0].substring(0, 100);
    }

    console.log(`[Bridge] Sourcing Video for: "${prompt.substring(0, 40)}..."`);
    const safeNameSearch = searchPrompt.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').substring(0, 30);
    const filenameSearch = `${safeNameSearch}-${crypto.randomUUID().substring(0, 4)}.mp4`;
    const outputPathSearch = path.join(process.cwd(), 'public', 'assets', 'videos', filenameSearch);

    try {
        const searchUrl = `ytsearch1:${searchPrompt} footage creative commons`;
        console.log(`[Bridge] Executing yt-dlp search: ${searchUrl}`);

        execSync(`yt-dlp -f "best[height<=720][ext=mp4]" --download-sections "*0-10" --no-playlist --output "${outputPathSearch}" "${searchUrl}" --max-filesize 20M`, {
            stdio: 'inherit'
        });

        if (fs.existsSync(outputPathSearch)) {
            console.log(`[Bridge] Video sourced: /assets/videos/${filenameSearch}`);
            return res.json({ url: `/assets/videos/${filenameSearch}` });
        } else {
            throw new Error("yt-dlp finished but file was not created");
        }

    } catch (error: any) {
        console.error("[Bridge] Video Sourcing Failed:", error.message);
        const fallback = "/assets/videos/nebula.mp4";
        if (fs.existsSync(path.join(process.cwd(), 'public', fallback))) {
            return res.json({ url: fallback, warning: "Sourcing failed, using fallback" });
        }
        res.status(500).json({ error: "Video sourcing failed", details: error.message });
    }
});

app.post('/generate-image-imagen', async (req, res) => {
    // Placeholder for Google Imagen 2 Integration
    res.json({ error: "Imagen 2 integration pending API quota" });
});

// --- Audio Generation Endpoint (Keyless Free Google TTS with Timestamps) ---
app.post('/generate-audio', async (req, res) => {
    const { text, voice } = req.body;
    console.log(`[Bridge] Generating Free TTS audio for: "${text.substring(0, 20)}..."`);

    try {
        const cleanText = text.substring(0, 200).replace(/\n/g, ' ');
        const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=en&client=tw-ob`;

        const response = await fetch(ttsUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
        });

        if (!response.ok) {
            throw new Error(`Google TTS Error: ${response.statusText}`);
        }

        const buffer = Buffer.from(await response.arrayBuffer());
        const filename = `audio-${crypto.randomUUID().substring(0, 8)}.mp3`;
        const audioDir = path.join(process.cwd(), 'public', 'assets', 'audio');
        if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });

        const outputPath = path.join(audioDir, filename);
        fs.writeFileSync(outputPath, buffer);

        // --- Heuristic Timestamp Generation ---
        // Since we don't have real alignment, we estimate based on character length
        const words = cleanText.split(/\s+/).filter((w: string) => w.length > 0);
        // Estimate duration: ~150 words per minute = 2.5 words per second
        // Or roughly 0.4s per word. Let's use 0.4s as a base, but weight by length.
        const totalChars = cleanText.length;
        const totalDurationEstimate = Math.max(2, words.length * 0.4); // Min 2s

        let currentOffset = 0;
        const timestamps = words.map((word: string) => {
            const wordWeight = word.length / totalChars;
            const wordDuration = wordWeight * totalDurationEstimate;
            const ts = {
                word,
                startOffsetMs: Math.round(currentOffset * 1000),
                durationMs: Math.round(wordDuration * 1000)
            };
            currentOffset += wordDuration;
            return ts;
        });

        console.log(`[Bridge] Free Audio generated: /assets/audio/${filename} (${timestamps.length} words)`);
        res.json({
            url: `/assets/audio/${filename}`,
            duration: totalDurationEstimate,
            timestamps: timestamps
        });
    } catch (error: any) {
        console.error("[Bridge] Free Audio Generation Failed:", error.message);
        res.json({
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            duration: 5,
            timestamps: [],
            error: error.message
        });
    }
});

// --- Background Music Sourcing ---
app.post('/api/generate-music', async (req, res) => {
    const { mood, topic } = req.body;
    console.log(`[Bridge] Sourcing background music for mood: ${mood}`);

    // High Quality Royalty Free Tracks (Curated Mock Library)
    const library: Record<string, string> = {
        "high": "https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a7343e.mp3", // Energetic
        "chill": "https://cdn.pixabay.com/audio/2022/01/21/audio_31b3164973.mp3", // Lo-fi
        "educational": "https://cdn.pixabay.com/audio/2021/11/24/audio_83a6286782.mp3", // Corporate
        "cinematic": "https://cdn.pixabay.com/audio/2023/10/24/audio_3608ca6727.mp3" // Epic
    };

    let url = library["high"];
    if (mood?.toLowerCase().includes("chill") || mood?.toLowerCase().includes("relax")) url = library["chill"];
    else if (mood?.toLowerCase().includes("history") || mood?.toLowerCase().includes("tech")) url = library["educational"];
    else if (mood?.toLowerCase().includes("epic") || mood?.toLowerCase().includes("future")) url = library["cinematic"];

    try {
        const hostname = new URL(url).hostname;
        console.log(`[Bridge] Downloading music from ${hostname}...`);

        const filename = `music-${crypto.randomUUID().substring(0, 8)}.mp3`;
        const musicDir = path.join(process.cwd(), 'public', 'assets', 'music');
        if (!fs.existsSync(musicDir)) fs.mkdirSync(musicDir, { recursive: true });
        const outputPath = path.join(musicDir, filename);

        // Try fetch first as it's lighter and supports headers easily
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Referer": "https://pixabay.com/"
            },
            signal: AbortSignal.timeout(10000) // 10s timeout
        });

        if (response.ok) {
            const buffer = Buffer.from(await response.arrayBuffer());
            fs.writeFileSync(outputPath, buffer);
            console.log(`[Bridge] Music cached locally: /assets/music/${filename}`);
            return res.json({ url: `/assets/music/${filename}` });
        } else {
            console.warn(`[Bridge] Music fetch failed (status ${response.status}). Trying yt-dlp fallback...`);
            try {
                execSync(`yt-dlp --max-filesize 10M --output "${outputPath}" "${url}"`, {
                    stdio: 'pipe',
                    timeout: 15000 // 15s timeout
                });
                if (fs.existsSync(outputPath)) {
                    console.log(`[Bridge] Music cached locally: /assets/music/${filename}`);
                    return res.json({ url: `/assets/music/${filename}` });
                }
            } catch (ytError: any) {
                console.warn(`[Bridge] yt-dlp music fallback failed: ${ytError.message}`);
            }
        }

        // Final Fallback
        console.warn(`[Bridge] Music sourcing failed. Returning empty URL.`);
        return res.json({ url: "" });
    } catch (error: any) {
        console.error("[Bridge] Music download error:", error.message);
        return res.json({ url: "" });
    }
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
    console.log(`[Visual QA] Starting quality assessment for Run ID: ${runId}`);
    if (!video_structure) console.warn("[Visual QA] Warning: video_structure is missing from request body!");

    if (!video_structure || !runId) {
        console.error(`[Visual QA] Rejecting request: runId=${runId}, hasStructure=${!!video_structure}`);
        return res.status(400).json({ error: "Missing video_structure or runId" });
    }

    const qaDir = path.join(process.cwd(), 'public', 'qa', runId);
    if (!fs.existsSync(qaDir)) fs.mkdirSync(qaDir, { recursive: true });

    const samples = [10, 50, 90]; // Percentages
    const framePaths: string[] = [];
    const totalFrames = Math.min(900, Math.max(90, (video_structure.estimated_total_duration || 30) * 30));

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
                execSync(`node "${remotionCli}" still src/video/index.tsx Main "${outputPath}" --frame=${frame} --props="${propsFile}" --image-format=png --overwrite --concurrency=1 --chromium-flags="--no-sandbox --disable-setuid-sandbox"`, {
                    env: { ...process.env },
                    timeout: 60000 // 60s timeout for each frame capture
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
                - Style Profile: "${video_structure.style_profile || 'Vibrant Fusion'}"
                - Scenes: ${JSON.stringify(video_structure.scenes?.map((s: any) => ({ id: s.scene_id, concept: s.concept_description })))}

                CRITERIA:
                1. ALIGNMENT: Do these frames actually achieve the objective and tone described?
                2. STYLE CONSISTENCY: Do these frames strictly adhere to the "${video_structure.style_profile || 'Vibrant Fusion'}" style profile defined in the guidelines (colors, typography, motion feel)?
                3. NARRATIVE ACCURACY: Does the visual content in these frames match the concept descriptions for their respective timestamps?
                4. KINETIC ENGAGEMENT: Do elements look like they are MOVING or staged for action?
                5. COMPOSITION DEPTH: Are there clear multi-layer compositions?
                6. FIDELITY: Are assets high-quality?

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
    const { runId, video_structure, youtube_url } = req.body;

    // Check for either runId (QA mode) or youtube_url (Analysis mode)
    if (!runId && !youtube_url) return res.status(400).json({ error: "Missing runId or youtube_url" });

    const isYouTubeMode = !!youtube_url;
    console.log(`[Deep Analysis] Starting video assessment. ${isYouTubeMode ? 'YouTube Mode' : 'QA Mode'}...`);

    try {
        let finalVideoPath: string;
        let deleteAfter = false;

        if (isYouTubeMode) {
            console.log(`[Deep Analysis] Downloading YouTube video for analysis: ${youtube_url}`);
            const tempFilename = `youtube-${crypto.randomUUID().substring(0, 8)}.mp4`;
            finalVideoPath = path.join(os.tmpdir(), tempFilename);
            deleteAfter = true;

            // Download the video
            // We use a robust format selection to ensure we always get something compatible
            const formatStr = "bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/best[height<=720][ext=mp4]/best";
            try {
                execSync(`yt-dlp -f "${formatStr}" --no-playlist --output "${finalVideoPath}" "${youtube_url}"`, {
                    stdio: 'pipe'
                });
            } catch (error: any) {
                console.error("[Deep Analysis] yt-dlp failed:");
                if (error.stdout) console.error("  STDOUT:", error.stdout.toString());
                if (error.stderr) console.error("  STDERR:", error.stderr.toString());
                throw new Error(`Failed to download YouTube video: ${error.message}`);
            }
        } else {
            const videoPath = path.join(VIDEO_OUT_DIR, `${runId}.mp4`);
            if (!fs.existsSync(videoPath)) {
                // Try to find it by looking for the file in the directory if runId is a slug
                const files = fs.readdirSync(VIDEO_OUT_DIR).filter(f => f.includes(runId) && f.endsWith('.mp4'));
                if (files.length === 0) return res.status(404).json({ error: "Video file not found for this run" });
                finalVideoPath = path.join(VIDEO_OUT_DIR, files[0]);
            } else {
                finalVideoPath = videoPath;
            }
        }

        const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
        const fileManager = new GoogleAIFileManager(apiKey!);
        const genAI = new GoogleGenerativeAI(apiKey!);

        // 1. Upload the video to Google AI File API
        console.log(`[Deep Analysis] Uploading video to Gemini File API...`);
        const uploadResult = await fileManager.uploadFile(finalVideoPath, {
            mimeType: "video/mp4",
            displayName: isYouTubeMode ? `Source Analysis: ${youtube_url}` : `QA Analysis: ${runId}`,
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

        console.log(`\n[Deep Analysis] Video active, generating ${isYouTubeMode ? 'distillation' : 'critique'}...`);

        // 3. Generate Content with Video context
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: getSystemInstructions()
        });

        let prompt: string;
        if (isYouTubeMode) {
            const { critique, previous_script } = req.body;

            if (critique) {
                console.log(`[Deep Analysis] Refinement pass triggered. Critique: ${critique.substring(0, 50)}...`);
                prompt = `Act as an Expert Script Doctor. You are refining a previous video script based on a critique.

                CRITIQUE TO ADDRESS: "${critique}"

                PREVIOUS SCRIPT CONTEXT:
                ${previous_script ? JSON.stringify(previous_script) : "No previous script provided."}

                OBJECTIVE:
                1. rewrite the "new_narrator_script" to strictly address the critique (e.g., fix pacing, improve the hook, ensure logical flow).
                2. Keep the timestamps accurate to the source video.
                3. Maintain the 60-second constraint.

                OUTPUT REQUIREMENTS (Strict JSON):
                {
                  "video_title": "string (Catchy social title)",
                  "narrative_summary": "string (1-2 sentence hook/caption)",
                  "new_narrator_script": "string (The refined 60s voiceover script)",
                  "scenes": [
                    {
                      "scene_id": number,
                      "arc_phase": "string (hook | journey | climax | outro)",
                      "script_line": "string (The refined VO line)",
                      "visual_description": "string (Refined visual description if needed)",
                      "duration_sec": number,
                      "source_timestamp_start": "string",
                      "source_timestamp_end": "string"
                    }
                  ]
                }
                
                IMPORTANT: Return ONLY valid JSON.`;
            } else {
                prompt = `Act as an Expert Content Strategist and Narrative Director. 
                Analyze this full video and distill it into a compelling 60-second social media "Full Story" short.
    
                OBJECTIVE:
                1. Identify the most engaging narrative arc within the long video.
                2. Distill the core message into a tight 60-second script.
                3. Extract EXACT timestamps in the format HH:MM:SS (e.g., 00:01:23) or total seconds (e.g., 83.5) for the most relevant visual segments to support the new script.
    
                OUTPUT REQUIREMENTS (Strict JSON):
                {
                  "video_title": "string (Catchy social title)",
                  "narrative_summary": "string (1-2 sentence hook/caption)",
                  "new_narrator_script": "string (Full 60s voiceover script)",
                  "scenes": [
                    {
                      "scene_id": number,
                      "arc_phase": "string (hook | journey | climax | outro)",
                      "script_line": "string (The VO line for this scene)",
                      "visual_description": "string (What should be shown)",
                      "duration_sec": number,
                      "source_timestamp_start": "string (Timestamp in HH:MM:SS or seconds)",
                      "source_timestamp_end": "string (Timestamp in HH:MM:SS or seconds)"
                    }
                  ]
                }
    
                IMPORTANT: 
                - Focus on a single coherent story, not a "best of" compilation.
                - Ensure timestamps are accurate to the source video.
                - Provide at least 5-8 scenes to cover the 60s duration.
                - Keep the output ONLY as JSON.`;
            }
        } else {
            const contextInfo = video_structure ? `
                CONTEXT:
                - Title: "${video_structure.video_title_internal}"
                - Topic/Objective: "${video_structure.topic}"
                - Tone: "${video_structure.tone}"
                - Style Profile: "${video_structure.style_profile}"
                - Full Script: ${JSON.stringify(video_structure.scenes)}
            ` : "";

            prompt = `Act as a Senior Creative Director and Motion Graphics Critic. Analyze this video in its entirety.
                ${contextInfo}
                
                CRITERIA:
                1. MISSION ALIGNMENT: Does the video successfully communicate the intended topic and tone?
                2. STYLE ADHERENCE: Does the video strictly follow the "${video_structure.style_profile || 'Vibrant Fusion'}" aesthetic?
                3. MOTION QUALITY: Is the motion smooth, purposeful, and engaging? Does it follow our guidelines?
                4. PACING & RHYTHM: Does the timing match the narrative arc (Hook -> Journey -> Climax -> Outro)? 
                5. AUDIO-VISUAL SYNC: How well do the animations align with the audio/voiceover?
                6. CONSISTENCY: Is the visual style (colors, assets) consistent throughout?

                Output strict JSON:
                {
                  "score": number (0-100), 
                  "passed": boolean, 
                  "critique": "A detailed multi-paragraph critique covering the above points.", 
                  "improvement_suggestions": ["specific actionable suggestion 1", "suggestion 2"]
                }`;
        }

        const result = await model.generateContent([
            prompt,
            {
                fileData: {
                    fileUri: file.uri,
                    mimeType: file.mimeType,
                },
            },
        ]);

        const responseText = result.response.text();
        let report: any;
        try {
            const cleaned = responseText.replace(/```json\n?|\n?```/g, '').trim();
            report = JSON.parse(cleaned);
        } catch (e) {
            console.warn("[Deep Analysis] Standard JSON parse failed, attempting robust extraction...");
            try {
                // Find potential JSON block
                const jsonMatch = responseText.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    report = JSON.parse(jsonMatch[0]);
                } else {
                    throw new Error("No JSON block found in response");
                }
            } catch (e2) {
                console.error("[Deep Analysis] Robust parsing failed. Raw response:", responseText);
                throw new Error("Failed to parse Gemini analysis report as JSON.");
            }
        }

        // Cleanup temp file if needed
        if (deleteAfter && fs.existsSync(finalVideoPath)) {
            try { fs.unlinkSync(finalVideoPath); } catch (e) { }
        }

        console.log(`[Deep Analysis] Analysis complete.`);

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

// --- Health Check & Benchmark ---
app.get('/api/health', (req, res) => {
    // 1. CPU Info (Linux specific)
    let cpuModel = "Unknown";
    let cpuCores = os.cpus().length;
    try {
        const cpuInfo = fs.readFileSync('/proc/cpuinfo', 'utf8');
        const match = cpuInfo.match(/model name\s+:\s+(.*)/);
        if (match && match[1]) cpuModel = match[1];
    } catch (e) { }

    // 2. Simple Benchmark
    const start = process.hrtime();
    let n = 0;
    // Calculate 5M square roots
    for (let i = 0; i < 5000000; i++) {
        n += Math.sqrt(i);
    }
    const diff = process.hrtime(start);
    const durationSec = (diff[0] * 1e9 + diff[1]) / 1e9;

    let performanceTier = "Standard";
    if (durationSec < 0.1) performanceTier = "Ultra High (TPU/GPU VM?)";
    else if (durationSec < 0.5) performanceTier = "High (Cloud VM)";
    else performanceTier = "Low (Local/Constrained)";

    res.json({
        status: "ok",
        environment: {
            platform: process.platform,
            node_version: process.version,
            cpu_model: cpuModel,
            cpu_cores: cpuCores,
            cloud_provider: process.env.COLAB_GPU ? "Google Colab" : "Unknown/Local"
        },
        benchmark: {
            task: "5M sqrt",
            duration_seconds: durationSec,
            tier: performanceTier
        }
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Antigravity Mind Link active on port ${PORT}`);
});
