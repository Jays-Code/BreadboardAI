import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import os from 'os';
import { pathToFileURL } from 'url';
import { createLoader, invokeGraph } from "@google-labs/breadboard";
import { directorFlowDef, copywriterFlowDef, captionerFlowDef, assemblerDef } from "../boards/prompt-to-post.js";
import { kit } from "@breadboard-ai/build";
import { GoogleGenerativeAI } from "@google/generative-ai";
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
                captionerFlow: captionerFlowDef,
                assembler: assemblerDef
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
                        sendEvent('node-start', { id: node.id, type: node.type });
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

// --- Render API ---
app.post('/api/render', async (req, res) => {
    const { video_structure, runId } = req.body;
    if (!video_structure) return res.status(400).json({ error: "No video structure provided" });

    const propsFile = path.join(os.tmpdir(), `props-${runId || Date.now()}.json`);
    const outputFilename = `${runId || 'video'}.mp4`;
    const outputPath = path.join(VIDEO_OUT_DIR, outputFilename);

    try {
        fs.writeFileSync(propsFile, JSON.stringify(video_structure));

        console.log(`[Renderer] Starting render for ${outputFilename}...`);

        // Execute Remotion render
        const { exec } = await import('child_process');
        const cmd = `npx remotion render src/video/index.tsx Main ${outputPath} --props=${propsFile}`;

        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error(`[Renderer] Error: ${error.message}`);
                return;
            }
            console.log(`[Renderer] Render complete: ${outputFilename}`);
            // Clean up props file
            fs.unlinkSync(propsFile);
        });

        // We return immediately with the expected path (async render)
        // In a more complex app, we'd use a webhook or polling
        res.json({
            success: true,
            video_url: `/videos/${outputFilename}`,
            status: "rendering"
        });

    } catch (error: any) {
        console.error("[Renderer] Setup Failed:", error);
        res.status(500).json({ error: "Render failed to start", details: error.message });
    }
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
        res.json(JSON.parse(fs.readFileSync(filePath, 'utf-8')));
    } else {
        res.status(404).json({ error: "Result not found" });
    }
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
        if (persona === "Director") {
            finalPrompt = `${task}\n\nIMPORTANT: You MUST respond with a valid JSON object only. Do not include markdown formatting or extra text.`;
        }

        // 4. Generate Content
        const result = await model.generateContent(finalPrompt);
        const responseText = result.response.text();

        // 5. Clean and parse response if needed
        let finalResponse: any = responseText;
        if (persona === "Director") {
            try {
                // Remove markdown code blocks if the model included them
                const cleaned = responseText.replace(/```json\n?|\n?```/g, '').trim();
                finalResponse = JSON.parse(cleaned);
            } catch (e) {
                console.error("Failed to parse Director JSON response:", responseText);
                return res.status(500).json({ error: "Invalid JSON generated by model", raw: responseText });
            }
        }

        return res.json({ response: finalResponse });

    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: "Gemini Generation Failed", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Antigravity Mind Link active on port ${PORT}`);
});
