import cnBind from 'classnames/bind';
import Image from 'next/image';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import { cloisterBlack } from '@/styles/fonts';
import type { AlbumType } from '@/shared/albums';

import styles from './MainInfo.module.scss';

const cx = cnBind.bind(styles);

export interface MainInfoProps
    extends Omit<
        DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
        'ref' | 'children'
    > {
    album: AlbumType;
}

export const MainInfo = ({ album, className, ...props }: MainInfoProps) => (
    <div
        {...props}
        className={cx('main-info', cloisterBlack.className, className)}
    >
        <span>{album.band}</span>
        <span>{new Date(album.releasedAt).getFullYear()}</span>
        <span>{album.album}</span>
        {album.link && (
            <a
                className={cx('link')}
                target="_blank"
                rel="noopener noreferrer"
                href={album.link}
            >
                <Image
                    src="/apple-music.png"
                    alt="apple music"
                    width={100}
                    height={100}
                    quality={100}
                />
            </a>
        )}
    </div>
);
