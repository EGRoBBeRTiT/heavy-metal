'use client';

import { Suspense, type ReactNode } from 'react';

import { AudioPlayerViewProvider } from '@/contexts/AudioPlayerViewProvider';
import { LazyAudioPlayer } from '@/components/AudioPlayer';
import { AudioPlayerContext } from '@/contexts/AudioPlayerProviderContext';
import { useAudioPlayerControl } from '@/hooks/player/useAudioPlayerControl';

interface AudioPlayerProviderProps {
    children: ReactNode;
}

export const AudioPlayerProvider = ({ children }: AudioPlayerProviderProps) => {
    const player = useAudioPlayerControl();

    return (
        <AudioPlayerContext.Provider value={player}>
            <AudioPlayerViewProvider>
                {children}
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyAudioPlayer />
                </Suspense>
            </AudioPlayerViewProvider>
        </AudioPlayerContext.Provider>
    );
};
