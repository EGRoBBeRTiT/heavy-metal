/* eslint-disable @next/next/no-img-element */
import type { ModalProps } from '@nextui-org/react';
import { Modal, ModalBody, ModalContent } from '@nextui-org/react';
import cnBind from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Keyboard,
    Pagination,
    Zoom,
    Scrollbar,
    Mousewheel,
} from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import type { AlbumType } from '@/shared/albums';
import { ALBUMS } from '@/shared/albums';
import { useScreenConfig } from '@/contexts/ScreenConfigProvider';
import { cloisterBlack, playfair } from '@/styles/fonts';

import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import styles from './AlbumsFullScreenModal.module.scss';

const cx = cnBind.bind(styles);

export interface AlbumsModalProps extends Omit<ModalProps, 'children'> {
    initialIndex?: number;
    onActiveIndexChange?: (index: number) => void;
}

export const AlbumsFullScreenModal = ({
    initialIndex,
    onActiveIndexChange,
    ...props
}: AlbumsModalProps) => {
    const divRef = useRef<HTMLDivElement | null>(null);

    const { isMobile } = useScreenConfig();

    const [zoomed, setZoomed] = useState(false);
    const [activeAlbum, setActiveAlbum] = useState<AlbumType>(
        ALBUMS[initialIndex ?? 0],
    );

    useEffect(() => {
        document.onfullscreenchange = () => {
            if (!document.fullscreenElement) {
                props.onOpenChange?.(props.isOpen ?? false);
            }
        };
    }, [props]);

    useEffect(() => {
        if (props.isOpen) {
            if (!document.fullscreenElement) {
                void divRef.current?.requestFullscreen();
            } else {
                void document.exitFullscreen();
            }
        }
    }, [props.onOpenChange, props.isOpen]);

    return (
        <Modal scrollBehavior="normal" {...props} className={styles.modal}>
            <ModalContent>
                {() => (
                    <ModalBody className={styles.body}>
                        <div ref={divRef} className={cx('body-container')}>
                            <div className={styles.content}>
                                <Swiper
                                    centeredSlides
                                    slidesPerView={1}
                                    pagination={{
                                        dynamicBullets: true,
                                        clickable: true,
                                    }}
                                    modules={[
                                        Keyboard,
                                        Pagination,
                                        Zoom,
                                        Scrollbar,
                                        Mousewheel,
                                    ]}
                                    mousewheel
                                    zoom
                                    keyboard={{
                                        enabled: true,
                                    }}
                                    scrollbar={{
                                        hide: true,
                                    }}
                                    onZoomChange={() => {
                                        setZoomed((prev) => !prev);
                                    }}
                                    initialSlide={initialIndex}
                                    onActiveIndexChange={(swiper) => {
                                        setActiveAlbum(
                                            ALBUMS[swiper.activeIndex],
                                        );
                                        onActiveIndexChange?.(
                                            swiper.activeIndex,
                                        );
                                    }}
                                    lazyPreloadPrevNext={0}
                                >
                                    {ALBUMS.map(
                                        ({ imageSrc, album }, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="swiper-zoom-container">
                                                    <img
                                                        src={imageSrc}
                                                        alt={album}
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ),
                                    )}
                                </Swiper>
                            </div>
                            {!isMobile && (
                                <div
                                    className={cx(
                                        'left-info',
                                        cloisterBlack.className,
                                        {
                                            hidden: zoomed,
                                        },
                                    )}
                                >
                                    <span>{activeAlbum.band}</span>
                                    <span>
                                        {activeAlbum.releasedAt.getFullYear()}
                                    </span>
                                    <span>{activeAlbum.album}</span>
                                    {activeAlbum.link && (
                                        <a
                                            className={cx('link')}
                                            target="_blank"
                                            rel="noopener"
                                            href={activeAlbum.link}
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
                                </div>
                            )}
                            {!isMobile &&
                                activeAlbum.songs &&
                                activeAlbum.songs.length && (
                                    <div
                                        className={cx(
                                            'right-info',
                                            playfair.className,
                                            {
                                                hidden: zoomed,
                                            },
                                        )}
                                    >
                                        <span>Список композиций</span>
                                        {activeAlbum.songs.map(
                                            (song, index) => (
                                                <span key={index}>{`${
                                                    index + 1
                                                }. ${song}`}</span>
                                            ),
                                        )}
                                    </div>
                                )}
                        </div>
                    </ModalBody>
                )}
            </ModalContent>
        </Modal>
    );
};
