import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

interface KineticTextProps {
    text: string;
    style?: 'word_pop' | 'karaoke' | 'cinematic_fade' | 'box_highlight';
    alignment?: 'center' | 'bottom';
    timestamps?: { word: string; startOffsetMs: number; durationMs: number }[];
}

const FONTS = {
    bold: 'Inter, system-ui, -apple-system, sans-serif',
    marker: 'Comic Sans MS, cursive' // Placeholder for handwriting
};

export const KineticText: React.FC<KineticTextProps> = ({ text, style = 'word_pop', alignment = 'center', timestamps }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const words = text.split(' ');

    const containerStyle: React.CSSProperties = {
        fontFamily: FONTS.bold,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: alignment === 'bottom' ? 'flex-end' : 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '60px',
        paddingBottom: alignment === 'bottom' ? '150px' : '60px' // Leave room for UI
    };

    // --- Style: Word Pop ---
    if (style === 'word_pop') {
        return (
            <AbsoluteFill style={containerStyle}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                    {words.map((word, i) => {
                        // Use timestamps if available, otherwise fallback to index-based stagger
                        const ts = timestamps?.[i];
                        const startFrame = ts ? Math.floor((ts.startOffsetMs / 1000) * fps) : i * 10;

                        const progress = spring({
                            frame: frame - startFrame,
                            fps,
                            config: { damping: 15, stiffness: 120 }
                        });

                        if (frame < startFrame) return null;

                        return (
                            <span key={i} style={{
                                fontSize: '80px',
                                fontWeight: 900,
                                color: 'white',
                                textShadow: '4px 4px 0px #000',
                                transform: `scale(${progress})`,
                                opacity: interpolate(progress, [0, 1], [0, 1])
                            }}>
                                {word}
                            </span>
                        );
                    })}
                </div>
            </AbsoluteFill>
        );
    }

    // --- Style: Karaoke ---
    if (style === 'karaoke') {
        return (
            <AbsoluteFill style={containerStyle}>
                <div style={{ maxWidth: '90%' }}>
                    {words.map((word, i) => {
                        const ts = timestamps?.[i];
                        const activeStart = ts ? Math.floor((ts.startOffsetMs / 1000) * fps) : i * 12;
                        const duration = ts ? Math.floor((ts.durationMs / 1000) * fps) : 12;
                        const activeEnd = activeStart + duration;

                        const isActive = frame >= activeStart && frame < activeEnd;
                        const isPast = frame >= activeEnd;

                        const scale = isActive ? 1.3 : 1.0;
                        const color = isActive ? '#fbbf24' : (isPast ? 'white' : 'rgba(255,255,255,0.4)');

                        return (
                            <span key={i} style={{
                                fontSize: '60px',
                                fontWeight: 800,
                                margin: '0 10px',
                                color: color,
                                textShadow: isActive ? '0 0 25px rgba(251, 191, 36, 0.6)' : '2px 2px 4px rgba(0,0,0,0.5)',
                                display: 'inline-block',
                                transform: `scale(${scale})`,
                                transition: 'all 0.05s linear'
                            }}>
                                {word}
                            </span>
                        );
                    })}
                </div>
            </AbsoluteFill>
        );
    }

    // --- Style: Box Highlight ---
    // Text inside a dynamic box
    if (style === 'box_highlight') {
        const enter = spring({ frame, fps, config: { damping: 12 } });
        return (
            <AbsoluteFill style={containerStyle}>
                <div style={{
                    background: '#7c3aed', // Violet
                    padding: '20px 40px',
                    borderRadius: '20px',
                    transform: `scale(${enter}) rotate(-2deg)`,
                    boxShadow: '10px 10px 0px #000'
                }}>
                    <h1 style={{
                        color: 'white',
                        fontSize: '50px',
                        margin: 0,
                        textTransform: 'uppercase',
                        lineHeight: 1.1
                    }}>
                        {text}
                    </h1>
                </div>
            </AbsoluteFill>
        );
    }

    // Default: Cinematic Fade
    return (
        <AbsoluteFill style={{ ...containerStyle, paddingBottom: '100px' }}>
            <h1 style={{
                color: 'white',
                fontSize: '48px',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                opacity: interpolate(frame, [0, 30], [0, 1]),
                transform: `translateY(${interpolate(frame, [0, 30], [20, 0])}px)`
            }}>
                {text}
            </h1>
        </AbsoluteFill>
    );
};
