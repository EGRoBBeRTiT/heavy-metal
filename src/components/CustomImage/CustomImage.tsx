import type { ImageProps } from 'next/image';
import Image from 'next/image';
import cnBind from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { Skeleton } from '@nextui-org/react';

import { isString } from '@/utils';

import styles from './CustomImage.module.scss';

const cx = cnBind.bind(styles);

export interface LazyImageProps extends ImageProps {
    withReflect?: boolean;
    withBackground?: boolean;
    withSkeleton?: boolean;
}

export const CustomImage = React.memo<LazyImageProps>(
    ({
        alt,
        id,
        withReflect,
        className,
        src,
        loading,
        decoding,
        placeholder,
        withBackground = true,
        withSkeleton = true,
        ...props
    }) => {
        const skeletonRef = useRef<HTMLImageElement | null>(null);
        const [mounted, setMounted] = useState(false);
        const [loaded, setLoaded] = useState(false);

        const withBlur = placeholder === 'blur';
        const showBlurImage = withBlur && mounted && isString(src) && src;
        const hideImage = withBlur && !loaded;
        const showSkeleton = withSkeleton && !loaded;

        useEffect(() => {
            if (!withBlur) {
                return;
            }

            setTimeout(() => {
                setLoaded(false);
                setMounted(false);

                setTimeout(() => {
                    setMounted(true);
                });
            });
        }, [withBlur, src]);

        return (
            <div
                className={cx('container', className, {
                    'with-reflect': withReflect,
                })}
            >
                {withBackground && <div className={cx('background')} />}
                <Image
                    {...props}
                    loading={loading}
                    decoding={decoding}
                    src={src}
                    className={cx('image', {
                        'with-reflect': withReflect,
                        hidden: hideImage,
                    })}
                    alt={alt}
                    id={id}
                    onLoad={() => {
                        setLoaded(true);
                    }}
                />
                {showBlurImage && (
                    <Image
                        {...props}
                        ref={skeletonRef}
                        loading="eager"
                        className={cx('skeleton-image', {
                            hidden: loaded,
                        })}
                        src={`/_next/image?url=${src}&w=32&q=70`}
                        alt={alt}
                        unoptimized
                    />
                )}
                {showSkeleton && <Skeleton className={cx('skeleton')} />}
                <div
                    className={cx('reflect', { hidden: !withReflect })}
                    style={{
                        backgroundImage: `-moz-element(#${id ?? ''})`,
                    }}
                    hidden={!withReflect}
                />
            </div>
        );
    },
);

CustomImage.displayName = 'Memo (CustomImage)';
