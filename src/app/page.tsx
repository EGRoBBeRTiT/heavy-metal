'use client';

import { useDisclosure } from '@nextui-org/react';
import { useState } from 'react';

import { AlbumsCoverFlowModal } from '@/app/ui/AlbumsCoverFlowModal';
import { Album } from '@/app/ui/Album';
import { ALBUMS } from '@/shared/albums';
import { AlbumsFullScreenModal } from '@/app/ui/AlbumsFullScreenModal';

import styles from './page.module.scss';

const Home = () => {
    const [initialIndex, setIndex] = useState(0);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const {
        isOpen: isOpenFull,
        onOpen: onOpenFull,
        onOpenChange: onOpenChangeFull,
    } = useDisclosure();

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                {ALBUMS.map((album, index) => (
                    <Album
                        {...album}
                        key={index}
                        onClick={() => {
                            setIndex(index);
                            onOpen();
                        }}
                        onCoverFlowClick={() => {
                            setIndex(index);
                            onOpen();
                        }}
                        onFullScreenClick={() => {
                            setIndex(index);
                            onOpenFull();
                        }}
                    />
                ))}
            </div>
            <AlbumsCoverFlowModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="full"
                initialIndex={initialIndex}
                onAlbumClick={(_, index) => {
                    onClose();
                    setIndex(index);
                    onOpenFull();
                }}
            />
            <AlbumsFullScreenModal
                isOpen={isOpenFull}
                onOpenChange={() => {
                    onOpen();
                    onOpenChangeFull();
                }}
                onActiveIndexChange={setIndex}
                initialIndex={initialIndex}
                size="full"
            />
            <div />
        </main>
    );
};

export default Home;
