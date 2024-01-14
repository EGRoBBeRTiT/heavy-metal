import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import React from 'react';
import cnBind from 'classnames/bind';

import { Band } from '@/shared/albums';

import styles from './Row.module.scss';

const cx = cnBind.bind(styles);

const JoinedAlbums = Object.values(Band).join(' • ');

const Column = React.forwardRef<
    HTMLParagraphElement,
    Omit<
        DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>,
        'ref' | 'children'
    >
>(({ className, ...props }, ref) => (
    <p {...props} ref={ref} className={cx('column', className)}>
        {JoinedAlbums}
        <span className={cx('dot')}>•</span>
    </p>
));

Column.displayName = 'Column';

export const Row = React.memo(
    ({
        className,
        columnRef,
        mapArray,
        columnClassName,
        ...props
    }: Omit<
        DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
        'ref' | 'children'
    > & {
        mapArray?: unknown[];
        columnRef?: React.MutableRefObject<HTMLParagraphElement | null>;
        columnClassName?: string;
    }) => (
        <div {...props} className={cx('row', className)}>
            <Column ref={columnRef} className={columnClassName} />

            {mapArray &&
                mapArray.length &&
                mapArray.map((_, index) => (
                    <Column key={index} className={columnClassName} />
                ))}
        </div>
    ),
);

Row.displayName = 'Memo (Row)';
