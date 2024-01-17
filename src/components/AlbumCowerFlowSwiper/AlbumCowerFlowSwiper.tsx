'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import type SwiperProps from 'swiper';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import React, {
    Suspense,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { EffectCoverflow, Keyboard, Mousewheel } from 'swiper/modules';
import cnBind from 'classnames/bind';
import { useRouter } from 'next/navigation';

import { ALBUMS } from '@/shared/albums';
import { cloisterBlack } from '@/styles/fonts';
import { appRoutes } from '@/routes';
import { useEnterListener } from '@/hooks/useEnterListener';
import { AlbumSkeleton } from '@/components/Album';
import { LazyImage } from '@/components/LazyImage';

import 'swiper/css';

import styles from './AlbumCowerFlowSwiper.module.scss';

const cx = cnBind.bind(styles);

export interface AlbumCowerFlowSwiperProps {
    initialSlide?: number;
    className?: string;
}

export const AlbumCowerFlowSwiper = React.memo(
    ({ initialSlide = 0, className }: AlbumCowerFlowSwiperProps) => {
        const [swiperStyle, setSwiperStyle] = useState<CSSProperties>({});
        const bottomRef = useRef<HTMLDivElement | null>(null);
        const router = useRouter();
        const [activeIndex, setActiveIndex] = useState(initialSlide ?? 0);

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

        useEffect(() => {
            setSwiperStyle({
                paddingBlockEnd: `calc(${
                    bottomRef.current?.clientHeight ?? 24
                }px - var(--bottom-block-padding))`,
            });
        }, []);

        return (
            <div className={cx('content-container')}>
                <header className={cx(cloisterBlack.className, 'header')}>
                    <h1>{ALBUMS[activeIndex].band}</h1>
                </header>
                <div className={cx('body')}>
                    <Swiper
                        style={swiperStyle}
                        className={cx('swiper', className)}
                        effect="coverflow"
                        grabCursor
                        centeredSlides
                        slidesPerView="auto"
                        coverflowEffect={{
                            rotate: 30,
                            stretch: 200,
                            depth: 200,
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
                                <Suspense
                                    fallback={
                                        <AlbumSkeleton
                                            className={cx('skeleton')}
                                        />
                                    }
                                >
                                    <LazyImage
                                        src={album.imageSrc}
                                        alt={album.album}
                                        width={750}
                                        height={750}
                                        onClick={() => {
                                            router.replace(
                                                appRoutes.fullscreen(index),
                                            );
                                        }}
                                    />
                                </Suspense>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div
                        ref={bottomRef}
                        className={cx(cloisterBlack.className, 'bottom')}
                    >
                        <span>
                            {ALBUMS[activeIndex].releasedAt.getFullYear()}
                        </span>
                        <span className={cx('album-label')}>
                            {ALBUMS[activeIndex].album}
                            {ALBUMS[activeIndex].link && (
                                <a
                                    className={cx('link')}
                                    target="_blank"
                                    rel="noopener noreferrer"
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