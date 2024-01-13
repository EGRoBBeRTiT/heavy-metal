import type { ImageProps } from 'next/image';
import Image from 'next/image';

export const IcCorner = (props: Omit<ImageProps, 'src' | 'alt'>) => (
    <Image
        width={24}
        height={24}
        {...props}
        src="/icons/ic-corner.svg"
        alt="icon"
    />
);
