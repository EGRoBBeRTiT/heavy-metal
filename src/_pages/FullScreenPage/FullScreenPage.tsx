'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { notFound, useSearchParams } from 'next/navigation';
import cnBind from 'classnames/bind';
import { Button } from '@nextui-org/button';
import { debounce } from 'lodash';

import { AlbumFullScreenSwiper } from '@/components/AlbumFullScreenSwiper';
import { IcClose } from '@/icons';
import { appRoutes } from '@/routes';
import { useAudioPlayerView } from '@/contexts/AudioPlayerViewProvider';
import { useScreenConfig } from '@/contexts/ScreenConfigProvider';
import { useAlbums } from '@/contexts/StoreProvider';
import { useHistory } from '@/hooks/context/useHistory';
import { useEscapeListener } from '@/hooks/useEscapeListener';

import { useFullScreen } from './FullScreenPage.hooks';
import styles from './FullScreenPage.module.scss';

const cx = cnBind.bind(styles);

export const FullScreenPage = () => {
    const searchParams = useSearchParams();
    const albumId = searchParams.get('album');

    const { albums } = useAlbums();
    const { back, replace } = useHistory();
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

    useEscapeListener(back, !isFullScreenAccessed);

    const handleSuccess = useCallback(() => {
        setIsFullScreenAccessed(true);
    }, []);
    const handleError = useCallback(() => {
        setIsFullScreenAccessed(false);
    }, []);

    useFullScreen(divRef, handleSuccess, handleError, handleError);

    const handleActiveIndexChange = useMemo(
        () =>
            debounce((index: number) => {
                if (isFullScreenAccessed) {
                    window.history.replaceState(
                        null,
                        appRoutes.fullscreen(albums[index].id),
                    );
                } else {
                    replace(appRoutes.fullscreen(albums[index].id));
                }
            }, 100),
        [albums, isFullScreenAccessed, replace],
    );

    const index = useMemo(() => {
        const foundIndex = albums.findIndex((album) => album.id === albumId);

        if (foundIndex === -1) {
            notFound();
        }

        return foundIndex;
    }, [albumId, albums]);

    return (
        <div ref={divRef} className={cx('page', { mounted })}>
            <AlbumFullScreenSwiper
                initialSlide={index}
                onActiveIndexChange={handleActiveIndexChange}
            />
            <Button
                isIconOnly
                className={cx('close-button')}
                onPress={back}
                size="lg"
            >
                <IcClose />
            </Button>
        </div>
    );
};
