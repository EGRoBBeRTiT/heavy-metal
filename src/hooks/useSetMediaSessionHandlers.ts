import { useEffect } from 'react';

export interface MediaSessionHandlers {
    play?: ((details: MediaSessionActionDetails) => void) | null;
    stop?: ((details: MediaSessionActionDetails) => void) | null;
    pause?: ((details: MediaSessionActionDetails) => void) | null;
    seekTo?: ((details: MediaSessionActionDetails) => void) | null;
    seekBackward?: ((details: MediaSessionActionDetails) => void) | null;
    seekForward?: ((details: MediaSessionActionDetails) => void) | null;
    previousTrack?: ((details: MediaSessionActionDetails) => void) | null;
    nextTrack?: ((details: MediaSessionActionDetails) => void) | null;
}

export const useSetMediaSessionHandlers = ({
    play,
    stop,
    pause,
    seekTo,
    seekBackward,
    seekForward,
    previousTrack,
    nextTrack,
}: MediaSessionHandlers) => {
    useEffect(() => {
        if ('mediaSession' in navigator && play !== undefined) {
            navigator.mediaSession.setActionHandler('play', play);
        }
    }, [play]);

    useEffect(() => {
        if ('mediaSession' in navigator && stop !== undefined) {
            navigator.mediaSession.setActionHandler('stop', stop);
        }
    }, [stop]);

    useEffect(() => {
        if ('mediaSession' in navigator && pause !== undefined) {
            navigator.mediaSession.setActionHandler('pause', pause);
        }
    }, [pause]);

    useEffect(() => {
        if ('mediaSession' in navigator && seekTo !== undefined) {
            navigator.mediaSession.setActionHandler('seekto', seekTo);
        }
    }, [seekTo]);

    useEffect(() => {
        if ('mediaSession' in navigator && seekBackward !== undefined) {
            navigator.mediaSession.setActionHandler(
                'seekbackward',
                seekBackward,
            );
        }
    }, [seekBackward]);

    useEffect(() => {
        if ('mediaSession' in navigator && seekForward !== undefined) {
            navigator.mediaSession.setActionHandler('seekforward', seekForward);
        }
    }, [seekForward]);

    useEffect(() => {
        if ('mediaSession' in navigator && previousTrack !== undefined) {
            navigator.mediaSession.setActionHandler(
                'previoustrack',
                previousTrack,
            );
        }
    }, [previousTrack]);

    useEffect(() => {
        if ('mediaSession' in navigator && nextTrack !== undefined) {
            navigator.mediaSession.setActionHandler('nexttrack', nextTrack);
        }
    }, [nextTrack]);
};
