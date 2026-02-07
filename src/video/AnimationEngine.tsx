import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from 'remotion';

// --- Primitives ---

const Environment: React.FC<{ mood?: string; color: string; cameraMotion: string }> = ({ mood, color, cameraMotion }) => {
    const frame = useCurrentFrame();

    // Parallax logic for background
    let offsetX = 0;
    if (cameraMotion === 'pan_left') {
        offsetX = interpolate(frame, [0, 300], [0, -20]); // Slower than foreground for depth
    }

    const backgroundStyle: React.CSSProperties = {
        position: 'absolute',
        inset: '-10%', // Bleed for parallax
        backgroundColor: color,
        background: `radial-gradient(circle at ${50 + Math.sin(frame / 20) * 10}% ${50 + Math.cos(frame / 25) * 10}%, ${color} 0%, #000 100%)`,
        transform: `translateX(${offsetX}px)`,
    };

    return <AbsoluteFill style={backgroundStyle} />;
};

export interface MotionPath {
    type: 'linear' | 'ease' | 'none';
    start_pos: { x: number; y: number; scale: number };
    end_pos: { x: number; y: number; scale: number };
}

const Sprite: React.FC<{
    url: string;
    path?: MotionPath;
    zIndex: number;
    depth?: number; // 1 = Foreground, 0.5 = Midground
}> = ({ url, path, zIndex, depth = 1 }) => {
    const frame = useCurrentFrame();

    let x = 0;
    let y = 0;
    let scale = 1;

    if (path && path.type !== 'none') {
        x = interpolate(frame, [0, 150], [path.start_pos.x, path.end_pos.x], { extrapolateRight: 'clamp' });
        y = interpolate(frame, [0, 150], [path.start_pos.y, path.end_pos.y], { extrapolateRight: 'clamp' });
        scale = interpolate(frame, [0, 150], [path.start_pos.scale, path.end_pos.scale], { extrapolateRight: 'clamp' });
    }

    // Add a natural idle float
    const floatY = Math.sin(frame / 20) * 10 * depth;

    return (
        <div style={{
            position: 'absolute',
            left: `${50 + x}%`,
            top: `${50 + y}%`,
            width: `${80 * scale * depth}%`,
            transform: `translate(-50%, -50%) translateY(${floatY}px)`,
            zIndex,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <img
                src={url}
                style={{
                    maxWidth: '100%',
                    maxHeight: '80vh',
                    borderRadius: '24px',
                    boxShadow: `0 ${20 * depth}px ${50 * depth}px rgba(0,0,0,0.8)`,
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
            />
        </div>
    );
};

const Particles: React.FC<{ type: string }> = ({ type }) => {
    const frame = useCurrentFrame();
    if (type === 'none') return null;

    return (
        <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 15 }}>
            {[...Array(25)].map((_, i) => {
                const opacity = interpolate(Math.sin((frame + i * 12) / 25), [-1, 1], [0.1, 0.4]);
                const y = ((frame * 0.5 + i * 40) % 110) - 10;
                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            top: `${y}%`,
                            left: `${(i * 31) % 100}%`,
                            width: '8px',
                            height: '8px',
                            backgroundColor: type === 'sparks' ? '#fbbf24' : 'rgba(255,255,255,0.6)',
                            borderRadius: '50%',
                            opacity,
                            filter: 'blur(3px)',
                            transform: `scale(${1 + Math.sin(frame / 10 + i) * 0.2})`
                        }}
                    />
                );
            })}
        </AbsoluteFill>
    );
};

// --- Main Engine ---

export interface SceneElement {
    type: 'image' | 'text';
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
    camera_motion: string;
}

interface AnimationEngineProps {
    script?: VisualScript;
    description: string; // Fallback
}

export const AnimationEngine: React.FC<AnimationEngineProps> = ({ script, description }) => {
    const frame = useCurrentFrame();

    // If we don't have a script (old data), fallback to basic colors
    if (!script) {
        return <AbsoluteFill style={{ backgroundColor: '#0a0a1a' }} />;
    }

    // Camera Motion (Master Scale/Pan)
    let cameraTransform = '';
    if (script.camera_motion === 'zoom_in') {
        const scale = interpolate(frame, [0, 300], [1, 1.15]);
        cameraTransform = `scale(${scale})`;
    } else if (script.camera_motion === 'pan_left') {
        const x = interpolate(frame, [0, 300], [0, -60]);
        cameraTransform = `translateX(${x}px) scale(1.05)`;
    }

    return (
        <AbsoluteFill style={{ backgroundColor: '#000', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', transform: cameraTransform }}>

                {/* Layer 1: Environment (Static-ish Background) */}
                <Environment
                    mood={script.ambient_mood}
                    color={script.background_color || '#1A1A2E'}
                    cameraMotion={script.camera_motion}
                />

                {/* Layer 2: Composed Sprites (Dynamic Stage) */}
                {script.composition && script.composition.map((el, idx) => (
                    <Sprite
                        key={idx}
                        url={el.url}
                        path={el.motion}
                        zIndex={el.zIndex || (10 + idx)}
                        depth={el.depth}
                    />
                ))}

                {/* Layer 3: Overlay Particles (Foreground) */}
                <Particles type={script.particles} />

            </div>
        </AbsoluteFill>
    );
};
