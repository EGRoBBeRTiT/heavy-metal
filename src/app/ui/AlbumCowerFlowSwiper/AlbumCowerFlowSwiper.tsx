import type { SwiperProps } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import React from 'react';
import { EffectCoverflow, Keyboard, Mousewheel } from 'swiper/modules';
import cnBind from 'classnames/bind';

import { ALBUMS } from '@/shared/albums';
import type { AlbumType } from '@/shared/albums';
import { useWindowSize } from '@/hooks/useWindowSize';

import 'swiper/css';

import styles from './AlbumCowerFlowSwiper.module.scss';

const cx = cnBind.bind(styles);

export interface AlbumSlidesListProps extends SwiperProps {
    onAlbumClick?: (album: AlbumType, index: number) => void;
    imageContainerClassName?: string;
}

export const AlbumCowerFlowSwiper = React.memo(
    ({
        onAlbumClick,
        imageContainerClassName,
        className,
        ...props
    }: AlbumSlidesListProps) => {
        const { width } = useWindowSize();

        return (
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
                {...props}
            >
                {ALBUMS.map((album, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className={cx(
                                'image-container',
                                imageContainerClassName,
                            )}
                            onClick={() => {
                                onAlbumClick?.(album, index);
                            }}
                        >
                            <Image
                                src={album.imageSrc}
                                alt={album.album}
                                width={750}
                                height={750}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        );
    },
);

AlbumCowerFlowSwiper.displayName = 'Memo (AlbumSlidesList)';
