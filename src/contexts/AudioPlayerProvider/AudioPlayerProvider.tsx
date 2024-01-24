'use client';

/* eslint-disable jsx-a11y/media-has-caption */

import type { MutableRefObject, ReactNode } from 'react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import cnBind from 'classnames/bind';

import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import type { Song } from '@/shared/albums';
import { LocalStorageItem } from '@/types/LocalStorageItem.types';

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
    audioRef: MutableRefObject<HTMLAudioElement | null>;
    duration: number;
    setDuration?: (dur: number) => void;
    handleChangeCurrentTime: (time?: number) => void;
    handleChangeVolume: (volume?: number) => void;
    handleSetTrackIndex: (index: number) => void;
    handleUpdateSessionMetaData: () => void;
}

const AudioPlayerContext = createContext({} as AudioPlayerContextProps);

export const useAudioPlayerContext = () => useContext(AudioPlayerContext);

interface AudioPlayerProviderProps {
    children: ReactNode;
}

export const AudioPlayerProvider = ({ children }: AudioPlayerProviderProps) => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const player = useAudioPlayer(audioRef);

    useEffect(() => {
        if (dataLoaded) {
            const playedSeconds = localStorage.getItem(
                LocalStorageItem.PLAYED_SECONDS,
            );

            if (playedSeconds && audioRef.current) {
                audioRef.current.currentTime = +playedSeconds;
            }
        }
    }, [dataLoaded]);

    return (
        <AudioPlayerContext.Provider value={player}>
            {children}
            <audio
                ref={audioRef}
                className={cx('audio')}
                hidden
                aria-hidden
                onPlay={() => {
                    player.setIsPlaying(true);
                }}
                onPause={() => {
                    player.setIsPlaying(false);
                }}
                preload="auto"
                onLoadedMetadata={() => {
                    player.setDuration(audioRef.current?.duration ?? 0);
                }}
                onLoadedData={() => {
                    player.handleUpdateSessionMetaData();
                    setDataLoaded(true);
                }}
                onEnded={() => {
                    player.handleNextTrack();
                }}

                // loop
            >
                <p>
                    Ваш браузер не поддерживает HTML5 аудио. Вот взамен
                    <a href={player.activeTrack?.src}>ссылка на аудио</a>
                </p>
            </audio>
        </AudioPlayerContext.Provider>
    );
};
