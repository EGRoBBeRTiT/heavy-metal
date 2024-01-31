import { useMemo } from 'react';

import { useAlbums } from '@/contexts/StoreProvider';
import { getSafeLocalStorage } from '@/utils';
import { LocalStorageItem } from '@/types/LocalStorageItem.types';

export const useTrackIndexFromLocalStorage = () => {
    const { songs } = useAlbums();

    return useMemo(() => {
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
};
