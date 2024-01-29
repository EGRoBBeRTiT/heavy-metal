/* eslint-disable no-console */
import type { MutableRefObject } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useSetMediaSessionHandlers } from '@/hooks/useSetMediaSessionHandlers';
import { useSpaceListener } from '@/hooks/useSpaceListener';
import type { Song } from '@/shared/albums';
import { LocalStorageItem } from '@/types/LocalStorageItem.types';
import { getSafeLocalStorage } from '@/utils';
import { isMobileAgent } from '@/utils/isMobileAgent';
import { useAlbums } from '@/contexts/StoreProvider';

// const DEFAULT_SKIP_SECONDS = 30;

export const useAudioPlayer = (
    audioRef: MutableRefObject<HTMLAudioElement | null>,
) => {
    const { albumsMap, songs } = useAlbums();
    const timeoutTef = useRef<ReturnType<typeof setTimeout> | number>(
        Number.NaN,
    );
    const [, setIsDesktop] = useState(false);

    const initialTrackIndex = useMemo(() => {
        const trackIdFromStorage = getSafeLocalStorage()?.getItem(
            LocalStorageItem.PLAYING_TRACK,
        );

        if (trackIdFromStorage) {
            const foundIndex = songs.findIndex(
                (song) => song.id === trackIdFromStorage,
            );

            if (foundIndex === -1) {
                return 0;
            }

            return foundIndex;
        }

        return 0;
    }, [songs]);

    useEffect(() => {
        if (!isMobileAgent()) {
            setIsDesktop(true);
        }
    }, []);

    const [duration, setDuration] = useState(0);
    const [songsList, setSongsList] = useState<Song[]>(songs);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeTrackIndex, setActiveTrackIndex] = useState(initialTrackIndex);
    const [activeTrack, setActiveTrack] = useState<Song | null>(null);

    useEffect(() => {
        if (songsList.length && songs.length) {
            setSongsList(songs);
        }
    }, [songs, songsList.length]);

    const handleUpdateSessionMetaData = useCallback(() => {
        clearTimeout(timeoutTef.current);

        timeoutTef.current = setTimeout(() => {
            const album = albumsMap.get(activeTrack?.albumId ?? '');

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
    }, [activeTrack?.albumId, activeTrack?.title, albumsMap]);

    const handleSetTrack = useCallback(
        (index: number) => {
            if (audioRef.current) {
                audioRef.current.src = songsList[index]?.src;
            }
            setActiveTrack(songsList[index] || null);
            localStorage.setItem(
                LocalStorageItem.PLAYING_TRACK,
                songsList[index]?.id,
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
        audioRef.current
            ?.play()
            .then(() => {
                setIsPlaying(true);
                navigator.mediaSession.playbackState = 'playing';
            })
            .catch((error) => console.error(error));

        if (audioRef.current) {
            audioRef.current.autoplay = true;
        }
    }, [audioRef]);

    const handleStop = useCallback(() => {
        audioRef.current?.pause();
        navigator.mediaSession.playbackState = 'paused';

        setIsPlaying(false);

        if (audioRef.current) {
            audioRef.current.autoplay = false;
        }
    }, [audioRef]);

    const handlePause = useCallback(() => {
        audioRef.current?.pause();
        navigator.mediaSession.playbackState = 'paused';
        setIsPlaying(false);

        if (audioRef.current) {
            audioRef.current.autoplay = false;
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
            handleStop,
            handlePlay,
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
            handleStop,
            handlePlay,
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
