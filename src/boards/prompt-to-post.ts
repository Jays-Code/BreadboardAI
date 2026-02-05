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
    metadata: {
        title: "Director",
        description: "The 'brain' of the board; coordinates logic and directs other components."
    },
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
                task: `Create a video script for the topic: ${topic} with tone: ${tone}.
                Follow a NARRATIVE ARC structure across exactly 4 scenes:
                1. THE HOOK: Grab attention with a striking fact or problem.
                2. THE JOURNEY: Develop the story, provide evidence or history.
                3. THE CLIMAX: The core insight, solution, or big reveal.
                4. THE OUTRO: Summary and conclusion.

                Output strict JSON with the following structure:
                {
                  "video_title_internal": "string",
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
    metadata: {
        title: "Copywriter",
        description: "Drafting engine that writes high-quality scripts or long-form content."
    },
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

// --- 4. Visual Architect Stage ---
/**
 * Transforms descriptions into detailed Visual Scripts for Remotion.
 */
export const visualArchitectFlowDef = defineNodeType({
    name: "visualArchitectFlow",
    metadata: {
        title: "Visual Architect Flow",
        description: "Acts as a Motion Designer, defining the visual style, animations, and assets for each scene."
    },
    inputs: {
        scenes: { type: array(object({})) },
        tone: { type: "string" }
    },
    outputs: {
        scenesWithVisuals: { type: array(object({})) }
    },
    invoke: async ({ scenes, tone }) => {
        const scenesArray = scenes as any[];
        const results = await Promise.all(scenesArray.map(async (scene) => {
            const response = await fetch("http://localhost:3000/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    task: `Act as a Motion Designer. Transform this scene description into a detailed multi-layer Visual Script JSON for Remotion.
                    
                    Description: "${scene.concept_description}"
                    Phase: "${(scene as any).arc_phase}"
                    Tone: "${tone}"

                    Design the scene in LAYERS:
                    1. Background: The environment/mood.
                    2. Primary: The main subject (should be a detailed image prompt).
                    3. Particles/Camera: To add depth.

                    Output strict JSON with this exact structure:
                    {
                      "background_color": "hex string",
                      "primary_element": {
                        "type": "image",
                        "image_prompt": "highly detailed descriptive prompt for this specific scene's subject",
                        "animation": "pulse | slide | spin | float",
                        "position": "center | bottom | top"
                      },
                      "particles": "none | dust | sparks | bubbles",
                      "camera_motion": "none | zoom_in | pan_left"
                    }
                    No other text. Just the JSON object.`,
                    persona: "Visual Designer",
                    model: "antigravity-bridge"
                })
            });
            const result = await response.json();
            return { ...scene, visual_script: result.response };
        }));
        return { scenesWithVisuals: results };
    }
});
const visualArchitectFlow = visualArchitectFlowDef({
    scenes: copywriterFlow.outputs.scenesWithText,
    tone: tone
});

// --- 5. Asset Sourcing Stage ---
/**
 * Generates actual image assets for scenes that request them.
 */
export const assetSourcingFlowDef = defineNodeType({
    name: "assetSourcingFlow",
    metadata: {
        title: "Asset Sourcing Flow",
        description: "Fetches or generates the actual image assets requested by the Visual Architect."
    },
    inputs: {
        scenes: { type: array(object({})) }
    },
    outputs: {
        scenesWithAssets: { type: array(object({})) }
    },
    invoke: async ({ scenes }) => {
        const scenesArray = scenes as any[];
        const results = await Promise.all(scenesArray.map(async (scene) => {
            const script = scene.visual_script;
            if (script && script.primary_element && script.primary_element.type === 'image' && script.primary_element.image_prompt) {
                // Call Bridge to generate image
                const response = await fetch("http://localhost:3000/generate-image", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        prompt: script.primary_element.image_prompt
                    })
                });
                const result = await response.json();

                // Update the visual script with the generated asset URL
                const updatedScript = {
                    ...script,
                    primary_element: {
                        ...script.primary_element,
                        label: result.url // The label becomes the URL for type='image'
                    }
                };
                return { ...scene, visual_script: updatedScript };
            }
            return scene; // No change if no image needed
        }));
        return { scenesWithAssets: results };
    }
});
const assetSourcingFlow = assetSourcingFlowDef({ scenes: visualArchitectFlow.outputs.scenesWithVisuals });


// --- 6. Social Captioner Stage ---
/**
 * Generates a social media caption for the video.
 */
export const captionerFlowDef = defineNodeType({
    name: "captionerFlow",
    metadata: {
        title: "Captioner Flow",
        description: "Creative engine that generates social media captions and post text."
    },
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

// --- 7. Voiceover Stage ---
/**
 * Generates audio voiceovers for each scene.
 */
export const voiceoverFlowDef = defineNodeType({
    name: "voiceoverFlow",
    metadata: {
        title: "Voiceover Flow",
        description: "Generates AI voiceovers (TTS) for each scene's script."
    },
    inputs: {
        scenes: { type: array(object({})) }
    },
    outputs: {
        scenesWithAudio: { type: array(object({})) }
    },
    invoke: async ({ scenes }) => {
        const scenesArray = scenes as any[];
        const results = await Promise.all(scenesArray.map(async (scene) => {
            // Use key_takeaway or overlay_text for the voiceover script
            const scriptText = scene.key_takeaway || scene.overlay_text || "";
            if (!scriptText) return scene;

            const response = await fetch("http://localhost:3000/generate-audio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: scriptText,
                    voice: "alloy" // Default voice
                })
            });
            const result = await response.json();
            return { ...scene, audio_url: result.url };
        }));
        return { scenesWithAudio: results };
    }
});
const voiceoverFlow = voiceoverFlowDef({ scenes: assetSourcingFlow.outputs.scenesWithAssets });

// --- 8. Final Assembler ---
/**
 * Combines the video structure into a single output object.
 */
export const assemblerDef = defineNodeType({
    name: "assembler",
    metadata: {
        title: "Assembler",
        description: "Combines various outputs into a single, cohesive final package."
    },
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
    scenes: voiceoverFlow.outputs.scenesWithAudio
});

// --- 8. Video Renderer ---
/**
 * Triggers the Remotion render on the Bridge Server.
 */
export const rendererDef = defineNodeType({
    name: "renderer",
    metadata: {
        title: "Renderer",
        description: "Sends the final video structure to the Bridge Server to trigger the Remotion render."
    },
    inputs: {
        video_structure: { type: object({}) },
    },
    outputs: {
        video_url: { type: "string" }
    },
    invoke: async ({ video_structure }) => {
        const response = await fetch("http://localhost:3000/api/render", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                video_structure: video_structure
            })
        });
        const result = await response.json();
        return { video_url: result.video_url };
    }
});
const renderer = rendererDef({ video_structure: assembler.outputs.video_structure });

// --- Graph Export ---
export default board({
    title: "Prompt to Video Post",
    description: "Converts a topic into a Remotion-ready video structure and renders it.",
    inputs: { topic, tone },
    outputs: {
        video_structure: assembler.outputs.video_structure,
        video_url: renderer.outputs.video_url
    }
});
