import { useCallback } from 'react';

import type { Song } from '@/shared/albums';
import { useAlbums } from '@/contexts/StoreProvider';

export const setPlaybackState = (state?: MediaSessionPlaybackState) => {
    if ('mediaSession' in navigator && state) {
        navigator.mediaSession.playbackState = state;
    }
};

export const updatePositionState = (state?: MediaPositionState) => {
    if ('setPositionState' in navigator.mediaSession) {
        navigator.mediaSession.setPositionState(
            state
                ? {
                      duration: state?.duration,
                      playbackRate: state?.playbackRate,
                      position: state?.position,
                  }
                : state,
        );
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
                                  src: album?.imageSrc
                                      ? `/_next/image?url=${album?.imageSrc}&w=750&q=70`
                                      : '',
                                  type: 'image/webp',
                              },
                          ],
                      })
                    : null;
            }
        },
        [albumsMap],
    );
};
