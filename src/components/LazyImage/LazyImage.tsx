import type { ImageProps } from 'next/image';
import Image from 'next/image';

const LazyImage = ({ alt, ...props }: ImageProps) => (
    <Image {...props} alt={alt} />
);

export default LazyImage;
