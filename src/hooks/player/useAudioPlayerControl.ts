/* eslint-disable no-console */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useAlbums } from '@/contexts/StoreProvider';
import { useTrackIndexFromLocalStorage } from '@/hooks/player/useTrackIndexFromLocalStorage';
import {
    setPlaybackState,
    updatePositionState,
    useUpdateSessionMetaData,
} from '@/hooks/player/useUpdateSessionMetaData';
import type { Song } from '@/shared/albums';
import { useSpaceListener } from '@/hooks/useSpaceListener';
import { useSetMediaSessionHandlers } from '@/hooks/useSetMediaSessionHandlers';
import { LocalStorageItem } from '@/types/LocalStorageItem.types';

const getNewAudio = (src?: string): HTMLAudioElement =>
    typeof Audio !== 'undefined'
        ? new Audio(src ?? '')
        : ({} as HTMLAudioElement);

const getSafeIndex = (index: number, maxIndex: number) =>
    Math.max(0, Math.min(index || 0, maxIndex));

export const useAudioPlayerControl = () => {
    const { songs } = useAlbums();

    const initialTrackIndex = useTrackIndexFromLocalStorage();
    const updateMetadata = useUpdateSessionMetaData();

    const [duration, setDuration] = useState(0);
    const [trackList, setTrackList] = useState<Song[]>(songs);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeTrack, setActiveTrack] = useState<Song | null>(
        songs[initialTrackIndex],
    );
    const [timeChange, setTimeChange] = useState<
        ((time: number) => void) | null
    >(null);
    const [isAudioLoaded, setIsAudioLoaded] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(
        getNewAudio(songs[initialTrackIndex].src),
    );

    const index = useRef(initialTrackIndex);

    const handlePlay = useCallback(async () => {
        setActiveTrack(trackList[index.current]);

        try {
            if (
                audioRef.current.src.trim() !==
                trackList[index.current].src.trim()
            ) {
                localStorage.setItem(
                    LocalStorageItem.PLAYING_TRACK,
                    trackList[index.current].id,
                );

                audioRef.current.src = trackList[index.current].src;
                audioRef.current.currentTime = 0;

                await audioRef.current.play();

                updateMetadata(trackList[index.current]);

                return;
            }

            if (audioRef.current.paused) {
                await audioRef.current.play();
                updateMetadata(trackList[index.current]);
            }
        } catch (error) {
            console.error(error);
            setIsPlaying(false);
        }
    }, [trackList, updateMetadata]);

    const handlePause = useCallback(() => {
        audioRef.current.pause();
        setIsPlaying(false);
        setPlaybackState('paused');
    }, []);

    const handleStop = useCallback(() => {
        handlePause();
        audioRef.current.currentTime = 0;
    }, [handlePause]);

    const handleTogglePlaying = useCallback(async () => {
        if (audioRef.current.paused) {
            await handlePlay();
        } else {
            handlePause();
        }
    }, [handlePause, handlePlay]);
    useSpaceListener(handleTogglePlaying);

    const handlePrevTrack = useCallback(() => {
        index.current =
            (index.current - 1 + trackList.length) % trackList.length;

        void handlePlay();
    }, [handlePlay, trackList.length]);

    const handleNextTrack = useCallback(() => {
        index.current = (index.current + 1) % trackList.length;

        void handlePlay();
    }, [handlePlay, trackList.length]);

    const handleSetListeners = useCallback(() => {
        audioRef.current.preload = 'auto';

        audioRef.current.onplay = () => {
            setIsPlaying(true);
        };

        audioRef.current.onpause = () => {
            setIsPlaying(false);
        };

        audioRef.current.onloadedmetadata = () => {
            updatePositionState(audioRef.current);
            setIsAudioLoaded(true);
            setDuration(audioRef.current.duration || 0);
        };

        audioRef.current.ontimeupdate = () => {
            updatePositionState(audioRef.current);
            timeChange?.(audioRef.current.currentTime);
        };

        audioRef.current.onended = () => {
            handleNextTrack();
        };
    }, [handleNextTrack, timeChange]);

    const handleChangeCurrentTime = useCallback((time?: number) => {
        if (time !== undefined && time !== null) {
            const safeTime = getSafeIndex(time, audioRef.current.duration);

            audioRef.current.currentTime = safeTime;
            updatePositionState(audioRef.current);
        }
    }, []);

    useEffect(() => {
        if (isAudioLoaded) {
            const playedSeconds = localStorage.getItem(
                LocalStorageItem.PLAYED_SECONDS,
            );

            if (playedSeconds) {
                handleChangeCurrentTime(+playedSeconds || 0);
            }
        }
    }, [handleChangeCurrentTime, isAudioLoaded, setIsPlaying]);

    const handleChangeVolume = useCallback((volume?: number) => {
        if (volume !== undefined && volume !== null) {
            audioRef.current.volume = getSafeIndex(volume, 1);
            audioRef.current.muted = volume <= 0;
        }
    }, []);

    const handleSetTrack = useCallback(
        async (trackIndex: number) => {
            const safeIndex = getSafeIndex(trackIndex, trackList.length);

            if (index.current === safeIndex) {
                await handleTogglePlaying();

                return;
            }

            index.current = getSafeIndex(trackIndex, trackList.length);

            await handlePlay();
        },
        [handlePlay, handleTogglePlaying, trackList.length],
    );

    const handleSeekTo = useCallback(
        (details: MediaSessionActionDetails) => {
            if (
                details.fastSeek &&
                details.seekTime !== undefined &&
                'fastSeek' in audioRef.current
            ) {
                audioRef.current.fastSeek(
                    getSafeIndex(details.seekTime, audioRef.current.duration),
                );
                updatePositionState(audioRef.current);

                return;
            }

            handleChangeCurrentTime(details.seekTime);
        },
        [handleChangeCurrentTime],
    );

    useEffect(() => {
        handleSetListeners();
    }, [handleSetListeners]);

    useEffect(() => {
        audioRef.current.onended = handleNextTrack;
    }, [handleNextTrack]);

    useSetMediaSessionHandlers({
        seekBackward: undefined,
        seekForward: undefined,
        previousTrack: handlePrevTrack,
        nextTrack: handleNextTrack,
        seekTo: handleSeekTo,
        play: handlePlay,
        stop: handleStop,
        pause: handlePause,
    });

    return useMemo(
        () => ({
            duration,
            isPlaying,
            handleChangeVolume,
            handleChangeCurrentTime,
            activeTrack,
            handleSetTrack,
            handlePrevTrack,
            handleNextTrack,
            handleTogglePlaying,
            audioRef,
            setTrackList,
            setTimeChange,
        }),
        [
            duration,
            isPlaying,
            handleChangeVolume,
            handleChangeCurrentTime,
            activeTrack,
            handleSetTrack,
            handlePrevTrack,
            handleNextTrack,
            handleTogglePlaying,
        ],
    );
};

export type UseAudioPlayerControlType = ReturnType<
    typeof useAudioPlayerControl
>;
