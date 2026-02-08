import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

interface CameraRigProps {
    children: React.ReactNode;
    type?: string; // 'handheld' | 'zoom_in' | 'pan_left' | 'static' | 'snap_zoom'
}

export const CameraRig: React.FC<CameraRigProps> = ({ children, type = 'handheld' }) => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    let transform = '';

    // 1. Handheld Shake (Simulated Noise)
    // We sum a few sine waves to create non-repetitive "organic" motion
    const shakeX = Math.sin(frame / 10) * 2 + Math.cos(frame / 25) * 2 + Math.sin(frame / 50) * 4;
    const shakeY = Math.cos(frame / 12) * 2 + Math.sin(frame / 22) * 2 + Math.cos(frame / 45) * 4;
    const rotation = Math.sin(frame / 80) * 0.5; // Slight rotation

    // 2. Motion Paths
    if (type === 'zoom_in') {
        const scale = interpolate(frame, [0, 300], [1, 1.15]);
        transform = `scale(${scale}) translate(${shakeX}px, ${shakeY}px) rotate(${rotation}deg)`;
    }
    else if (type === 'pan_left') {
        const x = interpolate(frame, [0, 300], [0, -60]);
        transform = `translateX(${x}px) scale(1.05) translate(${shakeX}px, ${shakeY}px) rotate(${rotation}deg)`;
    }
    else if (type === 'snap_zoom') {
        // Fast zoom in at the start, then slow drift
        const zoom = spring({
            frame,
            fps,
            config: { damping: 12, stiffness: 100 }
        });
        const scale = interpolate(zoom, [0, 1], [1, 1.2]);
        transform = `scale(${scale}) translate(${shakeX}px, ${shakeY}px) rotate(${rotation}deg)`;
    }
    else if (type === 'handheld') {
        // Just the shake, slightly zoomed to avoid edges
        transform = `scale(1.02) translate(${shakeX}px, ${shakeY}px) rotate(${rotation}deg)`;
    }

    return (
        <AbsoluteFill style={{ overflow: 'hidden', backgroundColor: '#000' }}>
            <div style={{
                width: '100%',
                height: '100%',
                transform: transform,
                transformOrigin: 'center center'
            }}>
                {children}
            </div>
            {/* Vignette Overlay for cinematic feel */}
            <AbsoluteFill style={{
                background: 'radial-gradient(circle, transparent 60%, rgba(0,0,0,0.4) 100%)',
                pointerEvents: 'none',
                zIndex: 999
            }} />
        </AbsoluteFill>
    );
};
