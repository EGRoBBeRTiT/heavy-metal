import cnBind from 'classnames/bind';
import type { DetailedHTMLProps, OlHTMLAttributes } from 'react';

import type { AlbumType } from '@/shared/albums';

import styles from './SongList.module.scss';

const cx = cnBind.bind(styles);

export interface SongListProps
    extends Omit<
        DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>,
        'ref' | 'children'
    > {
    album: AlbumType;
}

export const SongList = ({ album, className, ...props }: SongListProps) => (
    <ol {...props} className={cx('list', className)}>
        {album.songs?.map((song, index) => (
            <li key={index}>{`${index + 1}. ${song}`}</li>
        ))}
    </ol>
);
