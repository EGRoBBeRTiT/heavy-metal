import { useEffect, useRef } from 'react';

export type MediaSessionActionType =
    | ((details: MediaSessionActionDetails) => void | Promise<void>)
    | null;

export interface MediaSessionHandlers {
    play?: MediaSessionActionType;
    stop?: MediaSessionActionType;
    pause?: MediaSessionActionType;
    seekTo?: MediaSessionActionType;
    seekBackward?: MediaSessionActionType;
    seekForward?: MediaSessionActionType;
    previousTrack?: MediaSessionActionType;
    nextTrack?: MediaSessionActionType;
}

const setActionHandler = (
    action: MediaSessionAction,
    handler: MediaSessionActionHandler | null,
) =>
    'mediaSession' in navigator
        ? navigator.mediaSession.setActionHandler(action, handler)
        : void undefined;

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
    const playRef = useRef(play);
    playRef.current = play;

    const stopRef = useRef(stop);
    stopRef.current = stop;

    const pauseRef = useRef(pause);
    pauseRef.current = pause;

    const seekToRef = useRef(seekTo);
    seekToRef.current = seekTo;

    const seekBackwardRef = useRef(seekBackward);
    seekBackwardRef.current = seekBackward;

    const seekForwardRef = useRef(seekForward);
    seekForwardRef.current = seekForward;

    const previousTrackRef = useRef(previousTrack);
    previousTrackRef.current = previousTrack;

    const nextTrackRef = useRef(nextTrack);
    nextTrackRef.current = nextTrack;

    useEffect(() => {
        if (playRef.current === null) {
            setActionHandler('play', null);
        } else if (playRef.current !== undefined) {
            setActionHandler('play', (details) => {
                void playRef.current?.(details);
            });
        }

        if (stopRef.current === null) {
            setActionHandler('stop', null);
        } else if (stopRef.current !== undefined) {
            setActionHandler('stop', (details) => {
                void stopRef.current?.(details);
            });
        }

        if (pauseRef.current === null) {
            setActionHandler('pause', null);
        } else if (pauseRef.current !== undefined) {
            setActionHandler('pause', (details) => {
                void pauseRef.current?.(details);
            });
        }

        if (seekToRef.current === null) {
            setActionHandler('seekto', null);
        } else if (seekToRef.current !== undefined) {
            setActionHandler('seekto', (details) => {
                void seekToRef.current?.(details);
            });
        }

        if (seekBackwardRef.current === null) {
            setActionHandler('seekbackward', null);
        } else if (seekBackwardRef.current !== undefined) {
            setActionHandler('seekbackward', (details) => {
                void seekBackwardRef.current?.(details);
            });
        }

        if (seekForwardRef.current === null) {
            setActionHandler('seekforward', null);
        } else if (seekForwardRef.current !== undefined) {
            setActionHandler('seekforward', (details) => {
                void seekForwardRef.current?.(details);
            });
        }

        if (previousTrackRef.current === null) {
            setActionHandler('previoustrack', null);
        } else if (previousTrackRef.current !== undefined) {
            setActionHandler('previoustrack', (details) => {
                void previousTrackRef.current?.(details);
            });
        }

        if (nextTrackRef.current === null) {
            setActionHandler('nexttrack', null);
        } else if (nextTrackRef.current !== undefined) {
            setActionHandler('nexttrack', (details) => {
                void nextTrackRef.current?.(details);
            });
        }
    }, []);
};
