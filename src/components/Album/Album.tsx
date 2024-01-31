import React, { useEffect, useMemo, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import cnBind from 'classnames/bind';
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Tooltip } from '@nextui-org/react';

import { type AlbumType } from '@/shared/albums';
import { useScreenConfig } from '@/contexts/ScreenConfigProvider';
import { PlayPauseIcon } from '@/components/PlayPauseIcon';
import { useAlbums } from '@/contexts/StoreProvider';
import { useAudioPlayer } from '@/hooks/context/useAudioPlayer';

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
        songs: albumSongs,
    }: AlbumProps) => {
        const { songs } = useAlbums();
        const router = useRouter();
        const { isMobile, isTablet } = useScreenConfig();
        const imageRef = useRef<HTMLDivElement | null>(null);

        const { activeTrack, isPlaying, handleSetTrack } = useAudioPlayer();

        const activeSong = useMemo(
            () => albumSongs?.find((song) => song.id === activeTrack?.id),
            [activeTrack?.id, albumSongs],
        );

        const songIndex = useMemo(() => {
            if (activeSong) {
                return songs.findIndex((value) => value.id === activeSong.id);
            }

            const song = albumSongs?.find((song) => song.src);

            if (song) {
                return songs.findIndex((value) => value.id === song.id);
            }

            return Number.NaN;
        }, [activeSong, albumSongs, songs]);

        const canPlay = !Number.isNaN(songIndex);

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
                className={cx('album', { active: activeSong })}
            >
                <Tooltip
                    content={`${band}  ·  ${album}  ·  ${new Date(
                        releasedAt,
                    ).getFullYear()}`}
                    offset={60}
                >
                    <div className={cx('image-container')}>
                        <Image
                            className={cx('image')}
                            src={imageSrc}
                            alt={album}
                            width={200}
                            height={200}
                            quality={100}
                        />
                    </div>
                </Tooltip>
                {canPlay && (
                    <Button
                        isIconOnly
                        variant={activeSong ? 'solid' : 'flat'}
                        className={cx('play-button')}
                        onPress={() => {
                            void handleSetTrack(songIndex);
                        }}
                        color={activeSong ? 'primary' : 'default'}
                    >
                        <PlayPauseIcon isPlaying={activeSong && isPlaying} />
                    </Button>
                )}
                <div className={cx('bottom-block')}>
                    {link && (
                        <Tooltip content="Перейти в Apple Music">
                            <a
                                className={cx('link')}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src="/apple-music.png"
                                    alt="apple music"
                                    width={100}
                                    height={100}
                                    quality={100}
                                />
                            </a>
                        </Tooltip>
                    )}
                    <Tooltip content="Просмотр пластинок">
                        <Button
                            isIconOnly
                            className={cx('button', 'carousel-button')}
                            onPress={() => {
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
                                aria-hidden
                            >
                                view_carousel
                            </span>
                        </Button>
                    </Tooltip>
                    <Tooltip content="Во весь экран">
                        <Button
                            isIconOnly
                            className={cx('button', 'carousel-button')}
                            onPress={() => {
                                if (fullScreenHref) {
                                    router.push(fullScreenHref);
                                }
                            }}
                            aria-hidden
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
