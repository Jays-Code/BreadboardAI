import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, random } from 'remotion';

// --- Vignette & Chromatic Aberration ---
export const Vignette: React.FC = () => {
    return (
        <AbsoluteFill style={{
            background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.4) 100%)',
            pointerEvents: 'none',
            zIndex: 100,
        }} />
    );
};

// --- Film Grain ---
export const FilmGrain: React.FC = () => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
            opacity: 0.08,
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
            zIndex: 101,
            transform: `scale(1.2) translate(${(random(frame) - 0.5) * 20}px, ${(random(frame + 1) - 0.5) * 20}px)`
        }} />
    );
};

// --- Glitch Effect (Overlay) ---
export const GlitchOverlay: React.FC<{ active: boolean }> = ({ active }) => {
    const frame = useCurrentFrame();
    if (!active) return null;

    // Only glitch on certain frames or for a duration
    const isGlitching = random(frame) > 0.85;
    if (!isGlitching) return null;

    const offset = (random(frame + 2) - 0.5) * 30;

    return (
        <AbsoluteFill style={{
            zIndex: 102,
            pointerEvents: 'none',
        }}>
            {/* Red Channel Shift */}
            <AbsoluteFill style={{
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                mixBlendMode: 'screen',
                transform: `translateX(${offset}px)`
            }} />
            {/* Cyan Channel Shift */}
            <AbsoluteFill style={{
                backgroundColor: 'rgba(0, 255, 255, 0.1)',
                mixBlendMode: 'screen',
                transform: `translateX(${-offset}px)`
            }} />
            {/* Scanlines or block distortion can be added here */}
            <div style={{
                position: 'absolute',
                top: `${random(frame + 3) * 100}%`,
                height: '10px',
                width: '100%',
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'invert(1)',
            }} />
        </AbsoluteFill>
    );
};
