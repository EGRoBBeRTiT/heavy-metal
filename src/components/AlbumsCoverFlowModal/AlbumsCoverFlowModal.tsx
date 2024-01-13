import { Modal, ModalContent, type ModalProps } from '@nextui-org/react';
import cnBind from 'classnames/bind';

import type { AlbumType } from '@/shared/albums';

import { AlbumsCoverFlowModalContent } from './AlbumsCoverFlowModalContent';
import styles from './AlbumsCoverFlowModal.module.scss';

const cx = cnBind.bind(styles);

export interface AlbumsCoverFlowModalProps
    extends Omit<ModalProps, 'children'> {
    initialIndex?: number;
    onAlbumClick?: (album: AlbumType, index: number) => void;
}

export const AlbumsCoverFlowModal = ({
    initialIndex,
    onAlbumClick,
    ...props
}: AlbumsCoverFlowModalProps) => (
    <Modal {...props} className={cx('modal')} hideCloseButton>
        <ModalContent>
            {() => (
                <div className={cx('content-container')}>
                    <AlbumsCoverFlowModalContent
                        initialIndex={initialIndex}
                        onAlbumClick={onAlbumClick}
                    />
                </div>
            )}
        </ModalContent>
    </Modal>
);
