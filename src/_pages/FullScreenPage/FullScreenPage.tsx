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
    const [mounted, setMounted] = useState(false);
    const [isFullScreenAccessed, setIsFullScreenAccessed] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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

    const handleActiveIndexChange = useCallback((index: number) => {
        window.history.replaceState(null, '', appRoutes.fullscreen(index));
    }, []);

    return (
        <div className={cx('page', { mounted })}>
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
        </div>
    );
};
