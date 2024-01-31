'use client';

import { Suspense, type ReactNode } from 'react';
// import cnBind from 'classnames/bind';

// import { LocalStorageItem } from '@/types/LocalStorageItem.types';
import { AudioPlayerViewProvider } from '@/contexts/AudioPlayerViewProvider';
import { LazyAudioPlayer } from '@/components/AudioPlayer';
import { AudioPlayerContext } from '@/contexts/AudioPlayerProviderContext';
import { useAudioPlayerControl } from '@/hooks/player/useAudioPlayerControl';

// import styles from './AudioPlayerProvider.module.scss';

// const cx = cnBind.bind(styles);

interface AudioPlayerProviderProps {
    children: ReactNode;
}

export const AudioPlayerProvider = ({ children }: AudioPlayerProviderProps) => {
    // const [dataLoaded, setDataLoaded] = useState(false);

    const player = useAudioPlayerControl();

    // const { handlePlay, setIsPlaying } = player;

    // useEffect(() => {
    //     if (dataLoaded) {
    //         const playedSeconds = localStorage.getItem(
    //             LocalStorageItem.PLAYED_SECONDS,
    //         );

    //         if (playedSeconds && audioRef.current) {
    //             audioRef.current.currentTime = +playedSeconds;
    //         }
    //     }
    // }, [dataLoaded, handlePlay, setIsPlaying]);

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
