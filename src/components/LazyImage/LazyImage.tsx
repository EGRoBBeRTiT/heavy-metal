import type { ImageProps } from 'next/image';
import Image from 'next/image';
import cnBind from 'classnames/bind';
import React from 'react';

import styles from './LazyImage.module.scss';

const cx = cnBind.bind(styles);

export interface LazyImageProps extends ImageProps {
    withReflect?: boolean;
}

const LazyImage = React.forwardRef<HTMLImageElement, LazyImageProps>(
    ({ alt, id, withReflect, className, ...props }, ref) => (
        <>
            <Image
                {...props}
                ref={ref}
                className={cx('image', className, {
                    'with-reflect': withReflect,
                })}
                alt={alt}
                id={id}
            />
            <div
                className={cx('reflect', { hidden: !withReflect })}
                style={{
                    backgroundImage: `-moz-element(#${id ?? ''})`,
                }}
                hidden={!withReflect}
            />
        </>
    ),
);

LazyImage.displayName = 'Ref (LazyImage)';

export default LazyImage;
