/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import cnBind from 'classnames/bind';
import { Button } from '@nextui-org/button';

import type { AlbumType } from '@/shared/albums';
import { useScreenConfig } from '@/contexts/ScreenConfigProvider';

import styles from './Album.module.scss';

export interface AlbumProps extends AlbumType {
    index?: number;
    onClick?: (index?: number) => void;
    onCoverFlowClick?: (index?: number) => void;
    onFullScreenClick?: (index?: number) => void;
}
const cx = cnBind.bind(styles);

export const Album = React.memo(
    ({
        imageSrc,
        album,
        releasedAt,
        band,
        onClick,
        onCoverFlowClick,
        onFullScreenClick,
        link,
        index,
    }: AlbumProps) => {
        const { isMobile, isTablet } = useScreenConfig();
        const imageRef = useRef<HTMLDivElement | null>(null);

        useEffect(() => {
            setTimeout(() => {
                if (!isMobile && !isTablet) {
                    VanillaTilt.init(imageRef.current as HTMLElement, {
                        max: 16,
                        speed: 1000,
                        scale: 1.5,
                        glare: true,
                        'max-glare': 0.4,
                    });
                }
            });
        }, [isMobile, isTablet]);

        return (
            <div
                ref={imageRef}
                className={styles.album}
                onClick={() => {
                    onClick?.(index);
                }}
            >
                <Image
                    className={styles.image}
                    src={imageSrc}
                    alt={album}
                    width={400}
                    height={400}
                    title={`${band}  ·  ${album}  ·  ${releasedAt.getFullYear()}`}
                />
                <div className={cx('bottom-block')}>
                    {link && (
                        <a
                            className={cx('link')}
                            href={link}
                            target="_blank"
                            rel="noopener"
                        >
                            <img src="apple-music.png" alt="apple music" />
                        </a>
                    )}
                    <Button
                        isIconOnly
                        className={cx('button', 'carousel-button')}
                        onClick={() => {
                            onCoverFlowClick?.(index);
                        }}
                    >
                        <span
                            className={cx(
                                'material-symbols-outlined',
                                'carousel-icon',
                            )}
                        >
                            view_carousel
                        </span>
                    </Button>
                    <Button
                        isIconOnly
                        className={cx('button', 'carousel-button')}
                        onClick={() => {
                            onFullScreenClick?.(index);
                        }}
                    >
                        <span className="material-symbols-outlined">
                            fullscreen
                        </span>
                    </Button>
                </div>
            </div>
        );
    },
);

Album.displayName = 'Memo (Album)';
