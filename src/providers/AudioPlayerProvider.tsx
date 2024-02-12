'use client';

import { Suspense, type ReactNode, useEffect } from 'react';

import { LazyAudioPlayer } from '@/components/AudioPlayer';
import { AudioPlayerContext } from '@/contexts/AudioPlayerProviderContext';
import { useAudioPlayerControl } from '@/hooks/player/useAudioPlayerControl';
import { AudioPlayerSkeleton } from '@/components/AudioPlayer/AudioPlayerSkeleton';
import { useAudioPlayerView } from '@/contexts/AudioPlayerViewProvider';
import { useScreenConfig } from '@/contexts/ScreenConfigProvider';

interface AudioPlayerProviderProps {
    children: ReactNode;
}

const AudioPlayerProvider = ({ children }: AudioPlayerProviderProps) => {
    const player = useAudioPlayerControl();
    const { view, setView } = useAudioPlayerView();
    const { isMobile, isTablet } = useScreenConfig();

    useEffect(() => {
        if (isMobile || isTablet) {
            setView('mobile');
        } else {
            setView('full');
        }
    }, [isMobile, isTablet, setView]);

    return (
        <AudioPlayerContext.Provider value={player}>
            {children}
            {view !== 'full' && (
                <Suspense fallback={<AudioPlayerSkeleton isMobile />}>
                    <LazyAudioPlayer />
                </Suspense>
            )}
        </AudioPlayerContext.Provider>
    );
};

export default AudioPlayerProvider;
