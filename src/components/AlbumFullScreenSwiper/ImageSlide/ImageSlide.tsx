import type { ImageProps } from '@nextui-org/react';
import { Image } from '@nextui-org/react';
import cnBind from 'classnames/bind';

import styles from './ImageSlide.module.scss';

const cx = cnBind.bind(styles);

export type ImageSlideProps = Omit<ImageProps, 'ref' | 'children'>;

export const ImageSlide = ({ className, alt, ...props }: ImageSlideProps) => (
    <div className={cx('image-container', className)}>
        <Image {...props} alt={alt} className="swiper-lazy" />
    </div>
);

export default ImageSlide;
