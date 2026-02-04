import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { pathToFileURL } from 'url';
import { createLoader, invokeGraph } from "@google-labs/breadboard";
import { directorFlowDef, copywriterFlowDef, captionerFlowDef, assemblerDef } from "../boards/prompt-to-post.js";
import { kit } from "@breadboard-ai/build";

const app = express();
const PORT = 3000;

// Paths for the "Mind Link"
const BRAIN_DIR = path.resolve(process.cwd(), '.agent', 'brain');
const REQUESTS_FILE = path.join(BRAIN_DIR, 'requests.json');
const RESPONSES_FILE = path.join(BRAIN_DIR, 'responses.json');
const RESULTS_DIR = path.resolve(process.cwd(), 'public', 'results');

// Ensure directories exist
if (!fs.existsSync(BRAIN_DIR)) fs.mkdirSync(BRAIN_DIR, { recursive: true });
if (!fs.existsSync(RESULTS_DIR)) fs.mkdirSync(RESULTS_DIR, { recursive: true });

// Initialize files if they don't exist
if (!fs.existsSync(REQUESTS_FILE)) fs.writeFileSync(REQUESTS_FILE, '[]');
if (!fs.existsSync(RESPONSES_FILE)) fs.writeFileSync(RESPONSES_FILE, '[]');

app.use(bodyParser.json());

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

        const runId = crypto.randomUUID();
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

// --- Mind Link Endpoint (Legacy/Agent) ---
app.post('/generate', async (req, res) => {
    const { task, persona, model } = req.body;
    console.log(`[Mind Link] Processing request for ${persona}...`);

    // Immediate Mock Response to unblock debugging
    let responseText = "Mocked AI response";
    let jsonResponse = {};

    if (persona === "Director") {
        jsonResponse = {
            video_title_internal: "The Pulse of House",
            estimated_total_duration: 60,
            scenes: [
                { scene_id: 1, concept_description: "DJ spinning vinyl", key_takeaway: "Origins in Chicago", duration_sec: 20 },
                { scene_id: 2, concept_description: "Crowd dancing", key_takeaway: "Global expansion", duration_sec: 20 },
                { scene_id: 3, concept_description: "Modern festival", key_takeaway: "EDM evolution", duration_sec: 20 }
            ]
        };
        responseText = ""; // logic below uses jsonResponse if structure matches
    } else if (persona === "Copywriter") {
        responseText = "Chicago 80s Vibe";
    } else if (persona === "Social Media Manager") {
        responseText = "Check out the history of House music! #EDM #MusicHistory";
    }

    // specific handling for director flow which expects object in 'response' sometimes? 
    // Wait, prompt-to-post.ts expects result.response to be the object for Director?
    // directorFlowDef invoke: const result = await response.json(); const data = result.response;

    return res.json({ response: Object.keys(jsonResponse).length > 0 ? jsonResponse : responseText });
});

app.listen(PORT, () => {
    console.log(`Antigravity Mind Link active on port ${PORT}`);
});
