import type { MutableRefObject } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

export interface Song {
    src: string;
    title: string;
    artist: string;
    album: string;
    imageSrc: string;
    year: string;
}

const DEFAULT_SKIP_SECONDS = 10;

export const useAudioPlayer = (
    audioRef: MutableRefObject<HTMLAudioElement | null>,
) => {
    // const { isMobile, isTablet } = useScreenConfig();
    // const isDesktop = !isMobile && !isTablet;
    const [songsList, setSongsList] = useState<Song[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeTrackIndex, setActiveTrackIndex] = useState(0);
    const [activeTrack, setActiveTrack] = useState<Song | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setActiveTrack(songsList[activeTrackIndex] || null);
        });
    }, [activeTrackIndex, songsList]);

    const handleNextTrack = useCallback(() => {
        setActiveTrackIndex((prev) => {
            if (!songsList.length) {
                return 0;
            }

            return (prev + 1) % songsList.length;
        });

        setTimeout(() => {
            void audioRef.current?.play();
        }, 20);
    }, [audioRef, songsList.length]);

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

        setTimeout(() => {
            void audioRef.current?.play();
        }, 20);
    }, [audioRef, songsList.length]);

    const handleSeekForward = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.min(
                (audioRef.current?.currentTime ?? 0) + DEFAULT_SKIP_SECONDS,
                audioRef.current?.duration,
            );
        }
    }, [audioRef]);

    const handleSeekBackward = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(
                (audioRef.current?.currentTime ?? 0) - DEFAULT_SKIP_SECONDS,
                0,
            );
        }
    }, [audioRef]);

    const handleTogglePlaying = useCallback(() => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            void audioRef.current?.play();
        }
    }, [audioRef, isPlaying]);

    useEffect(() => {
        if (!songsList[activeTrackIndex]) {
            return;
        }

        if (isPlaying) {
            if ('mediaSession' in navigator) {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: songsList[activeTrackIndex].title,
                    artist: songsList[activeTrackIndex].artist,
                    album: songsList[activeTrackIndex].album,
                    artwork: [{ src: songsList[activeTrackIndex].imageSrc }],
                });
            }
        }
    }, [activeTrackIndex, isPlaying, songsList]);

    useEffect(() => {
        // if (isDesktop) {
        //     navigator.mediaSession.setActionHandler(
        //         'seekbackward',
        //         handleSeekBackward,
        //     );
        //     navigator.mediaSession.setActionHandler(
        //         'seekforward',
        //         handleSeekForward,
        //     );
        // } else {
        // navigator.mediaSession.setActionHandler('seekbackward', null);
        // navigator.mediaSession.setActionHandler('seekforward', null);
        // }

        // navigator.mediaSession.setActionHandler(
        //     'previoustrack',
        //     handlePrevTrack,
        // );
        navigator.mediaSession.setActionHandler('nexttrack', handleNextTrack);
        navigator.mediaSession.setActionHandler('play', () => {
            void audioRef.current?.play();
        });
        // navigator.mediaSession.setActionHandler('stop', () => {
        //     void audioRef.current?.pause();
        // });
        navigator.mediaSession.setActionHandler('pause', () => {
            void audioRef.current?.pause();
        });
        // navigator.mediaSession.setActionHandler('seekto', (details) => {
        //     if (
        //         details.fastSeek &&
        //         details.seekTime !== undefined &&
        //         audioRef.current &&
        //         'fastSeek' in audioRef.current
        //     ) {
        //         // Only use fast seek if supported.
        //         audioRef.current.fastSeek(details.seekTime ?? 0);

        //         return;
        //     }

        //     if (audioRef.current && details.seekTime !== undefined) {
        //         audioRef.current.currentTime = details.seekTime;
        //     }
        // });
    }, [audioRef, handleNextTrack, handlePrevTrack]);

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                if (audioRef.current?.paused) {
                    void audioRef.current.play();
                } else {
                    audioRef.current?.pause();
                }

                // return;
            }

            // if (e.code === 'ArrowRight') {
            //     handleSeekForward();

            //     return;
            // }

            // if (e.code === 'ArrowLeft') {
            //     handleSeekBackward();
            // }
        };
        document.addEventListener('keydown', listener);

        return () => {
            document.removeEventListener('keydown', listener);
        };
    }, [audioRef, handlePrevTrack]);

    return useMemo(
        () => ({
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
        }),
        [
            activeTrack,
            isPlaying,
            activeTrackIndex,
            songsList,
            handleNextTrack,
            handlePrevTrack,
            handleSeekBackward,
            handleSeekForward,
            handleTogglePlaying,
        ],
    );
};
