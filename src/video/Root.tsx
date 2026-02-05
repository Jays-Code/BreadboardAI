import { Composition } from 'remotion';
import { MainVideo } from './MainVideo';
import React from 'react';

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="Main"
                component={MainVideo}
                durationInFrames={900} // Default 30s at 30fps
                fps={30}
                width={1080}
                height={1920} // Vertical 9:16
                defaultProps={{
                    scenes: [],
                    total_duration: 30,
                    title: "Default Video"
                }}
            />
        </>
    );
};
