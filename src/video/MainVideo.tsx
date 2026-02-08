import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig, interpolate, Audio } from 'remotion';
import React from 'react';
import { AnimationEngine, VisualScript } from './AnimationEngine';

export interface Scene {
    scene_id: number;
    concept_description: string;
    key_takeaway: string;
    duration_sec: number;
    overlay_text?: string;
    visual_script?: VisualScript;
    audio_url?: string;
}

export interface VideoConfig {
    scenes: Scene[];
    total_duration: number;
    title: string;
}

const SceneItem: React.FC<{ scene: Scene }> = ({ scene }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const script = scene.visual_script;

    // Transition Logic
    const transitionStyle = script?.transition_style || 'none';
    let opacity = 1;
    let transform = 'translateY(0)';

    if (transitionStyle === 'fade') {
        opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
    } else if (transitionStyle === 'slide_up') {
        transform = `translateY(${interpolate(frame, [0, 15], [100, 0], { extrapolateRight: 'clamp' })}px)`;
        opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
    } else if (transitionStyle === 'glitch') {
        opacity = frame % 2 === 0 ? 0.8 : 1;
    }

    return (
        <AbsoluteFill style={{ opacity, transform }}>
            {/* Main Animation Engine */}
            <AnimationEngine
                script={scene.visual_script}
                description={scene.concept_description}
                text={scene.overlay_text || scene.key_takeaway}
            />

            {/* Main Scene Audio (Voiceover) */}
            {scene.audio_url && (
                <Audio src={scene.audio_url} />
            )}

            {/* SFX Triggers */}
            {script?.sfx_triggers?.map((sfx, i) => (
                <Sequence key={i} from={sfx.frame}>
                    <Audio src={sfx.url} volume={0.5} />
                </Sequence>
            ))}
        </AbsoluteFill>
    );
};

export const MainVideo: React.FC<VideoConfig> = ({ scenes, title }) => {
    const { fps } = useVideoConfig();
    let currentFrame = 0;

    return (
        <AbsoluteFill style={{ backgroundColor: 'black' }}>
            {scenes.map((scene, index) => {
                const startFrame = currentFrame;
                const durationFrames = Math.round(scene.duration_sec * fps);
                currentFrame += durationFrames;

                return (
                    <Sequence
                        key={scene.scene_id}
                        from={startFrame}
                        durationInFrames={durationFrames}
                    >
                        <SceneItem scene={scene} />
                    </Sequence>
                );
            })}
        </AbsoluteFill>
    );
};
