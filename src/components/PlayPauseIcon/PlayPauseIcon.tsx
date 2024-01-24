import cnBind from 'classnames/bind';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import styles from './PlayPauseIcon.module.scss';

const cx = cnBind.bind(styles);

export interface PlayPauseIconProps
    extends Omit<
        DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
        'ref' | 'children'
    > {
    isPlaying?: boolean;
}

export const PlayPauseIcon = ({
    isPlaying,
    className,
    ...props
}: PlayPauseIconProps) => (
    <div {...props} className={cx('container', className)}>
        <span
            className={cx('material-symbols-outlined', 'pause', {
                hidden: !isPlaying,
            })}
            aria-hidden
        >
            pause
        </span>
        <span
            className={cx('material-symbols-outlined', 'play', {
                hidden: isPlaying,
            })}
            aria-hidden
        >
            play_arrow
        </span>
    </div>
);
