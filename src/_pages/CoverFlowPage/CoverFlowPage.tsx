'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import cnBind from 'classnames/bind';
import { Modal, ModalContent, ModalBody, Button } from '@nextui-org/react';

import { AlbumCowerFlowSwiper } from '@/components/AlbumCowerFlowSwiper';
import { useAudioPlayerView } from '@/contexts/AudioPlayerViewProvider';
import { useScreenConfig } from '@/contexts/ScreenConfigProvider';
import { IcClose } from '@/icons';

import styles from './CoverFlowPage.module.scss';

const cx = cnBind.bind(styles);

export interface CoverFlowPageProps {
    index?: string;
}

export const CoverFlowPage = ({ index }: CoverFlowPageProps) => {
    const router = useRouter();

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
                            <AlbumCowerFlowSwiper
                                initialSlide={Number(index)}
                            />
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
        </main>
    );
};
