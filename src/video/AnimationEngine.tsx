import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from 'remotion';

// --- Primitives ---

const SmartObject: React.FC<{ type: string; label: string; animation: string; position: string }> = ({ type, label, animation, position }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    let transform = '';

    // Animation Logic
    if (animation === 'pulse') {
        const scale = Math.sin(frame / 10) * 0.1 + 1;
        transform = `scale(${scale})`;
    } else if (animation === 'slide') {
        const x = interpolate(frame, [0, fps * 2], [-200, 0], { extrapolateRight: 'clamp' });
        transform = `translateX(${x}px)`;
    } else if (animation === 'spin') {
        transform = `rotate(${frame * 2}deg)`;
    } else if (animation === 'float') {
        const y = Math.sin(frame / 15) * 20;
        transform = `translateY(${y}px)`;
    }

    // Position Logic
    const style: React.CSSProperties = {
        fontSize: type === 'text_large' ? '120px' : '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform,
        width: type === 'image' ? '100%' : 'auto', // Full width for images
        height: type === 'image' ? 'auto' : 'auto'
    };

    if (position === 'bottom') style.alignItems = 'flex-end';
    if (position === 'top') style.alignItems = 'flex-start';

    // Content Rendering
    const content = type === 'image'
        ? <img src={label} style={{ width: '80%', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', imageRendering: 'pixelated' }} />
        : label;

    return (
        <AbsoluteFill style={style}>
            {content}
        </AbsoluteFill>
    );
};

const Particles: React.FC<{ type: string }> = ({ type }) => {
    const frame = useCurrentFrame();
    if (type === 'none') return null;

    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            {[...Array(20)].map((_, i) => {
                const opacity = interpolate(Math.sin((frame + i * 10) / 20), [-1, 1], [0.1, 0.5]);
                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            top: `${(i * 17) % 100}%`,
                            left: `${(i * 23) % 100}%`,
                            width: '10px',
                            height: '10px',
                            backgroundColor: type === 'sparks' ? '#fbbf24' : 'white',
                            borderRadius: '50%',
                            opacity,
                            filter: 'blur(2px)'
                        }}
                    />
                );
            })}
        </AbsoluteFill>
    );
};

// --- Main Engine ---

export interface VisualScript {
    background_color: string;
    primary_element: {
        type: string;
        label: string;
        animation: string;
        position: string;
    };
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
        return <AbsoluteFill style={{ backgroundColor: '#1A1A2E' }} />;
    }

    // Camera Motion
    let cameraTransform = '';
    if (script.camera_motion === 'zoom_in') {
        const scale = interpolate(frame, [0, 900], [1, 1.2]);
        cameraTransform = `scale(${scale})`;
    } else if (script.camera_motion === 'pan_left') {
        const x = interpolate(frame, [0, 900], [0, -100]);
        cameraTransform = `translateX(${x}px)`;
    }

    return (
        <AbsoluteFill style={{ backgroundColor: script.background_color || '#1A1A2E', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', transform: cameraTransform }}>

                {/* Background Particles */}
                <Particles type={script.particles} />

                {/* Main Visual Element */}
                {script.primary_element && (
                    <SmartObject
                        type={script.primary_element.type}
                        label={script.primary_element.label}
                        animation={script.primary_element.animation}
                        position={script.primary_element.position}
                    />
                )}

            </div>
        </AbsoluteFill>
    );
};
