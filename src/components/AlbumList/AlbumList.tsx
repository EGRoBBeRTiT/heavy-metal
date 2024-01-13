'use client';

import Image from 'next/image';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import cnBind from 'classnames/bind';
import React, { Suspense, useEffect, useState } from 'react';

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
}

export const AlbumList = React.memo(
    ({
        albumsInRow = 10,
        mobileAlbumsInRow = 2,
        className,
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
                    <Suspense key={index}>
                        <div
                            key={index}
                            className={cx('image-container')}
                            style={{
                                width: `calc(100% / ${
                                    isDesktop ? albumsInRow : mobileAlbumsInRow
                                })`,
                            }}
                        >
                            <Image
                                key={index}
                                src={album.imageSrc}
                                alt={album.album}
                                width={300}
                                height={300}
                                quality={100}
                            />
                        </div>
                    </Suspense>
                ))}
            </div>
        );
    },
);

AlbumList.displayName = 'Memo (AlbumList)';
