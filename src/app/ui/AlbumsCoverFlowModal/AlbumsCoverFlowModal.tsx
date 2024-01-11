/* eslint-disable @next/next/no-img-element */
import type { ModalProps } from '@nextui-org/react';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Keyboard, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import cnBind from 'classnames/bind';

import type { AlbumType } from '@/shared/albums';
import { ALBUMS } from '@/shared/albums';
import { cloisterBlack } from '@/shared/fonts/fonts';

import styles from './AlbumsCoverFlowModal.module.scss';

const cx = cnBind.bind(styles);

export interface AlbumsModalProps extends Omit<ModalProps, 'children'> {
    initialIndex?: number;
    onAlbumClick?: (album: AlbumType, index: number) => void;
}

export const AlbumsCoverFlowModal = ({
    initialIndex,
    onAlbumClick,
    ...props
}: AlbumsModalProps) => {
    const [activeIndex, setActiveIndex] = useState(initialIndex ?? 0);
    const activeIndexRef = useRef<number>(activeIndex);
    const onAlbumClickRef = useRef(onAlbumClick);

    useEffect(() => {
        activeIndexRef.current = activeIndex;
    }, [activeIndex]);

    useEffect(() => {
        onAlbumClickRef.current = onAlbumClick;
    }, [onAlbumClick]);

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                event.preventDefault();

                onAlbumClickRef.current?.(
                    ALBUMS[activeIndexRef.current],
                    activeIndexRef.current,
                );
            }
        };
        document.addEventListener('keydown', listener);

        return () => {
            document.removeEventListener('keydown', listener);
        };
    }, []);

    return (
        <Modal {...props}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader
                            className={`flex flex-col gap-1 ${cloisterBlack.className} ${styles.header}`}
                        >
                            {ALBUMS[activeIndex].band}
                        </ModalHeader>
                        <ModalBody>
                            <div className={styles.content}>
                                <Swiper
                                    effect="coverflow"
                                    grabCursor
                                    centeredSlides
                                    slidesPerView="auto"
                                    coverflowEffect={{
                                        rotate: 15,
                                        stretch: 160,
                                        depth: 150,
                                        modifier: 1.7,
                                        slideShadows: true,
                                    }}
                                    modules={[
                                        Keyboard,
                                        EffectCoverflow,
                                        Mousewheel,
                                    ]}
                                    mousewheel
                                    keyboard={{
                                        enabled: true,
                                    }}
                                    initialSlide={initialIndex}
                                    onActiveIndexChange={(swiper) => {
                                        setActiveIndex(swiper.activeIndex);
                                    }}
                                    lazyPreloadPrevNext={0}
                                >
                                    {ALBUMS.map(
                                        (
                                            { imageSrc, album, ...albumProps },
                                            index,
                                        ) => (
                                            <SwiperSlide key={index}>
                                                <div
                                                    onClick={() => {
                                                        onAlbumClick?.(
                                                            {
                                                                imageSrc,
                                                                album,
                                                                ...albumProps,
                                                            },
                                                            index,
                                                        );
                                                    }}
                                                >
                                                    <Image
                                                        src={imageSrc}
                                                        alt={album}
                                                        width={1000}
                                                        height={1000}
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ),
                                    )}
                                </Swiper>
                            </div>
                            <div
                                className={`${styles.bottom} ${cloisterBlack.className}`}
                            >
                                <span>
                                    {ALBUMS[
                                        activeIndex
                                    ].releasedAt.getFullYear()}
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
                                            <img
                                                src="apple-music.png"
                                                alt="apple music"
                                                width={40}
                                                height={40}
                                            />
                                        </a>
                                    )}
                                </span>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
