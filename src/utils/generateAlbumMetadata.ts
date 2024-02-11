import type { Metadata } from 'next';

import { getAlbumById } from '@/api/getAlbumById';
import type { SearchParams } from '@/types/SearchParams.types';

export const generateAlbumMetadata = async ({
    searchParams,
}: SearchParams): Promise<Metadata> => {
    const index = String(searchParams.album);

    const album = await getAlbumById(index);

    const title = `Альбом ${album?.album ?? ''} от ${album?.band ?? ''}`;
    const description = `Альбом • ${new Date(
        album?.releasedAt ?? '',
    ).getFullYear()} • Песен: ${album?.songs?.length || 0}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            siteName: "Hard 'N' Heavy",
            images: [
                {
                    width: '750px',
                    height: '750px',
                    url: album?.imageSrc
                        ? `_next/image?url=${album?.imageSrc}&w=750&q=00`
                        : '',
                },
                {
                    width: '200px',
                    height: '200px',
                    url: album?.imageSrc
                        ? `_next/image?url=${album?.imageSrc}&w=256&q=100`
                        : '',
                },
            ],
        },
    };
};
