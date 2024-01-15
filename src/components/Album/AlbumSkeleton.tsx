import React from 'react';
import cnBind from 'classnames/bind';
import { Skeleton } from '@nextui-org/react';

import styles from './Album.module.scss';

const cx = cnBind.bind(styles);

export interface AlbumSkeletonProps {
    className?: string;
}

export const AlbumSkeleton = ({ className }: AlbumSkeletonProps) => (
    <Skeleton className={cx('album-skeleton', className)} />
);
