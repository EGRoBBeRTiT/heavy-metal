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

export const useAudioPlayer = (
    audioRef: MutableRefObject<HTMLAudioElement | null>,
) => {
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
        if (
            (audioRef.current?.currentTime ?? 0) + 15 >
            (audioRef.current?.duration ?? 0)
        ) {
            handleNextTrack();
        } else if (audioRef.current) {
            audioRef.current.currentTime += 15;
        }
    }, [audioRef, handleNextTrack]);

    const handleSeekBackward = useCallback(() => {
        if ((audioRef.current?.currentTime ?? 0) - 15 < 0) {
            handlePrevTrack();
        } else if (audioRef.current) {
            audioRef.current.currentTime -= 15;
        }
    }, [audioRef, handlePrevTrack]);

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
        if (!isPlaying || !songsList[activeTrackIndex]) {
            return;
        }

        navigator.mediaSession.setActionHandler(
            'previoustrack',
            handlePrevTrack,
        );
        navigator.mediaSession.setActionHandler('nexttrack', handleNextTrack);

        navigator.mediaSession.setActionHandler(
            'seekbackward',
            handleSeekBackward,
        );
        navigator.mediaSession.setActionHandler(
            'seekforward',
            handleSeekForward,
        );
    }, [
        activeTrackIndex,
        handleNextTrack,
        handlePrevTrack,
        handleSeekBackward,
        handleSeekForward,
        isPlaying,
        songsList,
    ]);

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
    }, [audioRef, handleNextTrack, handlePrevTrack]);

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
