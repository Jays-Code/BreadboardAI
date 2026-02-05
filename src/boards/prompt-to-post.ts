/**
 * Prompt-to-Post Content Director Graph
 * Refactored for Breadboard 0.35.0 (Build API)
 * Utilizing pure defineNodeType for bridge communication.
 */
import { board, input, output, defineNodeType, array, object } from "@breadboard-ai/build";

// --- 1. Inputs ---
const topic = input({
    title: "Topic",
    description: "The main topic for the content generation",
    default: "The History of House Music"
});

const tone = input({
    title: "Tone",
    description: "The desired tone for the content",
    default: "Educational and upbeat"
});

// --- 2. Director Stage ---
/**
 * Communicates with the Antigravity Bridge to generate a video outline.
 */
export const directorFlowDef = defineNodeType({
    name: "directorFlow",
    inputs: {
        topic: { type: "string" },
        tone: { type: "string" }
    },
    outputs: {
        scenes: { type: array(object({})) },
        total_duration: { type: "number" },
        title: { type: "string" }
    },
    invoke: async ({ topic, tone }) => {
        const response = await fetch("http://localhost:3000/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                task: `Create a video outline for the topic: ${topic} with tone: ${tone}. 
                Output strict JSON with the following structure:
                {
                  "video_title_internal": "string",
                  "estimated_total_duration": number,
                  "scenes": [
                    {
                      "scene_id": number,
                      "concept_description": "visual description",
                      "key_takeaway": "the raw fact",
                      "duration_sec": number
                    }
                  ]
                }
                Ensure there are 3-5 scenes total. The total duration MUST NOT exceed 30 seconds.`,
                persona: "Director",
                model: "antigravity-bridge"
            })
        });
        const result = await response.json();
        const data = result.response;
        return {
            scenes: data.scenes || [],
            total_duration: data.estimated_total_duration || 0,
            title: data.video_title_internal || "Untitled"
        };
    }
});
const directorFlow = directorFlowDef({ topic, tone });

// --- 3. Scene Copywriter Stage ---
/**
 * Processes each scene to add overlay text using the Antigravity Bridge.
 */
export const copywriterFlowDef = defineNodeType({
    name: "copywriterFlow",
    inputs: {
        scenes: { type: array(object({})) }
    },
    outputs: {
        scenesWithText: { type: array(object({})) }
    },
    invoke: async ({ scenes }) => {
        const scenesArray = scenes as any[];
        const results = await Promise.all(scenesArray.map(async (scene) => {
            const response = await fetch("http://localhost:3000/generate", {
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
const copywriterFlow = copywriterFlowDef({ scenes: directorFlow.outputs.scenes });

// --- 4. Social Captioner Stage ---
/**
 * Generates a social media caption for the video.
 */
export const captionerFlowDef = defineNodeType({
    name: "captionerFlow",
    inputs: {
        topic: { type: "string" },
        scenes: { type: array(object({})) }
    },
    outputs: {
        caption: { type: "string" }
    },
    invoke: async ({ topic, scenes }) => {
        const response = await fetch("http://localhost:3000/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                task: `Write a social media caption for a video about "${topic}" with the following scenes: ${JSON.stringify(scenes)}.`,
                persona: "Social Media Manager",
                model: "antigravity-bridge"
            })
        });
        const result = await response.json();
        return { caption: result.response };
    }
});
const captionerFlow = captionerFlowDef({ topic, scenes: directorFlow.outputs.scenes });

// --- 5. Final Assembler ---
/**
 * Combines the video structure into a single output object.
 */
export const assemblerDef = defineNodeType({
    name: "assembler",
    inputs: {
        title: { type: "string" },
        duration: { type: "number" },
        scenes: { type: array(object({})) }
    },
    outputs: {
        video_structure: { type: object({}) }
    },
    invoke: ({ title, duration, scenes }) => ({
        video_structure: {
            video_title_internal: title,
            estimated_total_duration: duration,
            scenes: scenes
        }
    })
});
const assembler = assemblerDef({
    title: directorFlow.outputs.title,
    duration: directorFlow.outputs.total_duration,
    scenes: copywriterFlow.outputs.scenesWithText
});

// --- 6. Export Board ---
export default board({
    title: "Prompt-to-Post Director (Modern API)",
    description: "An autonomous content production pipeline using Antigravity Bridge.",
    inputs: { topic, tone },
    outputs: {
        video_structure: output(assembler.outputs.video_structure, { title: "Video Structure" }),
        social_caption: output(captionerFlow.outputs.caption, { title: "Social Caption" })
    }
});
