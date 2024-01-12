/* eslint-disable @next/next/no-img-element */
import { ModalBody } from '@nextui-org/react';
import { useCallback, useState } from 'react';
import cnBind from 'classnames/bind';
import type Swiper from 'swiper';

import { ALBUMS } from '@/shared/albums';
import { cloisterBlack } from '@/shared/fonts/fonts';
import type { AlbumsCoverFlowModalProps } from '@/app/ui/AlbumsCoverFlowModal/AlbumsCoverFlowModal';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEnterListener } from '@/hooks/useEnterListener';
import { AlbumCowerFlowSwiper } from '@/app/ui/AlbumCowerFlowSwiper';

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
    );
};
