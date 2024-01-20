import cnBind from 'classnames/bind';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ScrollShadow } from '@nextui-org/react';

import type { AlbumType } from '@/shared/albums';

import styles from './SongList.module.scss';

const cx = cnBind.bind(styles);

export interface SongListProps
    extends Omit<
        DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
        'ref' | 'children'
    > {
    album: AlbumType;
}

export const SongList = ({ album, className, ...props }: SongListProps) => (
    <ScrollShadow {...props} className={cx('scroll-container', className)}>
        <div className={cx('container')}>
            <ol className={cx('list', className)}>
                {album.songs?.map((song, index) => (
                    <li key={index}>{`${index + 1}. ${song}`}</li>
                ))}
            </ol>
        </div>
    </ScrollShadow>
);
