/* eslint-disable no-console */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useAlbums } from '@/contexts/StoreProvider';
import { useTrackIndexFromLocalStorage } from '@/hooks/player/useTrackIndexFromLocalStorage';
import {
    updatePositionState,
    useUpdateSessionMetaData,
} from '@/hooks/player/useUpdateSessionMetaData';
import type { Song } from '@/shared/albums';
import { useSetMediaSessionHandlers } from '@/hooks/useSetMediaSessionHandlers';
import { useSpaceListener } from '@/hooks/useSpaceListener';

const getNewAudio = (src?: string): HTMLAudioElement =>
    typeof Audio !== 'undefined'
        ? new Audio(src ?? '')
        : ({} as HTMLAudioElement);

const getSafeIndex = (index: number, maxIndex: number) =>
    Math.max(0, Math.min(index, maxIndex));

const getAudioList = (songs: Song[]) =>
    songs.map((song) => {
        const audio = getNewAudio(song.src);

        audio.preload = 'none';

        return audio;
    });

const setPlaybackState = (state: MediaSessionPlaybackState) => {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = state;
    }
};

export const useAudioPlayerControlOld = () => {
    const { songs } = useAlbums();

    const initialTrackIndex = useTrackIndexFromLocalStorage();
    const updateMetadata = useUpdateSessionMetaData();

    const [duration, setDuration] = useState(0);
    const [trackList, setTrackList] = useState<Song[]>(songs);
    const [isPlaying, setIsPlaying] = useState(false);

    const [activeTrack, setActiveTrack] = useState<Song | null>(
        songs[initialTrackIndex],
    );

    const audioList = useRef<HTMLAudioElement[]>(getAudioList(trackList));
    const activeAudio = useRef<HTMLAudioElement>(
        audioList.current[initialTrackIndex],
    );
    const activeIndex = useRef(initialTrackIndex);

    useEffect(() => {
        console.log(duration);
    }, [duration]);

    const handlePlay = useCallback(async () => {
        if (activeAudio.current.preload === 'none') {
            activeAudio.current.preload = 'auto';
        }

        await activeAudio.current
            .play()
            .then(() => {
                console.log('Playing: ', activeAudio.current.src);

                setDuration(activeAudio.current.duration || 0);
                setIsPlaying(true);
                setPlaybackState('playing');
            })
            .catch((error) => {
                setIsPlaying(false);
                setPlaybackState('paused');

                console.error(error);
            });
    }, []);

    const handlePause = useCallback(() => {
        if (!activeAudio.current.paused) {
            console.log('Paused');

            activeAudio.current.pause();
            setIsPlaying(false);
            setPlaybackState('paused');
        }
    }, []);

    const handleStop = useCallback(() => {
        handlePause();
        activeAudio.current.currentTime = 0;
        updateMetadata(null);
        updatePositionState(null);
    }, [handlePause, updateMetadata]);

    const handleTogglePlaying = useCallback(async () => {
        if (activeAudio.current.paused) {
            await handlePlay();
        } else {
            handlePause();
        }
    }, [handlePause, handlePlay]);
    useSpaceListener(handleTogglePlaying);

    const handleSetTrack = useCallback(
        (index: number, withPlay = true) => {
            const maxIndex = audioList.current.length - 1;
            const safeNewIndex = getSafeIndex(index, maxIndex);

            if (safeNewIndex === activeIndex.current) {
                void handleTogglePlaying();

                return;
            }
            activeAudio.current.muted = true;
            activeAudio.current.preload = '';

            audioList.current[safeNewIndex].preload = 'auto';
            activeAudio.current = audioList.current[safeNewIndex];

            setActiveTrack(trackList[safeNewIndex]);

            console.log('Paused ', !withPlay);

            if (withPlay) {
                const prevIndex = activeIndex.current;

                void handlePlay().then(() => {
                    audioList.current[prevIndex].pause();
                    audioList.current[prevIndex].muted = false;
                    audioList.current[prevIndex].currentTime = 0;

                    updatePositionState(audioList.current[safeNewIndex]);
                    updateMetadata(trackList[safeNewIndex]);
                });
            } else {
                audioList.current[activeIndex.current].muted = false;
                audioList.current[activeIndex.current].currentTime = 0;
            }

            // ? Индексы след и пред трека
            const nextIndex = (safeNewIndex + 1) % audioList.current.length;
            const prevIndex =
                (safeNewIndex - 1 + audioList.current.length) %
                audioList.current.length;

            // ? Предзагрузка след и пред трека
            audioList.current[nextIndex].preload = 'metadata';
            audioList.current[prevIndex].preload = 'metadata';

            activeAudio.current.onended = () => {
                console.log('Ended');

                const nextIndex =
                    (activeIndex.current + 1) % audioList.current.length;

                handleSetTrack(nextIndex);
            };

            // ? Установка активного индекса
            activeIndex.current = safeNewIndex;
        },
        [handlePlay, handleTogglePlaying, trackList, updateMetadata],
    );

    useEffect(() => {
        activeAudio.current.preload = 'auto';

        activeAudio.current.onloadedmetadata = () => {
            setDuration(activeAudio.current.duration);
        };
        activeAudio.current.onplay = () => {
            updatePositionState(activeAudio.current);
            updateMetadata(trackList[activeIndex.current]);
        };
        activeAudio.current.onended = () => {
            console.log('Ended');

            const nextIndex =
                (activeIndex.current + 1) % audioList.current.length;

            handleSetTrack(nextIndex);
        };
    }, [handleSetTrack, trackList, updateMetadata]);

    const handleNextTrack = useCallback(() => {
        const nextIndex = (activeIndex.current + 1) % audioList.current.length;

        handleSetTrack(nextIndex, !activeAudio.current.paused);
    }, [handleSetTrack]);

    const handlePrevTrack = useCallback(() => {
        const prevIndex =
            (activeIndex.current - 1 + audioList.current.length) %
            audioList.current.length;

        handleSetTrack(prevIndex, !activeAudio.current.paused);
    }, [handleSetTrack]);

    const handleTrackListChange = useCallback((newSongs: Song[]) => {
        activeAudio.current.pause();
        setTrackList(newSongs);
        audioList.current = getAudioList(newSongs);
        activeIndex.current = 0;
        [activeAudio.current] = audioList.current;
        console.log(
            'BEFORE Update position state, duration: ',
            activeAudio.current.duration,
        );
        updatePositionState(activeAudio.current);
    }, []);

    const handleChangeCurrentTime = useCallback((time?: number) => {
        if (time !== undefined && time !== null) {
            activeAudio.current.currentTime = getSafeIndex(
                time,
                activeAudio.current.duration,
            );
            console.log(
                'BEFORE Update position state, duration: ',
                activeAudio.current.duration,
            );
            updatePositionState(activeAudio.current);
        }
    }, []);

    const handleChangeVolume = useCallback((volume?: number) => {
        if (volume !== undefined && volume !== null) {
            activeAudio.current.volume = getSafeIndex(volume, 1);
            activeAudio.current.muted = volume <= 0;
        }
    }, []);

    const handleSeekTo = useCallback(
        (details: MediaSessionActionDetails) => {
            if (
                details.fastSeek &&
                details.seekTime !== undefined &&
                'fastSeek' in activeAudio.current
            ) {
                activeAudio.current.fastSeek(
                    getSafeIndex(
                        details.seekTime,
                        activeAudio.current.duration,
                    ),
                );
                console.log(
                    'BEFORE Update position state, duration: ',
                    activeAudio.current.duration,
                );
                updatePositionState(activeAudio.current);

                return;
            }

            handleChangeCurrentTime(details.seekTime);
        },
        [handleChangeCurrentTime],
    );

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
            handleTrackListChange,
            activeTrack,
            handleSetTrack,
            handlePrevTrack,
            handleNextTrack,
            handleTogglePlaying,
            activeAudio,
        }),
        [
            duration,
            isPlaying,
            handleChangeVolume,
            handleChangeCurrentTime,
            handleTrackListChange,
            activeTrack,
            handleSetTrack,
            handlePrevTrack,
            handleNextTrack,
            handleTogglePlaying,
        ],
    );
};

export type UseAudioPlayerControlOldType = ReturnType<
    typeof useAudioPlayerControlOld
>;
