'use client';

import cnBind from 'classnames/bind';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { cloisterBlack } from '@/styles/fonts';
import { Row } from '@/components/AnimatedBands/Row';

import styles from './AnimatedBands.module.scss';

const cx = cnBind.bind(styles);

export type AnimatedBandsProps = Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'children' | 'ref'
>;

export const AnimatedBands = ({ className, ...props }: AnimatedBandsProps) => {
    const [isAnimated, setIsAnimated] = useState<boolean>(false);
    const [columnCount, setColumnCount] = useState<number | null>(null);
    const [rowCount, setRowCount] = useState<number | null>(null);

    const initialAlbumsRef = useRef<HTMLParagraphElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setColumnCount(
            Math.ceil(
                (containerRef.current?.clientWidth ?? 0) /
                    (initialAlbumsRef.current?.clientWidth || 1),
            ) *
                2 -
                1,
        );
        setRowCount(
            Math.ceil(
                (containerRef.current?.clientHeight ?? 0) /
                    (initialAlbumsRef.current?.clientHeight || 1),
            ) - 1,
        );

        setIsAnimated(true);
    }, []);

    const columnMapArray = useMemo(
        () => (columnCount ? Array.from({ length: columnCount }) : undefined),
        [columnCount],
    );

    const rowMapArray = useMemo(
        () => (rowCount ? Array.from({ length: rowCount }) : undefined),
        [rowCount],
    );

    return (
        <div
            {...props}
            ref={containerRef}
            className={cx(
                'bands-container',
                cloisterBlack.className,
                className,
                { animated: isAnimated },
            )}
        >
            <Row
                className={cx('row')}
                columnClassName={cx('column')}
                columnRef={initialAlbumsRef}
                mapArray={columnMapArray}
            />
            {rowMapArray &&
                rowMapArray.map((_, index) => (
                    <Row
                        key={index}
                        mapArray={columnMapArray}
                        className={cx('row')}
                        columnClassName={cx('column')}
                    />
                ))}
        </div>
    );
};
