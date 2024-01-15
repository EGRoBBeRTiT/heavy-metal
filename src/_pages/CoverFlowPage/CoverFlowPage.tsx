'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import cnBind from 'classnames/bind';
import { Modal, ModalContent, ModalBody } from '@nextui-org/react';

import { AlbumCowerFlowSwiper } from '@/components/AlbumCowerFlowSwiper';

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
            >
                <ModalContent>
                    {() => (
                        <ModalBody>
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
