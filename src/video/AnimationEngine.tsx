import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig, Audio } from 'remotion';
import { CameraRig } from './components/CameraRig';
import { LayoutEngine } from './components/LayoutEngine';
import { KineticText } from './components/KineticText';
import { Vignette, FilmGrain, GlitchOverlay } from './components/PolishPass';

// --- Primitives ---

const Environment: React.FC<{ mood?: string; color: string }> = ({ mood, color }) => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{
            background: `radial-gradient(circle at ${50 + Math.sin(frame / 60) * 20}% ${50 + Math.cos(frame / 50) * 20}%, ${color} 0%, #000 100%)`,
        }} />
    );
};

export interface MotionPath {
    type: 'linear' | 'ease' | 'none';
    start_pos: { x: number; y: number; scale: number };
    end_pos: { x: number; y: number; scale: number };
}

export interface SceneElement {
    type: 'image' | 'video';
    url: string;
    depth: number; // 0 to 1
    motion?: MotionPath;
    zIndex: number;
}

export interface VisualScript {
    ambient_mood?: string;
    background_color: string;
    composition: SceneElement[];
    particles: string;

    // Modern Aesthetic Modules
    layout_style: 'fullscreen' | 'split_vertical' | 'montage_grid' | 'polaroid_scatter';
    typography_style: 'word_pop' | 'karaoke' | 'cinematic_fade' | 'box_highlight';
    energy_level: 'high' | 'chill';

    // Advanced "Detailed Implementation" Features
    transition_style?: 'fade' | 'glitch' | 'slide_up' | 'none';
    sfx_triggers?: { frame: number; url: string }[];
}

interface AnimationEngineProps {
    script?: VisualScript;
    description: string;
    text?: string; // Passed from MainVideo
    timestamps?: { word: string; startOffsetMs: number; durationMs: number }[];
}

export const AnimationEngine: React.FC<AnimationEngineProps> = ({ script, description, text, timestamps }) => {

    // Fallback for old data or missing script
    if (!script) {
        return (
            <AbsoluteFill style={{ backgroundColor: '#0a0a1a', justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ color: 'white' }}>{description}</h1>
            </AbsoluteFill>
        );
    }

    // Determine Camera Motion based on Energy
    const cameraType = script.energy_level === 'high' ? 'snap_zoom' : 'handheld';

    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>

            {/* 1. Global Camera Rig */}
            <CameraRig type={cameraType}>

                {/* 2. Dynamic Background */}
                <Environment mood={script.ambient_mood} color={script.background_color} />

                {/* 3. Layout Engine (Handles Assets) */}
                <LayoutEngine
                    layout={script.layout_style || 'fullscreen'}
                    elements={script.composition || []}
                />

                {/* 4. Polish Pass Overlays */}
                <Vignette />
                <FilmGrain />
                <GlitchOverlay active={script.energy_level === 'high'} />

            </CameraRig>

            {/* 5. Kinetic Text (Overlay on top of camera or inside? Let's keep it steady for readability but styled) 
                Actually, putting it OUTSIDE CameraRig keeps it readable while bg shakes. 
                But for "High Energy", text usually shakes too. 
                Let's put it OUTSIDE for now for safety/readability.
            */}
            {text && (
                <KineticText
                    text={text}
                    style={script.typography_style || 'cinematic_fade'}
                    alignment="bottom"
                    timestamps={timestamps}
                />
            )}

        </AbsoluteFill>
    );
};
