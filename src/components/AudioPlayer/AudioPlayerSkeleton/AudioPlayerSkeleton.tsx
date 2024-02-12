import cnBind from 'classnames/bind';

import styles from './AudioPlayerSkeleton.module.scss';

const cx = cnBind.bind(styles);

export interface AudioPlayerSkeletonProps {
    isMobile?: boolean;
}

export const AudioPlayerSkeleton = ({ isMobile }: AudioPlayerSkeletonProps) => (
    <div className={cx('skeleton', { mobile: isMobile })} />
);
