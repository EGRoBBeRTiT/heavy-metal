'use client';

import { useEffect, useMemo } from 'react';
import { notFound, useRouter } from 'next/navigation';
import cnBind from 'classnames/bind';
import { Modal, ModalContent, ModalBody, Button } from '@nextui-org/react';

import { AlbumCowerFlowSwiper } from '@/components/AlbumCowerFlowSwiper';
import { useAudioPlayerView } from '@/contexts/AudioPlayerViewProvider';
import { useScreenConfig } from '@/contexts/ScreenConfigProvider';
import { IcClose } from '@/icons';
import { useAlbums } from '@/contexts/StoreProvider';

import styles from './CoverFlowPage.module.scss';

const cx = cnBind.bind(styles);

export interface CoverFlowPageProps {
    albumId?: string;
}

export const CoverFlowPage = ({ albumId }: CoverFlowPageProps) => {
    const router = useRouter();
    const { albums } = useAlbums();

    const { isMobile } = useScreenConfig();

    const { setView, setStyles } = useAudioPlayerView();

    useEffect(() => {
        if (isMobile) {
            setStyles({ position: 'fixed' });

            return () => {
                setStyles(null);
            };
        }

        setView('compact');

        return () => {
            setView('full');
        };
    }, [isMobile, setStyles, setView]);

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.code === 'Escape') {
                router.back();
            }
        };

        document.addEventListener('keydown', listener);

        return () => {
            document.removeEventListener('keydown', listener);
        };
    }, [router]);

    const index = useMemo(() => {
        const foundIndex = albums.findIndex((album) => album.id === albumId);

        if (foundIndex === -1) {
            notFound();
        }

        return foundIndex;
    }, [albumId, albums]);

    return (
        <main className={cx('main')}>
            <Modal
                isOpen
                defaultOpen
                onOpenChange={() => {
                    router.back();
                }}
                placement="center"
                scrollBehavior="inside"
                size="full"
                className={cx('modal')}
                isDismissable={false}
                closeButton={false}
                hideCloseButton
            >
                <ModalContent>
                    {(onClose) => (
                        <ModalBody className={cx('body')}>
                            <Button
                                size="lg"
                                isIconOnly
                                radius="full"
                                variant="light"
                                className={cx('close-button')}
                                onClick={() => {
                                    onClose();
                                }}
                            >
                                <IcClose />
                            </Button>
                            <AlbumCowerFlowSwiper initialSlide={index} />
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
        </main>
    );
};
