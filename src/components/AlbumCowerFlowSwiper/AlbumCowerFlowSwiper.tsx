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

import { cloisterBlack } from '@/styles/fonts';
import { appRoutes } from '@/routes';
import { useEnterListener } from '@/hooks/useEnterListener';
import { AlbumSkeleton } from '@/components/Album';
import { LazyImage } from '@/components/LazyImage';
import { useScreenConfig } from '@/contexts/ScreenConfigProvider';
import { useAlbums } from '@/contexts/StoreProvider';

import 'swiper/css';

import styles from './AlbumCowerFlowSwiper.module.scss';

const cx = cnBind.bind(styles);

export interface AlbumCowerFlowSwiperProps {
    initialSlide?: number;
    className?: string;
}

export const AlbumCowerFlowSwiper = React.memo(
    ({ initialSlide = 0, className }: AlbumCowerFlowSwiperProps) => {
        const { albums } = useAlbums();
        const { isMobile, isTablet } = useScreenConfig();
        const [swiperStyle, setSwiperStyle] = useState<CSSProperties>({});
        const bottomRef = useRef<HTMLDivElement | null>(null);
        const router = useRouter();
        const [activeIndex, setActiveIndex] = useState(initialSlide ?? 0);

        const handleActiveIndexChange = useCallback(
            (swiper: SwiperProps) => {
                window.history.replaceState(
                    null,
                    '',
                    appRoutes.coverflow(albums[swiper.activeIndex].id),
                );
                setActiveIndex(swiper.activeIndex);
            },
            [albums],
        );

        useEnterListener(() => {
            router.replace(appRoutes.fullscreen(albums[activeIndex].id));
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
                    <h1>{albums[activeIndex].band}</h1>
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
                        {albums.map((album, index) => (
                            <SwiperSlide key={index}>
                                <Suspense
                                    fallback={
                                        <AlbumSkeleton
                                            className={cx('skeleton')}
                                        />
                                    }
                                >
                                    <LazyImage
                                        id={`image-${index}`}
                                        className={cx('class-10')}
                                        src={album.imageSrc}
                                        alt={album.album}
                                        width={isMobile || isTablet ? 300 : 750}
                                        height={
                                            isMobile || isTablet ? 300 : 750
                                        }
                                        onClick={() => {
                                            router.replace(
                                                appRoutes.fullscreen(album.id),
                                            );
                                        }}
                                        withReflect
                                        priority={activeIndex === index}
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
                            {new Date(
                                albums[activeIndex].releasedAt,
                            ).getFullYear()}
                        </span>
                        <span className={cx('album-label')}>
                            {albums[activeIndex].album}
                            {albums[activeIndex].link && (
                                <a
                                    className={cx('link')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={albums[activeIndex].link}
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
