import type { Metadata } from 'next';

import { FullScreenPage } from '@/_pages/FullScreenPage/FullScreenPage';
import { getAlbums } from '@/api/getAlbums';
import type { SearchParams } from '@/types/SearchParams.types';

export async function generateMetadata({
    searchParams,
}: SearchParams): Promise<Metadata> {
    const { albumsMap } = await getAlbums();

    const index = searchParams.album as string;

    const album = albumsMap.has(index) ? albumsMap.get(index) : null;

    return {
        title: `${album?.album ?? ''} • ${album?.band ?? ''} | Fullscreen`,
        openGraph: {
            images: [album?.imageSrc ?? ''],
        },
    };
}

const Page = () => <FullScreenPage />;

export default Page;
