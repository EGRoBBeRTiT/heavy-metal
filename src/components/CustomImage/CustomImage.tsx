import type { ImageProps } from 'next/image';
import Image from 'next/image';
import cnBind from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';

import styles from './CustomImage.module.scss';

const cx = cnBind.bind(styles);

export interface LazyImageProps extends ImageProps {
    withReflect?: boolean;
}

export const CustomImage = React.memo<LazyImageProps>(
    ({ alt, id, withReflect, className, src, placeholder, ...props }) => {
        const [blurUrl, setBlurUrl] = useState<string | undefined>(undefined);
        const imageRef = useRef<HTMLImageElement | null>(null);
        const canvasRef = useRef<HTMLCanvasElement | null>(null);

        useEffect(() => {
            if (
                canvasRef.current &&
                imageRef.current &&
                placeholder === 'blur'
            ) {
                canvasRef.current.width = imageRef.current.width;
                canvasRef.current.height = imageRef.current.height;

                const ctx = canvasRef.current.getContext('2d');

                ctx?.drawImage(imageRef.current, 0, 0);

                const dataURL = canvasRef.current.toDataURL('image/webp');

                setBlurUrl(dataURL);
            }
        }, [placeholder]);

        return (
            <>
                {placeholder === 'blur' && (
                    <>
                        <Image
                            ref={imageRef}
                            loading="eager"
                            unoptimized
                            src={`/_next/image?url=${
                                typeof src === 'string' ? src : ''
                            }&w=16&q=1`}
                            alt={alt}
                            hidden
                            className={cx('hidden')}
                            width={16}
                            height={16}
                        />
                        <canvas
                            ref={canvasRef}
                            hidden
                            className={cx('hidden')}
                        />
                    </>
                )}
                {(blurUrl || placeholder !== 'blur') && (
                    <Image
                        {...props}
                        src={src}
                        className={cx('image', className, {
                            'with-reflect': withReflect,
                        })}
                        alt={alt}
                        id={id}
                        placeholder={placeholder}
                        blurDataURL={blurUrl}
                    />
                )}
                <div
                    className={cx('reflect', { hidden: !withReflect })}
                    style={{
                        backgroundImage: `-moz-element(#${id ?? ''})`,
                    }}
                    hidden={!withReflect}
                />
            </>
        );
    },
);

CustomImage.displayName = 'Ref (LazyImage)';
