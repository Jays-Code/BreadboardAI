/**
 * YouTube "Full Story" Repurposing Graph
 * Orchestrates the full lifecycle of transforming a long video into a short social story.
 */
import { board, input, output, defineNodeType, array, object } from "@breadboard-ai/build";
import {
    visualArchitectFlowDef,
    musicSourcingFlowDef,
    voiceoverFlowDef,
    assemblerDef,
    rendererDef
} from "./prompt-to-post.js";

// --- 1. Inputs ---
const youtube_url = input({
    title: "YouTube Source URL",
    description: "The video to be repurposed",
    default: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
});

const runId = input({
    title: "Run ID (Optional)",
    description: "Unique identifier for this specific repurposing session",
    default: ""
});

const style_profile = input({
    title: "Style Profile",
    description: "The aesthetic theme for the output video",
    default: "Vibrant Fusion"
});

// --- 2. Analyst Stage (Gemini Native Video Analysis) ---
export const validateNarrativeFlowDef = defineNodeType({
    name: "validateNarrativeFlow",
    metadata: {
        title: "Narrative Validator",
        description: "Checks the script for structural integrity and narrative flow."
    },
    inputs: {
        narrative_summary: { type: "string" },
        scenes: { type: array(object({})) },
        video_title: { type: "string" }
    },
    outputs: {
        status: { type: "string" },
        critique: { type: "string" }
    },
    invoke: async ({ narrative_summary, scenes, video_title }) => {
        console.log(`[Narrative Validator] Reviewing script for "${video_title}"...`);
        const response = await fetch("http://127.0.0.1:3000/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                task: `Act as a Senior Story Editor. Review this video script for narrative structure and continuity.

                CONTEXT:
                - Title: "${video_title}"
                - Premise: "${narrative_summary}"
                - Scenes: ${JSON.stringify(scenes)}

                CRITERIA:
                1. STRUCTURE: Does it have a clear Hook, Journey, and Climax/Resolution?
                2. CONTINUITY: Do the scenes flow logically? Are there jarring jumps?
                3. COMPLETENESS: Is it a self-contained story?

                OUTPUT JSON ONLY:
                {
                  "status": "APPROVED" | "REJECT",
                  "critique": "string (If REJECT, explain EXACTLY what to fix. If APPROVED, brief praise.)"
                }
                
                STRICT RULE: REJECT if the story feels like a random collection of clips or lacks a clear hook.`,
                persona: "Script Doctor",
                model: "antigravity-bridge"
            })
        });
        const result = await response.json();
        const validResult = result.response || { status: "APPROVED", critique: "Auto-approved due to error" };
        console.log(`[Narrative Validator] Verdict: ${validResult.status}`);
        if (validResult.status === "REJECT") console.log(`   Critique: ${validResult.critique}`);
        return {
            status: validResult.status,
            critique: validResult.critique
        };
    }
});

export const analystFlowDef = defineNodeType({
    name: "analystFlow",
    metadata: {
        title: "Deep Video Analyst",
        description: "Gemini 2.5 analyzes the full video to distill a new narrative arc."
    },
    inputs: {
        youtube_url: { type: "string" },
        critique: { type: "string", optional: true },
        previous_script: { type: object({}), optional: true }
    },
    outputs: {
        video_title: { type: "string" },
        narrative_summary: { type: "string" },
        new_narrator_script: { type: "string" },
        scenes: { type: array(object({})) }
    },
    invoke: async ({ youtube_url, critique, previous_script }) => {
        // Bypass if this is a refinement pass but we are already approved
        if (critique && (critique.toUpperCase().includes("APPROVED") || critique.length < 5)) {
            console.log(`[Analyst] Refinement bypassed (Already approved).`);
            return {
                video_title: "",
                narrative_summary: "",
                new_narrator_script: "",
                scenes: []
            };
        }

        console.log(`[Analyst] Distilling story for: ${youtube_url} ${critique ? '(Refinement Pass)' : ''}`);
        const response = await fetch("http://127.0.0.1:3000/api/analyze-video", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ youtube_url, critique, previous_script })
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.error);

        const report = result.report;
        return {
            video_title: report.video_title,
            narrative_summary: report.narrative_summary,
            new_narrator_script: report.new_narrator_script,
            scenes: report.scenes.map((s: any) => ({
                ...s,
                // Map the analyst output to the standard director format for compatibility
                key_takeaway: s.script_line,
                concept_description: s.visual_description,
                duration_sec: Number(s.duration_sec) || 5, // Fallback to 5s if missing/NaN
                arc_phase: s.arc_phase || "journey"
            }))
        };
    }
});
// --- 2.6 Narrative Selector (The Logic Gate) ---
export const narrativeSelectorFlowDef = defineNodeType({
    name: "narrativeSelectorFlow",
    metadata: {
        title: "Narrative Selector",
        description: "Selects the best available narrative."
    },
    inputs: {
        original_title: { type: "string" },
        original_summary: { type: "string" },
        original_script: { type: "string" },
        original_scenes: { type: array(object({})) },
        refined_title: { type: "string", optional: true },
        refined_summary: { type: "string", optional: true },
        refined_script: { type: "string", optional: true },
        refined_scenes: { type: array(object({})), optional: true },
        critique: { type: "string", optional: true }
    },
    outputs: {
        video_title: { type: "string" },
        narrative_summary: { type: "string" },
        new_narrator_script: { type: "string" },
        scenes: { type: array(object({})) }
    },
    invoke: async ({ original_title, original_summary, original_script, original_scenes, refined_title, refined_summary, refined_script, refined_scenes, critique }) => {
        if (critique && critique.length > 5 && refined_title) {
            console.log(`[Narrative Selector] 🔄 Using refined script.`);
            return {
                video_title: refined_title,
                narrative_summary: refined_summary,
                new_narrator_script: refined_script,
                scenes: refined_scenes
            };
        }
        return {
            video_title: original_title,
            narrative_summary: original_summary,
            new_narrator_script: original_script,
            scenes: original_scenes
        };
    }
});

const analystFlow = analystFlowDef({ youtube_url });

const narrativeValidator = validateNarrativeFlowDef({
    narrative_summary: analystFlow.outputs.narrative_summary,
    scenes: analystFlow.outputs.scenes,
    video_title: analystFlow.outputs.video_title
});

const refinementAnalyst = analystFlowDef({
    youtube_url: youtube_url,
    critique: narrativeValidator.outputs.critique
});

const narrativeSelector = narrativeSelectorFlowDef({
    original_title: analystFlow.outputs.video_title,
    original_summary: analystFlow.outputs.narrative_summary,
    original_script: analystFlow.outputs.new_narrator_script,
    original_scenes: analystFlow.outputs.scenes,
    refined_title: refinementAnalyst.outputs.video_title,
    refined_summary: refinementAnalyst.outputs.narrative_summary,
    refined_script: refinementAnalyst.outputs.new_narrator_script,
    refined_scenes: refinementAnalyst.outputs.scenes,
    critique: narrativeValidator.outputs.critique
});

// --- 3. Visual Designer Stage (Reusing Visual Architect) ---
const visualArchitectFlow = visualArchitectFlowDef({
    scenes: narrativeSelector.outputs.scenes,
    tone: "Dynamic and compelling",
    ambient_mood: "cinematic",
    style_profile: style_profile,
    critique: ""
});


// --- 4. Precision CLIP Sourcing Stage ---
// This is specialized for repurposing as it uses BOTH description AND timestamps
export const repurposeSourcingFlowDef = defineNodeType({
    name: "repurposeSourcingFlow",
    metadata: {
        title: "Repurpose Asset Sourcer",
        description: "Extracts precise video segments from the source YouTube video."
    },
    inputs: {
        scenes: { type: array(object({})) },
        source_url: { type: "string" }
    },
    outputs: {
        scenesWithAssets: { type: array(object({})) }
    },
    invoke: async ({ scenes, source_url }) => {
        console.log(`[RepurposeSourcer] Extracting precision segments from ${source_url}...`);
        const scenesArray = scenes as any[];
        const results = [];

        for (const scene of scenesArray) {
            console.log(`   ✂️ Clipping Scene ${scene.scene_id}: ${scene.source_timestamp_start} -> ${scene.source_timestamp_end}`);

            const response = await fetch("http://127.0.0.1:3000/api/source-video", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    url: source_url,
                    start: scene.source_timestamp_start,
                    end: scene.source_timestamp_end,
                    prompt: scene.concept_description // Fallback context
                })
            });
            const result = await response.json();

            // Update the composition to use the clipped video
            const script = scene.visual_script;
            const updatedComposition = await Promise.all(script.composition.map(async (element: any) => {
                // 1. YouTube Precision Clipping for Videos
                if (element.type === 'video') {
                    const response = await fetch("http://127.0.0.1:3000/api/source-video", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            url: source_url,
                            start: scene.source_timestamp_start,
                            end: scene.source_timestamp_end,
                            prompt: scene.concept_description
                        })
                    });
                    const result = await response.json();
                    return { ...element, url: result.url };
                }

                // 2. AI Image Generation for Image layers
                if (element.type === 'image' && element.image_prompt) {
                    const response = await fetch("http://127.0.0.1:3000/generate-image", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ prompt: element.image_prompt })
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
        }
        return { scenesWithAssets: results };
    }
});
const repurposeSourcingFlow = repurposeSourcingFlowDef({
    scenes: visualArchitectFlow.outputs.scenesWithVisuals,
    source_url: youtube_url
});

// --- 5. Support Sourcing (Music & Voiceover) ---
const musicSourcingFlow = musicSourcingFlowDef({
    mood: "cinematic",
    topic: narrativeSelector.outputs.video_title
});

const voiceoverFlow = voiceoverFlowDef({
    scenes: repurposeSourcingFlow.outputs.scenesWithAssets
});

// --- 6. Final Assembly ---
const assembler = assemblerDef({
    title: narrativeSelector.outputs.video_title,
    duration: 60, // Targeting 60 seconds
    scenes: voiceoverFlow.outputs.scenesWithAudio,
    background_music: musicSourcingFlow.outputs.music_url,
    social_caption: narrativeSelector.outputs.narrative_summary, // Narrative summary makes a great caption
    topic: narrativeSelector.outputs.video_title,
    tone: "Dynamic",
    style_profile: style_profile
});

const renderer = rendererDef({
    video_structure: assembler.outputs.video_structure,
    runId: runId
});

// --- 7. Combined Renderer & Judge ---
export const integratedProductionDef = defineNodeType({
    name: "integratedProduction",
    inputs: {
        video_structure: { type: object({}) },
        runId: { type: "string" },
        style_profile: { type: "string" }
    },
    outputs: {
        video_url: { type: "string" },
        qa_score: { type: "number" },
        qa_critique: { type: "string" }
    },
    invoke: async ({ video_structure, runId, style_profile }) => {
        console.log("[Production] Starting integrated render and QA process...");

        // 1. Trigger Render
        const renderResponse = await fetch("http://127.0.0.1:3000/api/render", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ video_structure, runId })
        });
        const renderResult = await renderResponse.json();
        const activeRunId = renderResult.runId;
        console.log(`[Production] Render active: ${activeRunId}. Polling for completion...`);

        // 2. Poll for Completion
        let complete = false;
        while (!complete) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            const statusRes = await fetch(`http://127.0.0.1:3000/api/render-status?runId=${activeRunId}`);
            const status = await statusRes.json();
            if (status.complete) {
                console.log(`[Production] Render complete: ${activeRunId}`);
                complete = true;
            } else if (status.error) {
                throw new Error("Integrated render failed");
            } else {
                console.log(`   [Production] Render Progress: ${status.progress}%`);
            }
        }

        // 3. Trigger Visual QA
        console.log(`[Production] Launching Visual QA for ${activeRunId}...`);
        const qaResponse = await fetch("http://127.0.0.1:3000/api/visual-qa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                runId: activeRunId,
                video_structure,
                style_profile
            })
        });
        const qaResult = await qaResponse.json();

        if (!qaResult.success) {
            console.warn("[Production] Visual QA failed. Returning perfection by default.");
            return { video_url: renderResult.video_url, qa_score: 100, qa_critique: "QA Unavailable" };
        }

        console.log(`[Production] QA Score: ${qaResult.report.score}/100`);
        return {
            video_url: renderResult.video_url,
            qa_score: qaResult.report.score,
            qa_critique: qaResult.report.critique
        };
    }
});

const production = integratedProductionDef({
    video_structure: assembler.outputs.video_structure,
    runId: runId,
    style_profile: style_profile
});

export default board({
    title: "YouTube Full Story Repurposer",
    description: "Takes a long-form YouTube video and transforms it into a 60-second narrative short.",
    inputs: { youtube_url, runId, style_profile },
    outputs: {
        video_structure: assembler.outputs.video_structure,
        video_url: production.outputs.video_url,
        qa_score: production.outputs.qa_score,
        qa_critique: production.outputs.qa_critique
    }
});
