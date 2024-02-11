import { ImageResponse } from 'next/og';
import NextImage from 'next/image';

import { getAlbumById } from '@/api/getAlbumById';
import type { SearchParams } from '@/types/SearchParams.types';

export default async function Image({ searchParams }: SearchParams) {
    const index = String(searchParams?.album);

    const album = await getAlbumById(index);

    return new ImageResponse(
        (
            <div
                style={{
                    width: '200px',
                    height: '200px',
                }}
            >
                {album?.imageSrc && (
                    <NextImage
                        src={album?.imageSrc ?? ''}
                        alt={`${album?.band ?? ''} ${album?.album ?? ''}`}
                        width={200}
                        height={200}
                    />
                )}
            </div>
        ),
    );
}
