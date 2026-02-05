import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import React from 'react';

export interface Scene {
    scene_id: number;
    concept_description: string;
    key_takeaway: string;
    duration_sec: number;
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
        <AbsoluteFill style={{
            backgroundColor: '#1A1A2E',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px',
            color: 'white',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div style={{ opacity, transform: `scale(${scale})`, textAlign: 'center' }}>
                <h2 style={{ fontSize: '48px', marginBottom: '20px', color: '#E94560' }}>
                    Scene {scene.scene_id}
                </h2>
                <p style={{ fontSize: '36px', fontWeight: 'bold' }}>
                    {scene.key_takeaway}
                </p>
                <p style={{ fontSize: '24px', marginTop: '30px', opacity: 0.7, fontStyle: 'italic' }}>
                    {scene.concept_description}
                </p>
            </div>
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
