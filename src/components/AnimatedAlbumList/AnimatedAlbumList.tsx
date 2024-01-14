import cnBind from 'classnames/bind';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import type { AlbumListProps } from '@/components/AlbumList/AlbumList';
import { AlbumList } from '@/components/AlbumList/AlbumList';

import styles from './AnimatedAlbumList.module.scss';

const cx = cnBind.bind(styles);

export type AnimatedAlbumListProps = Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'children' | 'ref'
> &
    Pick<
        AlbumListProps,
        | 'quality'
        | 'albumsInRow'
        | 'width'
        | 'mobileAlbumsInRow'
        | 'mobileWidth'
    >;

export const AnimatedAlbumList = ({
    className,
    quality = 50,
    albumsInRow = 10,
    width = 80,
    mobileWidth = 80,
    mobileAlbumsInRow,
    ...props
}: AnimatedAlbumListProps) => (
    <div {...props} className={cx('container', className)}>
        <div className={cx('albums-list-container')}>
            {Array.from({ length: 2 }).map((_, index) => (
                <div className={cx('list-wrapper')} key={index}>
                    <AlbumList
                        albumsInRow={albumsInRow}
                        width={width}
                        mobileWidth={mobileWidth}
                        quality={quality}
                        mobileAlbumsInRow={mobileAlbumsInRow}
                    />
                </div>
            ))}
        </div>
    </div>
);
