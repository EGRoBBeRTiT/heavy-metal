/* eslint-disable jsx-a11y/anchor-is-valid */
import cnBind from 'classnames/bind';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Link, ScrollShadow } from '@nextui-org/react';

import { SONGS, type AlbumType } from '@/shared/albums';
import { useAudioPlayerContext } from '@/contexts/AudioPlayerProvider/AudioPlayerProvider';
import { PlayPauseIcon } from '@/components/PlayPauseIcon';

import styles from './SongList.module.scss';

const cx = cnBind.bind(styles);

export interface SongListProps
    extends Omit<
        DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
        'ref' | 'children'
    > {
    album: AlbumType;
}

export const SongList = ({ album, className, ...props }: SongListProps) => {
    const { handleSetTrackIndex, activeTrack, isPlaying } =
        useAudioPlayerContext();

    return (
        <ScrollShadow {...props} className={cx('scroll-container', className)}>
            <div className={cx('container')}>
                <ol className={cx('list', className)}>
                    {album.songs?.map((song, index) => {
                        const isActive = activeTrack?.id === song.id;

                        return (
                            <li key={index}>
                                <Link
                                    className={cx('link', {
                                        playing: isActive,
                                    })}
                                    isBlock
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();

                                        const index = SONGS.findIndex(
                                            (value) => value.id === song.id,
                                        );

                                        handleSetTrackIndex(index);
                                    }}
                                    isDisabled={!song.src}
                                    color={isActive ? 'primary' : 'foreground'}
                                >
                                    {`${index + 1}. ${song.title}`}
                                    {song.src && (
                                        <PlayPauseIcon
                                            className={cx('play-pause-icon')}
                                            isPlaying={isActive && isPlaying}
                                        />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </ScrollShadow>
    );
};
