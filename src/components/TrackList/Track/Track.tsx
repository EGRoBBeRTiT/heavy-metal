import cnBind from 'classnames/bind';
import type { DetailedHTMLProps } from 'react';
import React, { useCallback } from 'react';
import Image from 'next/image';

import type { Song } from '@/shared/albums';
import { useAlbums } from '@/contexts/StoreProvider';
import { PlayPauseIcon } from '@/components/PlayPauseIcon';
import { useScreenConfig } from '@/contexts/ScreenConfigProvider';
import { TrackMorePopover } from '@/components/TrackList/Track/TrackMorePopover';

import styles from './Track.module.scss';

const cx = cnBind.bind(styles);

export interface TrackProps
    extends Omit<
        DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>,
        'ref' | 'children' | 'onClick'
    > {
    song: Song;
    onClick?: (track: Song) => void;
    isActive?: boolean;
    isPlaying?: boolean;
}

export const Track = React.memo(
    ({
        className,
        song,
        onClick,
        isPlaying,
        isActive,
        ...props
    }: TrackProps) => {
        const { isMobile } = useScreenConfig();
        const { albumsMap } = useAlbums();
        const album = albumsMap.get(song.albumId);

        const handleClick = useCallback(() => {
            onClick?.(song);
        }, [onClick, song]);

        return (
            <li className={cx('song', className)} {...props}>
                <div
                    role="button"
                    className={cx('song-content', { active: isActive })}
                    tabIndex={0}
                    onClick={handleClick}
                    onKeyUp={(e) => {
                        if (e.code === 'Enter') {
                            handleClick();
                        }
                    }}
                >
                    {!isMobile && (
                        <PlayPauseIcon
                            className={cx('play-pause-icon')}
                            isPlaying={isPlaying}
                        />
                    )}
                    {album?.imageSrc && (
                        <Image
                            loading="lazy"
                            src={album?.imageSrc}
                            width={50}
                            height={50}
                            alt={`${album.band} ${album.album ?? ''}`}
                            className={cx('cover')}
                            title="Открыть альбом"
                            aria-label="Открыть альбом"
                        />
                    )}
                    <div className={cx('info')}>
                        <h1>
                            <b>{song.title}</b>
                        </h1>
                        <p className={cx('add-info')}>
                            {album?.band} — {album?.album}
                            {` • `}
                            {album?.releasedAt
                                ? new Date(album?.releasedAt).getFullYear()
                                : ''}
                        </p>
                    </div>
                    <TrackMorePopover
                        className={cx('more-button')}
                        albumId={album?.id ?? ''}
                        trackSrc={song.src}
                    />
                </div>
            </li>
        );
    },
);

Track.displayName = 'Memo (Song)';
