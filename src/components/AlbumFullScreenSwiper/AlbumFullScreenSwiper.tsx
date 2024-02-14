'use client';

/* eslint-disable react/no-unused-prop-types */

import type { SwiperClass, SwiperProps } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { CSSProperties } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import {
    Keyboard,
    Mousewheel,
    Pagination,
    Zoom,
    Scrollbar,
    Virtual,
} from 'swiper/modules';
import cnBind from 'classnames/bind';

import { MainInfo } from '@/components/AlbumFullScreenSwiper/MainInfo';
import { SongList } from '@/components/AlbumFullScreenSwiper/SongList';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useScreenConfig } from '@/contexts/ScreenConfigProvider';
import { useAlbums } from '@/contexts/StoreProvider';
import { CustomImage } from '@/components/CustomImage';
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
    modules: [Keyboard, Pagination, Zoom, Scrollbar, Mousewheel, Virtual],
    mousewheel: true,
    centeredSlides: true,
    zoom: true,
    keyboard: {
        enabled: true,
    },
    scrollbar: {
        hide: true,
    },
    virtual: true,
};

export const AlbumFullScreenSwiper = React.memo(
    React.forwardRef<HTMLDivElement, AlbumFullScreenSwiperProps>(
        (
            { onActiveIndexChange, initialSlide = 0, className, ...props },
            ref,
        ) => {
            const swiperRef = useRef<SwiperClass | null>(null);
            const { albums } = useAlbums();

            const { isMobile, isTablet } = useScreenConfig();
            const [zoomed, setZoomed] = useState(false);
            const [activeIndex, setActiveIndex] = useState(initialSlide);
            const activeIndexRef = useRef(activeIndex);

            const [styles, setStyle] = useState<CSSProperties>({});

            const { width, height } = useWindowSize();

            useEffect(() => {
                if (width) {
                    setStyle({
                        width: `${Math.abs(width - height) / 2}px`,
                    });
                }
            }, [height, width]);

            useEffect(() => {
                if (initialSlide !== activeIndexRef.current) {
                    swiperRef.current?.slideTo(initialSlide);
                }
            }, [initialSlide]);

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
                                activeIndexRef.current = swiper.activeIndex;
                                setActiveIndex(swiper.activeIndex);
                                onActiveIndexChange?.(swiper.activeIndex ?? 0);
                            }}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            {...SWIPER_CONFIG}
                        >
                            {albums.map(({ imageSrc, album, id }, index) => (
                                <SwiperSlide key={id} virtualIndex={index}>
                                    <div
                                        className={cx(
                                            'image-container',
                                            'swiper-zoom-container',
                                        )}
                                    >
                                        <CustomImage
                                            loading="lazy"
                                            src={imageSrc}
                                            alt={album}
                                            quality={100}
                                            className={cx(
                                                'image',
                                                'swiper-lazy',
                                            )}
                                            unoptimized={!isMobile && !isTablet}
                                            fill
                                        />
                                    </div>
                                    <div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
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
