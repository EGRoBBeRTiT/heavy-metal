'use client';

/* eslint-disable jsx-a11y/media-has-caption */

import type { ReactNode } from 'react';
import { createContext, useContext, useRef } from 'react';
import cnBind from 'classnames/bind';

import type { Song } from '@/hooks/useAudioPlayer';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

import styles from './AudioPlayerProvider.module.scss';

const cx = cnBind.bind(styles);

export interface AudioPlayerContextProps {
    setSongsList: (songs: Song[]) => void;
    handlePrevTrack: () => void;
    handleNextTrack: () => void;
    handleSeekForward: () => void;
    handleSeekBackward: () => void;
    setIsPlaying: (playing: boolean) => void;
    handleTogglePlaying: () => void;
    songsList: Song[];
    activeTrackIndex: number;
    isPlaying: boolean;
    activeTrack: Song | null;
}

const AudioPlayerContext = createContext({} as AudioPlayerContextProps);

export const useAudioPlayerContext = () => useContext(AudioPlayerContext);

interface AudioPlayerProviderProps {
    children: ReactNode;
}

export const AudioPlayerProvider = ({ children }: AudioPlayerProviderProps) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const audioPlayerConfig = useAudioPlayer(audioRef);

    return (
        <AudioPlayerContext.Provider value={audioPlayerConfig}>
            {children}
            <audio
                ref={audioRef}
                className={cx('audio')}
                hidden
                aria-hidden
                src={audioPlayerConfig.activeTrack?.src}
                onPlay={() => {
                    navigator.mediaSession.playbackState = 'playing';

                    audioPlayerConfig.setIsPlaying(true);
                }}
                onPause={() => {
                    navigator.mediaSession.playbackState = 'paused';

                    audioPlayerConfig.setIsPlaying(false);
                }}
                autoPlay={audioPlayerConfig.isPlaying}
                onEnded={() => {
                    audioPlayerConfig.handleNextTrack();
                    audioPlayerConfig.setIsPlaying(true);
                }}
            />
        </AudioPlayerContext.Provider>
    );
};
