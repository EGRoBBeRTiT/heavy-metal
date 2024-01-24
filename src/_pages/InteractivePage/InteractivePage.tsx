'use client';

import cnBind from 'classnames/bind';
import { Suspense } from 'react';

import { IcCorner } from '@/assets';
import { AlbumSkeleton, AlbumLazy } from '@/components/Album';
import { appRoutes } from '@/routes';
import { ALBUMS } from '@/shared/albums';

import styles from './InteractivePage.module.scss';

const cx = cnBind.bind(styles);

export const InteractivePage = () => (
    <div className={cx('main')}>
        <div className={cx('box')}>
            {Array.from({ length: 4 }, (_, index) => (
                <IcCorner
                    key={index}
                    width={50}
                    height={50}
                    className={cx('corner')}
                />
            ))}
            <div className={cx('content')}>
                <div className={cx('container')}>
                    {ALBUMS.map((album, index) => (
                        <Suspense key={index} fallback={<AlbumSkeleton />}>
                            <AlbumLazy
                                {...album}
                                key={index}
                                href={appRoutes.fullscreen(album.id)}
                                fullScreenHref={appRoutes.fullscreen(album.id)}
                                coverFlowHref={appRoutes.coverflow(index)}
                            />
                        </Suspense>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
