import React from 'react';
import { AbsoluteFill, Img, useCurrentFrame, interpolate } from 'remotion';
import { SceneElement } from '../AnimationEngine.js';

interface LayoutEngineProps {
    layout: string; // 'fullscreen' | 'split_vertical' | 'montage_grid' | 'polaroid_scatter'
    elements: SceneElement[];
}

// --- Visual Asset Component ---
const Asset: React.FC<{ element: SceneElement; style?: React.CSSProperties }> = ({ element, style }) => {
    return (
        <div style={{
            ...style,
            overflow: 'hidden',
            position: 'absolute',
        }}>
            {element.type === 'image' && (
                <Img
                    src={element.url}
                    onError={(e) => {
                        console.warn(`Failed to load image: ${element.url}`);
                        // Remotion might crash on error, so we can't easily swap src here without state.
                        // But we can try to use a fallback if this relies on standard HTML error handling.
                        // Actually, Remotion's <Img> throws. We should use standard <img> with error handling or just let it fail gracefully?
                        // Better: Use a reliable source. But adding error handling here is good practice.
                        // For now, let's keep it simple but maybe wrap in a try/catch block in the parent if possible?
                        // Actually, standard HTML img tag is safer for error handling than Remotion Img if we want to avoid crash.
                        // Let's swap to standard <img> for safety if we are unsure of source. 
                        // But Remotion <Img> is needed for precise frame sync.
                        // Let's stick to the reliable source fix in server.ts as the primary fix.
                        // But let's add a `continueRenderOnError={true}` prop if available? No.
                        // We will allow the server fix to be the primary solution.
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            )}
        </div>
    );
};

export const LayoutEngine: React.FC<LayoutEngineProps> = ({ layout, elements }) => {
    const frame = useCurrentFrame();

    // --- Layout: Split Vertical (Top/Bottom) ---
    if (layout === 'split_vertical') {
        const topEl = elements[0];
        const bottomEl = elements[1] || elements[0]; // Fallback if only 1 image

        const splitEnter = interpolate(frame, [0, 30], [100, 0], { extrapolateRight: 'clamp' });

        return (
            <AbsoluteFill>
                {/* Top Half */}
                <Asset element={topEl} style={{
                    top: 0, left: 0, width: '100%', height: '50.2%', // +0.2 to avoid gap line
                    transform: `translateY(-${splitEnter}%)`,
                    borderBottom: '4px solid white'
                }} />

                {/* Bottom Half */}
                <Asset element={bottomEl} style={{
                    bottom: 0, left: 0, width: '100%', height: '50.2%',
                    transform: `translateY(${splitEnter}%)`
                }} />
            </AbsoluteFill>
        );
    }

    // --- Layout: Montage Grid (3 images) ---
    if (layout === 'montage_grid') {
        // [ 1 ]
        // [2|3]
        const el1 = elements[0];
        const el2 = elements[1] || el1;
        const el3 = elements[2] || elements[1] || el1;

        return (
            <AbsoluteFill style={{ backgroundColor: 'black', gap: '4px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 2, position: 'relative', width: '100%', overflow: 'hidden' }}>
                    <Asset element={el1} style={{ width: '100%', height: '100%' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', gap: '4px', width: '100%', height: '100%' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Asset element={el2} style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Asset element={el3} style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>
            </AbsoluteFill>
        );
    }

    // --- Layout: Polaroid Scatter ---
    if (layout === 'polaroid_scatter') {
        return (
            <AbsoluteFill style={{ backgroundColor: '#f3f4f6' }}>
                {elements.map((el, idx) => {
                    const rotation = (idx % 2 === 0 ? 1 : -1) * (5 + idx * 3);
                    const enterDelay = idx * 10;
                    const scale = interpolate(frame, [enterDelay, enterDelay + 20], [1.5, 1], { extrapolateRight: 'clamp' });
                    const opacity = interpolate(frame, [enterDelay, enterDelay + 10], [0, 1], { extrapolateRight: 'clamp' });

                    return (
                        <div key={idx} style={{
                            position: 'absolute',
                            top: `${30 + idx * 10}%`,
                            left: `${20 + idx * 10}%`,
                            width: '60%',
                            aspectRatio: '0.8',
                            background: 'white',
                            padding: '15px 15px 60px 15px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                            transform: `rotate(${rotation}deg) scale(${scale})`,
                            opacity,
                            zIndex: idx
                        }}>
                            <Asset element={el} style={{ width: '100%', height: '100%', borderRadius: '4px', position: 'relative' }} />
                        </div>
                    );
                })}
            </AbsoluteFill>
        );
    }

    // --- Layout: Fullscreen (Default) ---
    // With slow Pan/Zoom handled by CameraRig mostly, but we add inner scale here too
    const primary = elements[0];
    if (!primary) return null;

    return (
        <AbsoluteFill>
            <Asset element={primary} style={{ width: '100%', height: '100%' }} />
        </AbsoluteFill>
    );

};
