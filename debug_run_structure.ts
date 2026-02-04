
import { invokeGraph, createLoader } from "@google-labs/breadboard";
import { pathToFileURL } from 'url';
import path from 'path';
import { kit } from "@breadboard-ai/build";
import { directorFlowDef, copywriterFlowDef, captionerFlowDef, assemblerDef } from "./src/boards/prompt-to-post.ts";

async function debugRun() {
    const slug = 'prompt-to-post';
    const boardPath = path.join(process.cwd(), 'public', 'api', `${slug}.json`);
    const fs = await import('fs');

    // Create Custom Kit
    const customKit = await kit({
        title: "Custom Agent Kit",
        version: "1.0.0",
        url: "npm:custom-agent-kit",
        components: {
            directorFlow: directorFlowDef,
            copywriterFlow: copywriterFlowDef,
            captionerFlow: captionerFlowDef,
            assembler: assemblerDef
        }
    });

    // Mock specific implementations for debug
    const handlers = (customKit as any).handlers;
    handlers.directorFlow = { invoke: async () => ({ title: "Debug Title", scenes: [], total_duration: 10, fullData: {} }) };
    handlers.copywriterFlow = { invoke: async () => ({ scenesWithText: [] }) };
    handlers.captionerFlow = { invoke: async () => ({ caption: "Debug Caption" }) };
    handlers.assembler = { invoke: async () => ({ video_structure: {} }) };

    const graph = JSON.parse(fs.readFileSync(boardPath, 'utf-8'));
    const inputs = {
        topic: "Debug Test",
        tone: "Friendly"
    };

    const loader = createLoader();
    const base = new URL(pathToFileURL(path.join(process.cwd(), 'public', 'api')).toString());

    // Create Mock Probe
    const probe = {
        dispatchEvent: (e: any) => {
            console.log("PROBE EVENT:", e.type);
            if (e.type === 'node') {
                const { node } = e.detail || e;
                console.log("Node Detail:", node.id);
            }
            return true;
        },
        addEventListener: () => { } // Shim if needed
    };

    console.log("Invoking Graph...");

    try {
        const result = await invokeGraph({ graph }, inputs, {
            base,
            loader,
            kits: [customKit as any],
            probe: probe as any
        });
        console.log("Invoke Result:", result);
    } catch (e) {
        console.error("Invoke Failed:", e);
    }
}

debugRun();
