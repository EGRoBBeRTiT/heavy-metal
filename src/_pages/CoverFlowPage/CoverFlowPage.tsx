'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';
import cnBind from 'classnames/bind';

import { AlbumCowerFlowSwiper } from '@/components/AlbumCowerFlowSwiper';
import { appRoutes } from '@/routes';
import { IcClose } from '@/icons';

import styles from './CoverFlowPage.module.scss';

const cx = cnBind.bind(styles);

export interface CoverFlowPageProps {
    index?: string;
}

export const CoverFlowPage = ({ index }: CoverFlowPageProps) => {
    const router = useRouter();

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.code === 'Escape') {
                router.replace(appRoutes.interactive());
            }
        };

        document.addEventListener('keydown', listener);

        return () => {
            document.removeEventListener('keydown', listener);
        };
    }, [router]);

    return (
        <main>
            <AlbumCowerFlowSwiper initialSlide={Number(index)} />
            <Button
                isIconOnly
                className={cx('close-button')}
                onClick={() => {
                    router.replace(appRoutes.interactive());
                }}
                size="lg"
                variant="light"
            >
                <IcClose />
            </Button>
        </main>
    );
};
