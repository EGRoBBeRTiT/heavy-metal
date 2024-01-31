import { useCallback } from 'react';

import type { Song } from '@/shared/albums';
import { useAlbums } from '@/contexts/StoreProvider';

export const setPlaybackState = (state?: MediaSessionPlaybackState) => {
    if ('mediaSession' in navigator && state) {
        navigator.mediaSession.playbackState = state;
    }
};

export const updatePositionState = (audio: HTMLAudioElement | null) => {
    if ('setPositionState' in navigator.mediaSession) {
        navigator.mediaSession.setPositionState({
            duration: audio?.duration || 0,
            playbackRate: audio?.playbackRate || 1,
            position: audio?.currentTime || 0,
        });
    }
};

export const useUpdateSessionMetaData = () => {
    const { albumsMap } = useAlbums();

    return useCallback(
        (track: Song | null) => {
            if ('mediaSession' in navigator) {
                const album = albumsMap.get(track?.albumId ?? '');

                navigator.mediaSession.metadata = track
                    ? new MediaMetadata({
                          title: track?.title,
                          artist: album?.band ?? '',
                          album: album?.album ?? '',
                          artwork: [
                              {
                                  src: album?.imageSrc ?? '',
                              },
                          ],
                      })
                    : null;
            }
        },
        [albumsMap],
    );
};
