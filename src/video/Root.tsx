import { Composition } from 'remotion';
import { MainVideo } from './MainVideo';
import React from 'react';

const TestScenes = [
    {
        "scene_id": 1,
        "concept_description": "High energy intro",
        "key_takeaway": "WAKE UP!",
        "duration_sec": 3,
        "overlay_text": "WAKE UP!",
        "visual_script": {
            "ambient_mood": "energetic",
            "background_color": "#FF4500",
            "layout_style": "fullscreen",
            "typography_style": "word_pop",
            "energy_level": "high",
            "camera_motion": "snap_zoom",
            "particles": "sparks",
            "composition": [
                {
                    "type": "image",
                    "url": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1080",
                    "depth": 1,
                    "zIndex": 10
                }
            ]
        }
    },
    {
        "scene_id": 2,
        "concept_description": "Split screen comparison",
        "key_takeaway": "OLD vs NEW",
        "duration_sec": 4,
        "overlay_text": "OLD vs NEW",
        "visual_script": {
            "ambient_mood": "tech",
            "background_color": "#000000",
            "layout_style": "split_vertical",
            "typography_style": "box_highlight",
            "energy_level": "chill",
            "particles": "dust",
            "composition": [
                {
                    "type": "image",
                    "url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
                    "depth": 1,
                    "zIndex": 10
                },
                {
                    "type": "image",
                    "url": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
                    "depth": 1,
                    "zIndex": 10
                }
            ]
        }
    }
];

export const RemotionRoot: React.FC = () => {
    // We expect scenes and total_duration to be passed via props
    const defaultData = {
        scenes: TestScenes,
        total_duration: 10,
        title: "Visual Test"
    };

    // Calculate duration from props if possible
    // In Remotion, durationInFrames must be a constant at the Root level 
    // but can be adjusted via props when rendering.
    // However, for the CLI to know the duration, we should ideally 
    // look it up from the input props file.

    return (
        <Composition
            id="Main"
            component={MainVideo}
            durationInFrames={900} // Set a safe max (30s), MainVideo will clip based on content
            fps={30}
            width={1080}
            height={1920}
            defaultProps={defaultData}
        />
    );
};
