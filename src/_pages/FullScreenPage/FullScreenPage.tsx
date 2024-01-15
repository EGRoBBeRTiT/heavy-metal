'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import cnBind from 'classnames/bind';
import { Button } from '@nextui-org/button';

import { AlbumFullScreenSwiper } from '@/components/AlbumFullScreenSwiper';
import { IcClose } from '@/icons';
import { appRoutes } from '@/routes';

import { useFullScreen } from './FullScreenPage.hooks';
import styles from './FullScreenPage.module.scss';

const cx = cnBind.bind(styles);

export interface FullScreenPageProps {
    index?: string;
}

export const FullScreenPage = ({ index }: FullScreenPageProps) => {
    const router = useRouter();
    const [isFullScreenAccessed, setIsFullScreenAccessed] = useState(false);
    // const [activeIndex, setActiveIndex] = useState(Number(index));

    const divRef = useRef<HTMLDivElement | null>(null);

    const handlePushBack = useCallback(() => {
        router.back();

        // router.replace(appRoutes.coverflow(activeIndex));
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

    const handleActiveIndexChange = useCallback((index: number) => {
        window.history.replaceState(null, '', appRoutes.fullscreen(index));
        // setActiveIndex(index);
    }, []);

    return (
        <main>
            <AlbumFullScreenSwiper
                ref={divRef}
                initialSlide={Number(index)}
                onActiveIndexChange={handleActiveIndexChange}
            />
            {!isFullScreenAccessed && (
                <Button
                    isIconOnly
                    className={cx('close-button')}
                    onClick={handlePushBack}
                    size="lg"
                >
                    <IcClose />
                </Button>
            )}
        </main>
    );
};
