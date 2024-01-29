'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, notFound } from 'next/navigation';
import cnBind from 'classnames/bind';
import { Button } from '@nextui-org/button';

import { AlbumFullScreenSwiper } from '@/components/AlbumFullScreenSwiper';
import { IcClose } from '@/icons';
import { appRoutes } from '@/routes';
import { useAudioPlayerView } from '@/contexts/AudioPlayerViewProvider';
import { useScreenConfig } from '@/contexts/ScreenConfigProvider';
import { useAlbums } from '@/contexts/StoreProvider';

import { useFullScreen } from './FullScreenPage.hooks';
import styles from './FullScreenPage.module.scss';

const cx = cnBind.bind(styles);

export interface FullScreenPageProps {
    albumId?: string;
}

export const FullScreenPage = ({ albumId }: FullScreenPageProps) => {
    const { albums } = useAlbums();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isFullScreenAccessed, setIsFullScreenAccessed] = useState(false);

    const { setStyles, setView } = useAudioPlayerView();

    const { isMobile } = useScreenConfig();

    useEffect(() => {
        setMounted(true);

        if (isMobile) {
            setStyles({ position: 'fixed' });

            return () => {
                setStyles(null);
            };
        }

        setView('compact');

        setStyles({ maxWidth: '18%', bottom: '100px', position: 'fixed' });

        return () => {
            setView('full');
            setStyles(null);
        };
    }, [setStyles, setView, isMobile]);

    const divRef = useRef<HTMLDivElement | null>(null);

    const handlePushBack = useCallback(() => {
        router.back();
    }, [router]);

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.code === 'Escape') {
                handlePushBack();
            }
        };

        if (!isFullScreenAccessed) {
            document.addEventListener('keydown', listener);

            return () => {
                document.removeEventListener('keydown', listener);
            };
        }
    }, [handlePushBack, isFullScreenAccessed]);

    const handleSuccess = useCallback(() => {
        setIsFullScreenAccessed(true);
    }, []);
    const handleError = useCallback(() => {
        setIsFullScreenAccessed(false);
    }, []);

    useFullScreen(divRef, handleSuccess, handleError, handlePushBack);

    const handleActiveIndexChange = useCallback(
        (index: number) => {
            window.history.replaceState(
                null,
                '',
                appRoutes.fullscreen(albums[index].id),
            );
        },
        [albums],
    );

    const index = useMemo(() => {
        const foundIndex = albums.findIndex((album) => album.id === albumId);

        if (foundIndex === -1) {
            notFound();
        }

        return foundIndex;
    }, [albumId, albums]);

    return (
        <div className={cx('page', { mounted })}>
            <AlbumFullScreenSwiper
                ref={divRef}
                initialSlide={index}
                onActiveIndexChange={handleActiveIndexChange}
            />
            {!isFullScreenAccessed && (
                <Button
                    isIconOnly
                    className={cx('close-button')}
                    onPress={handlePushBack}
                    size="lg"
                >
                    <IcClose />
                </Button>
            )}
        </div>
    );
};
