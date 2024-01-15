import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import cnBind from 'classnames/bind';
import { Button } from '@nextui-org/button';
import NextImage from 'next/image';
import { useRouter } from 'next/navigation';
import { Image, Tooltip } from '@nextui-org/react';

import type { AlbumType } from '@/shared/albums';
import { useScreenConfig } from '@/contexts/ScreenConfigProvider';

import styles from './Album.module.scss';

export interface AlbumProps extends AlbumType {
    fullScreenHref?: string;
    href?: string;
    coverFlowHref?: string;
}
const cx = cnBind.bind(styles);

export const Album = React.memo(
    ({
        imageSrc,
        album,
        releasedAt,
        band,
        link,
        href,
        fullScreenHref,
        coverFlowHref,
    }: AlbumProps) => {
        const router = useRouter();
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
                onClick={() => {
                    if (href) {
                        router.push(href);
                    }
                }}
                ref={imageRef}
                className={cx('album')}
            >
                <Tooltip
                    content={`${band}  ·  ${album}  ·  ${releasedAt.getFullYear()}`}
                    offset={60}
                >
                    <div className={cx('image-container')}>
                        <Image
                            as={NextImage}
                            className={cx('image')}
                            src={imageSrc}
                            alt={album}
                            width={200}
                            height={200}
                            quality={100}
                        />
                    </div>
                </Tooltip>
                <div className={cx('bottom-block')}>
                    {link && (
                        <a
                            className={cx('link')}
                            href={link}
                            target="_blank"
                            rel="noopener"
                        >
                            <NextImage
                                src="/apple-music.png"
                                alt="apple music"
                                width={100}
                                height={100}
                                quality={100}
                            />
                        </a>
                    )}
                    <Button
                        isIconOnly
                        className={cx('button', 'carousel-button')}
                        onClick={() => {
                            if (coverFlowHref) {
                                router.push(coverFlowHref);
                            }
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
                    <Tooltip content="Во весь экран">
                        <Button
                            isIconOnly
                            className={cx('button', 'carousel-button')}
                            onClick={() => {
                                if (fullScreenHref) {
                                    router.push(fullScreenHref);
                                }
                            }}
                        >
                            <span className="material-symbols-outlined">
                                fullscreen
                            </span>
                        </Button>
                    </Tooltip>
                </div>
            </div>
        );
    },
);

export default Album;

Album.displayName = 'Memo (Album)';
