import type { ImageProps } from 'next/image';
import Image from 'next/image';
import cnBind from 'classnames/bind';

import styles from './LazyImage.module.scss';

const cx = cnBind.bind(styles);

const LazyImage = ({
    alt,
    id,
    withReflect,
    className,
    ...props
}: ImageProps & { withReflect?: boolean }) => (
    <>
        <Image
            {...props}
            className={cx('image', className, { 'with-reflect': withReflect })}
            alt={alt}
            id={id}
        />
        {withReflect && (
            <div
                className={cx('reflect')}
                style={{
                    backgroundImage: `-moz-element(#${id ?? ''})`,
                }}
            />
        )}
    </>
);

export default LazyImage;
