'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import type SwiperProps from 'swiper';
import Image from 'next/image';
import React, { Suspense, useCallback, useState } from 'react';
import { EffectCoverflow, Keyboard, Mousewheel } from 'swiper/modules';
import cnBind from 'classnames/bind';
import { useRouter } from 'next/navigation';
import { Spinner } from '@nextui-org/react';

import { ALBUMS } from '@/shared/albums';
import { useWindowSize } from '@/hooks/useWindowSize';
import { cloisterBlack } from '@/styles/fonts';
import { appRoutes } from '@/routes';
import { useEnterListener } from '@/hooks/useEnterListener';
import { ImageSlideLazy } from '@/components/AlbumFullScreenSwiper/ImageSlide';

import styles from './AlbumCowerFlowSwiper.module.scss';

import 'swiper/css';

const cx = cnBind.bind(styles);

export interface AlbumCowerFlowSwiperProps {
    initialSlide?: number;
    className?: string;
}

export const AlbumCowerFlowSwiper = React.memo(
    ({ initialSlide = 0, className }: AlbumCowerFlowSwiperProps) => {
        const router = useRouter();
        const [activeIndex, setActiveIndex] = useState(initialSlide ?? 0);

        const { width } = useWindowSize();

        const handleActiveIndexChange = useCallback((swiper: SwiperProps) => {
            window.history.replaceState(
                null,
                '',
                appRoutes.coverflow(swiper.activeIndex),
            );
            setActiveIndex(swiper.activeIndex);
        }, []);

        useEnterListener(() => {
            router.replace(appRoutes.fullscreen(activeIndex));
        });

        return (
            <div className={cx('content-container')}>
                <div className={cx(cloisterBlack.className, 'header')}>
                    {ALBUMS[activeIndex].band}
                </div>
                <div className={cx('body')}>
                    <Swiper
                        className={cx('swiper', className)}
                        effect="coverflow"
                        grabCursor
                        centeredSlides
                        slidesPerView="auto"
                        coverflowEffect={{
                            rotate: 15,
                            stretch: 0.1 * width,
                            depth: 0.1 * width,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        modules={[Keyboard, EffectCoverflow, Mousewheel]}
                        mousewheel
                        keyboard={{
                            enabled: true,
                        }}
                        lazyPreloadPrevNext={4}
                        initialSlide={initialSlide}
                        onActiveIndexChange={handleActiveIndexChange}
                    >
                        {ALBUMS.map((album, index) => (
                            <SwiperSlide key={index}>
                                <Suspense fallback={<Spinner />}>
                                    <ImageSlideLazy
                                        as={Image}
                                        src={album.imageSrc}
                                        alt={album.album}
                                        width={750}
                                        height={750}
                                        onClick={() => {
                                            router.replace(
                                                appRoutes.fullscreen(index),
                                            );
                                        }}
                                        loading="lazy"
                                    />
                                </Suspense>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className={cx(cloisterBlack.className, 'bottom')}>
                        <span>
                            {ALBUMS[activeIndex].releasedAt.getFullYear()}
                        </span>
                        <span className={cx('album-label')}>
                            {ALBUMS[activeIndex].album}
                            {ALBUMS[activeIndex].link && (
                                <a
                                    className={cx('link')}
                                    target="_blank"
                                    rel="noopener"
                                    href={ALBUMS[activeIndex].link}
                                >
                                    <Image
                                        src="/apple-music.png"
                                        alt="apple music"
                                        width={100}
                                        height={100}
                                        quality={100}
                                    />
                                </a>
                            )}
                        </span>
                    </div>
                </div>
            </div>
        );
    },
);

AlbumCowerFlowSwiper.displayName = 'Memo (AlbumCowerFlowSwiper)';
