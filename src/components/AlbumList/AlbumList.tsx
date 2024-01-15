'use client';

import NextImage from 'next/image';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import cnBind from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { Image } from '@nextui-org/react';

import { ALBUMS } from '@/shared/albums';
import { useScreenConfig } from '@/contexts/ScreenConfigProvider';

import styles from './AlbumList.module.scss';

const cx = cnBind.bind(styles);

export interface AlbumListProps
    extends Omit<
        DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
        'children' | 'ref'
    > {
    albumsInRow?: number;
    mobileAlbumsInRow?: number;
    quality?: number;
    width?: number;
    mobileWidth?: number;
}

export const AlbumList = React.memo(
    ({
        albumsInRow = 10,
        mobileAlbumsInRow = 2,
        className,
        quality = 100,
        width = 300,
        mobileWidth = 100,
    }: AlbumListProps) => {
        const [isDesktop, setIsDesktop] = useState(true);

        const { isMobile } = useScreenConfig();

        useEffect(() => {
            if (isMobile) {
                setIsDesktop(false);
            } else {
                setIsDesktop(true);
            }
        }, [isMobile]);

        return (
            <div className={cx('list', className)}>
                {ALBUMS.map((album, index) => (
                    <article
                        key={index}
                        className={cx('image-container')}
                        style={{
                            width: `calc(100% / ${
                                isDesktop ? albumsInRow : mobileAlbumsInRow
                            })`,
                        }}
                        itemScope
                        itemType="https://schema.org/MusicAlbum"
                    >
                        <div className={cx('hidden')}>
                            <h1 itemProp="name">{album.album}</h1>
                            <span
                                itemScope
                                itemProp="byArtist"
                                itemType="https://schema.org/MusicGroup"
                            >
                                <h1 itemProp="name">{album.band}</h1>
                            </span>
                            {album.songs?.length && (
                                <meta
                                    content={`${album.songs.length}`}
                                    itemProp="numTracks"
                                />
                            )}
                            <meta content="Rock" itemProp="genre" />
                            {album.link && (
                                <a
                                    itemProp="url"
                                    href={album.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Listen
                                </a>
                            )}
                        </div>
                        <span className={cx('image')}>
                            <Image
                                as={NextImage}
                                itemProp="image"
                                key={index}
                                src={album.imageSrc}
                                alt={`${album.band} ${album.album}`}
                                width={isDesktop ? width : mobileWidth}
                                height={isDesktop ? width : mobileWidth}
                                quality={quality}
                            />
                        </span>
                    </article>
                ))}
            </div>
        );
    },
);

AlbumList.displayName = 'Memo (AlbumList)';
