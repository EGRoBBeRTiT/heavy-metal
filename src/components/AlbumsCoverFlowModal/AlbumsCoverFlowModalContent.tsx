import { ModalBody } from '@nextui-org/react';
import { useCallback, useState } from 'react';
import cnBind from 'classnames/bind';
import type Swiper from 'swiper';
import Image from 'next/image';

import { ALBUMS } from '@/shared/albums';
import type { AlbumsCoverFlowModalProps } from '@/components/AlbumsCoverFlowModal/AlbumsCoverFlowModal';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEnterListener } from '@/hooks/useEnterListener';
import { AlbumCowerFlowSwiper } from '@/components/AlbumCowerFlowSwiper';
import { cloisterBlack } from '@/styles/fonts';

import styles from './AlbumsCoverFlowModal.module.scss';

const cx = cnBind.bind(styles);

export type AlbumsCoverFlowModalContentProps = AlbumsCoverFlowModalProps;

export const AlbumsCoverFlowModalContent = ({
    initialIndex,
    onAlbumClick,
}: AlbumsCoverFlowModalContentProps) => {
    const [activeIndex, setActiveIndex] = useState(initialIndex ?? 0);

    useEnterListener(() => {
        onAlbumClick?.(ALBUMS[activeIndex], activeIndex);
    });

    const handleActiveIndexChange = useCallback((swiper: Swiper) => {
        setActiveIndex(swiper.activeIndex);
    }, []);

    return (
        <>
            <div className={cx(cloisterBlack.className, 'header')}>
                {ALBUMS[activeIndex].band}
            </div>
            <ModalBody className={cx('body')}>
                <AlbumCowerFlowSwiper
                    initialSlide={initialIndex}
                    onActiveIndexChange={handleActiveIndexChange}
                    onAlbumClick={onAlbumClick}
                />
                <div className={cx(cloisterBlack.className, 'bottom')}>
                    <span>{ALBUMS[activeIndex].releasedAt.getFullYear()}</span>
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
            </ModalBody>
        </>
    );
};
