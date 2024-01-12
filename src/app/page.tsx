'use client';

import { useCallback, useRef } from 'react';

import { AlbumsCoverFlowModal } from '@/app/ui/AlbumsCoverFlowModal';
import { Album } from '@/app/ui/Album';
import type { AlbumType } from '@/shared/albums';
import { ALBUMS } from '@/shared/albums';
import { AlbumsFullScreenModal } from '@/app/ui/AlbumsFullScreenModal';
import { useDisclosureState } from '@/hooks/useDisclosureState';

import styles from './page.module.scss';

const Home = () => {
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
        <main className={styles.main}>
            <div className={styles.container}>
                {ALBUMS.map((album, index) => (
                    <Album
                        {...album}
                        key={index}
                        index={index}
                        onClick={handleCoverFlowClick}
                        onCoverFlowClick={handleCoverFlowClick}
                        onFullScreenClick={handleFullScreenClick}
                    />
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
            <div />
        </main>
    );
};

export default Home;
