'use client';

import {
    useCallback,
    type DetailedHTMLProps,
    type HTMLAttributes,
} from 'react';

import { useAlbums } from '@/contexts/StoreProvider';
import { useAudioPlayer } from '@/hooks/context/useAudioPlayer';
import type { Song } from '@/shared/albums';

import { Track } from './Track';

export type TrackListProps = Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>,
    'ref' | 'children'
>;

export const TrackList = ({ className, ...props }: TrackListProps) => {
    const { songs } = useAlbums();
    const { handleSetTrack, activeTrack, isPlaying } = useAudioPlayer();

    const handleTrackClick = useCallback(
        (song: Song) => {
            const index = songs.findIndex((value) => value.id === song.id);

            if (index >= 0) {
                void handleSetTrack(index);
            }
        },
        [handleSetTrack, songs],
    );

    return (
        <ul className={className} {...props}>
            {songs.map((song) => (
                <Track
                    song={song}
                    key={song.id}
                    onClick={handleTrackClick}
                    isActive={activeTrack?.id === song.id}
                    isPlaying={activeTrack?.id === song.id && isPlaying}
                />
            ))}
        </ul>
    );
};
