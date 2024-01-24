/* eslint-disable no-console */
import type { MutableRefObject } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useSetMediaSessionHandlers } from '@/hooks/useSetMediaSessionHandlers';
import { useSpaceListener } from '@/hooks/useSpaceListener';
import type { Song } from '@/shared/albums';
import { ALBUMS_MAP, SONGS } from '@/shared/albums';
import { LocalStorageItem } from '@/types/LocalStorageItem.types';
import { getSafeLocalStorage } from '@/utils';
import { isMobileAgent } from '@/utils/isMobileAgent';

// const DEFAULT_SKIP_SECONDS = 30;

export const useAudioPlayer = (
    audioRef: MutableRefObject<HTMLAudioElement | null>,
) => {
    const timeoutTef = useRef<ReturnType<typeof setTimeout> | number>(
        Number.NaN,
    );
    const [, setIsDesktop] = useState(false);

    const initialTrackIndex = useMemo(() => {
        const trackIdFromStorage = getSafeLocalStorage()?.getItem(
            LocalStorageItem.PLAYING_TRACK,
        );

        return trackIdFromStorage
            ? SONGS.findIndex((song) => song.id === trackIdFromStorage)
            : 0;
    }, []);

    useEffect(() => {
        if (!isMobileAgent()) {
            setIsDesktop(true);
        }
    }, []);

    const [duration, setDuration] = useState(0);
    const [songsList, setSongsList] = useState<Song[]>(SONGS);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeTrackIndex, setActiveTrackIndex] = useState(initialTrackIndex);
    const [activeTrack, setActiveTrack] = useState<Song | null>(null);

    useEffect(() => {
        if (songsList.length && SONGS.length) {
            setSongsList(SONGS);
        }
    }, [songsList.length]);

    const handleUpdateSessionMetaData = useCallback(() => {
        clearTimeout(timeoutTef.current);

        timeoutTef.current = setTimeout(() => {
            const album = ALBUMS_MAP.get(activeTrack?.albumId ?? '');

            navigator.mediaSession.metadata = new MediaMetadata({
                title: activeTrack?.title,
                artist: album?.band ?? '',
                album: album?.album ?? '',
                artwork: [
                    {
                        src: album?.imageSrc ?? '',
                    },
                ],
            });
        }, 700);
    }, [activeTrack?.albumId, activeTrack?.title]);

    const handleSetTrack = useCallback(
        (index: number) => {
            if (audioRef.current) {
                audioRef.current.src = songsList[index].src;
            }
            setActiveTrack(songsList[index] || null);
            localStorage.setItem(
                LocalStorageItem.PLAYING_TRACK,
                songsList[index].id,
            );
        },
        [audioRef, songsList],
    );

    useEffect(() => {
        handleSetTrack(activeTrackIndex);
    }, [activeTrackIndex, handleSetTrack]);

    const handleNextTrack = useCallback(() => {
        setActiveTrackIndex((prev) => {
            if (!songsList.length) {
                return 0;
            }

            return (prev + 1) % songsList.length;
        });
    }, [songsList.length]);

    const handlePrevTrack = useCallback(() => {
        setActiveTrackIndex((prev) => {
            if (!songsList.length) {
                return 0;
            }

            if (prev <= 0) {
                return songsList.length - 1;
            }

            return prev - 1;
        });
    }, [songsList.length]);

    const handleSeekForward = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            handleNextTrack();
            // audioRef.current.currentTime = Math.min(
            //     (audioRef.current?.currentTime ?? 0) + DEFAULT_SKIP_SECONDS,
            //     audioRef.current?.duration,
            // );
        }
    }, [audioRef, handleNextTrack]);

    const handleSeekBackward = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            handlePrevTrack();
            // audioRef.current.currentTime = Math.max(
            //     (audioRef.current?.currentTime ?? 0) - DEFAULT_SKIP_SECONDS,
            //     0,
            // );
        }
    }, [audioRef, handlePrevTrack]);

    const handlePlay = useCallback(() => {
        audioRef.current?.play().catch((error) => console.error(error));

        if (audioRef.current) {
            audioRef.current.autoplay = true;
        }

        if ('mediaSession' in navigator) {
            // navigator.mediaSession.playbackState = 'playing';
        }
    }, [audioRef]);

    const handleStop = useCallback(() => {
        audioRef.current?.pause();

        if (audioRef.current) {
            audioRef.current.autoplay = false;
        }
    }, [audioRef]);

    const handlePause = useCallback(() => {
        audioRef.current?.pause();

        if (audioRef.current) {
            audioRef.current.autoplay = false;
        }

        if ('mediaSession' in navigator) {
            // navigator.mediaSession.playbackState = 'paused';
        }
    }, [audioRef]);

    const handleChangeCurrentTime = useCallback(
        (time?: number) => {
            if (audioRef.current && time !== undefined && time !== null) {
                audioRef.current.currentTime = time;
            }
        },
        [audioRef],
    );

    const handleChangeVolume = useCallback(
        (volume?: number) => {
            if (audioRef.current && volume !== undefined && volume !== null) {
                if (volume <= 0) {
                    audioRef.current.muted = true;
                    audioRef.current.volume = 0;
                } else {
                    audioRef.current.muted = false;
                    audioRef.current.volume = volume;
                }
            }
        },
        [audioRef],
    );

    const handleSeekTo = useCallback(
        (details: MediaSessionActionDetails) => {
            if (
                details.fastSeek &&
                details.seekTime !== undefined &&
                audioRef.current &&
                'fastSeek' in audioRef.current
            ) {
                audioRef.current.fastSeek(details.seekTime ?? 0);

                return;
            }

            handleChangeCurrentTime(details.seekTime);
        },
        [audioRef, handleChangeCurrentTime],
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

    const handleTogglePlaying = useCallback(() => {
        if (audioRef.current?.paused) {
            handlePlay();
        } else {
            handlePause();
        }
    }, [audioRef, handlePause, handlePlay]);

    useSpaceListener(handleTogglePlaying);

    const handleSetTrackIndex = useCallback(
        (index: number) => {
            if (index >= 0 && index < songsList.length) {
                setActiveTrackIndex(index);

                if (activeTrackIndex === index) {
                    handleTogglePlaying();
                } else if (audioRef.current?.paused) {
                    handlePlay();
                }
            }
        },
        [
            activeTrackIndex,
            audioRef,
            handlePlay,
            handleTogglePlaying,
            songsList.length,
        ],
    );

    return useMemo(
        () => ({
            handleUpdateSessionMetaData,
            handleSetTrackIndex,
            isPlaying,
            activeTrackIndex,
            songsList,
            setSongsList,
            handlePrevTrack,
            handleNextTrack,
            handleSeekForward,
            handleSeekBackward,
            setIsPlaying,
            handleTogglePlaying,
            activeTrack,
            audioRef,
            duration,
            setDuration,
            handleChangeCurrentTime,
            handleChangeVolume,
        }),
        [
            handleUpdateSessionMetaData,
            handleSetTrackIndex,
            handleChangeVolume,
            isPlaying,
            activeTrackIndex,
            songsList,
            handlePrevTrack,
            handleNextTrack,
            handleSeekForward,
            handleSeekBackward,
            handleTogglePlaying,
            activeTrack,
            audioRef,
            duration,
            setDuration,
            handleChangeCurrentTime,
        ],
    );
};
