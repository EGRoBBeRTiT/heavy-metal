'use client';

/* eslint-disable react/no-unused-prop-types */

import type { SwiperProps } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { CSSProperties } from 'react';
import React, { Suspense, useEffect, useState } from 'react';
import {
    Keyboard,
    Mousewheel,
    Pagination,
    Zoom,
    Scrollbar,
} from 'swiper/modules';
import cnBind from 'classnames/bind';
import { Spinner } from '@nextui-org/react';

import { MainInfo } from '@/components/AlbumFullScreenSwiper/MainInfo';
import { SongList } from '@/components/AlbumFullScreenSwiper/SongList';
import { ImageSlideLazy } from '@/components/AlbumFullScreenSwiper/ImageSlide';
import { useWindowSize } from '@/hooks/useWindowSize';
import { LazyImage } from '@/components/LazyImage';
import { useScreenConfig } from '@/contexts/ScreenConfigProvider';
import { useAlbums } from '@/contexts/StoreProvider';

import 'swiper/css';

import styles from './AlbumFullScreenSwiper.module.scss';

const cx = cnBind.bind(styles);

export interface AlbumFullScreenSwiperProps
    extends Omit<
        React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'ref' | 'children'
    > {
    initialSlide?: number;
    onActiveIndexChange?: (index: number) => void;
}

const SWIPER_CONFIG: SwiperProps = {
    slidesPerView: 1,
    pagination: {
        dynamicBullets: true,
        clickable: true,
    },
    modules: [Keyboard, Pagination, Zoom, Scrollbar, Mousewheel],
    mousewheel: true,
    centeredSlides: true,
    zoom: true,
    keyboard: {
        enabled: true,
    },
    scrollbar: {
        hide: true,
    },
    lazyPreloadPrevNext: 1,
};

export const AlbumFullScreenSwiper = React.memo(
    React.forwardRef<HTMLDivElement, AlbumFullScreenSwiperProps>(
        (
            { onActiveIndexChange, initialSlide = 0, className, ...props },
            ref,
        ) => {
            const { albums } = useAlbums();

            const { isMobile, isTablet } = useScreenConfig();
            const [zoomed, setZoomed] = useState(false);
            const [activeIndex, setActiveIndex] = useState(initialSlide);

            const [styles, setStyle] = useState<CSSProperties>({});

            const { width, height } = useWindowSize();

            useEffect(() => {
                if (width && height) {
                    setStyle({ width: `${Math.abs(width - height) / 2}px` });
                }
            }, [height, width]);

            return (
                <div
                    {...props}
                    ref={ref}
                    className={cx('body-container', className)}
                >
                    <div className={cx('content')}>
                        <Swiper
                            onZoomChange={() => {
                                setZoomed((prev) => !prev);
                            }}
                            initialSlide={initialSlide}
                            onActiveIndexChange={(swiper) => {
                                setActiveIndex(swiper.activeIndex);
                                onActiveIndexChange?.(swiper.activeIndex ?? 0);
                            }}
                            {...SWIPER_CONFIG}
                        >
                            {albums.map(({ imageSrc, album }, index) => (
                                <SwiperSlide key={index}>
                                    <Suspense
                                        key={index}
                                        fallback={<Spinner />}
                                    >
                                        {isMobile || isTablet ? (
                                            <div
                                                className={cx(
                                                    'image-container',
                                                    'swiper-zoom-container',
                                                )}
                                            >
                                                <LazyImage
                                                    src={imageSrc}
                                                    alt={album}
                                                    width={800}
                                                    height={800}
                                                    quality={100}
                                                    priority={
                                                        activeIndex === index
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <ImageSlideLazy
                                                src={imageSrc}
                                                alt={album}
                                                className={cx(
                                                    'image-container',
                                                    'swiper-zoom-container',
                                                )}
                                            />
                                        )}
                                    </Suspense>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <MainInfo
                        album={albums[activeIndex]}
                        className={cx('info', {
                            hidden: zoomed,
                        })}
                        style={styles}
                    />
                    {albums[activeIndex].songs &&
                        albums[activeIndex].songs?.length && (
                            <SongList
                                album={albums[activeIndex]}
                                className={cx('info', {
                                    hidden: zoomed,
                                })}
                                style={styles}
                            />
                        )}
                </div>
            );
        },
    ),
);

AlbumFullScreenSwiper.displayName = 'Memo (AlbumFullScreenSwiper)';
