'use client';

import { Suspense, useCallback, useRef } from 'react';

import { AlbumsCoverFlowModal } from '@/components/AlbumsCoverFlowModal';
import { AlbumLazy, AlbumSkeleton } from '@/components/Album';
import type { AlbumType } from '@/shared/albums';
import { ALBUMS } from '@/shared/albums';
import { AlbumsFullScreenModal } from '@/components/AlbumsFullScreenModal';
import { useDisclosureState } from '@/hooks/useDisclosureState';

import styles from './InteractivePageContent.module.scss';

export const InteractivePageContent = () => {
    const activeIndex = useRef(0);

    const [
        isOpenCoverFlow,
        onOpenCoverFlow,
        onCloseCoverFlow,
        onOpenChangeCoverFlow,
    ] = useDisclosureState();

    const [isOpenFull, onOpenFull, , onOpenChangeFull] = useDisclosureState();

    const setActiveIndex = useCallback((index: number) => {
        activeIndex.current = index;
    }, []);

    const handleAlbumCoverFlowClick = useCallback(
        (album: AlbumType, index: number) => {
            setActiveIndex(index);
            onCloseCoverFlow();
            setTimeout(onOpenFull);
        },
        [onCloseCoverFlow, onOpenFull, setActiveIndex],
    );

    const handleFullScreenChange = useCallback(() => {
        onOpenChangeFull();
        setTimeout(onOpenCoverFlow);
    }, [onOpenChangeFull, onOpenCoverFlow]);

    const handleCoverFlowClick = useCallback(
        (index?: number) => {
            setActiveIndex(index ?? 0);
            onOpenCoverFlow();
        },
        [onOpenCoverFlow, setActiveIndex],
    );

    const handleFullScreenClick = useCallback(
        (index?: number) => {
            setActiveIndex(index ?? 0);
            onOpenFull();
        },
        [onOpenFull, setActiveIndex],
    );

    return (
        <>
            <div className={styles.container}>
                {ALBUMS.map((album, index) => (
                    <Suspense key={index} fallback={<AlbumSkeleton />}>
                        <AlbumLazy
                            {...album}
                            key={index}
                            index={index}
                            onClick={handleCoverFlowClick}
                            onCoverFlowClick={handleCoverFlowClick}
                            onFullScreenClick={handleFullScreenClick}
                        />
                    </Suspense>
                ))}
            </div>
            <AlbumsCoverFlowModal
                isOpen={isOpenCoverFlow}
                onOpenChange={onOpenChangeCoverFlow}
                size="full"
                initialIndex={activeIndex.current}
                onAlbumClick={handleAlbumCoverFlowClick}
            />
            <AlbumsFullScreenModal
                isOpen={isOpenFull}
                onOpenChange={handleFullScreenChange}
                onActiveIndexChange={setActiveIndex}
                initialIndex={activeIndex.current}
                size="full"
            />
        </>
    );
};
