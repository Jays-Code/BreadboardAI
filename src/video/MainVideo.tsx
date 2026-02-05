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

    const opacity = spring({
        frame,
        fps,
        config: {
            damping: 200,
        },
    });

    const scale = interpolate(frame, [0, 20], [0.8, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill>
            {/* Dynamic Background Animation */}
            <AnimationEngine
                script={scene.visual_script}
                description={scene.concept_description}
            />

            {/* Audio Layer */}
            {scene.audio_url && (
                <Audio src={scene.audio_url} />
            )}

            {/* Cinematic Captions Layer */}
            <AbsoluteFill style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'column',
                padding: '60px',
                color: 'white',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                pointerEvents: 'none'
            }}>
                <div style={{
                    opacity,
                    transform: `translateY(${interpolate(frame, [0, 20], [20, 0])}px)`,
                    textAlign: 'center',
                    width: '100%',
                    paddingBottom: '40px'
                }}>
                    <div style={{
                        display: 'inline-block',
                        background: 'rgba(0,0,0,0.85)',
                        padding: '16px 32px',
                        borderRadius: '16px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <p style={{
                            fontSize: '44px',
                            fontWeight: 900,
                            margin: 0,
                            lineHeight: 1.1,
                            letterSpacing: '-0.03em',
                            color: '#fff',
                            textTransform: 'uppercase'
                        }}>
                            {scene.overlay_text || scene.key_takeaway}
                        </p>
                    </div>
                </div>
            </AbsoluteFill>
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

            {/* Title Overlay (Simple) */}
            <AbsoluteFill style={{ pointerEvents: 'none' }}>
                <div style={{
                    position: 'absolute',
                    top: 50,
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    fontSize: '24px',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    opacity: 0.3,
                    color: 'white'
                }}>
                    {title}
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
