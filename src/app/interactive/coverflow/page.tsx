import type { Metadata } from 'next';

import { CoverFlowPage } from '@/_pages/CoverFlowPage';
import { getAlbums } from '@/api/getAlbums';
import type { SearchParams } from '@/types/SearchParams.types';

export async function generateMetadata({
    searchParams,
}: SearchParams): Promise<Metadata> {
    const { albumsMap } = await getAlbums();

    const index = searchParams.album as string;

    const album = albumsMap.has(index) ? albumsMap.get(index) : null;

    const title = `${album?.album ?? ''} от ${album?.band ?? ''} | Coverflow`;
    const description = `Альбом • ${new Date(
        album?.releasedAt ?? '',
    ).getFullYear()} • Песен - ${album?.songs?.length || 0}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            siteName: "Hard 'N' Heavy",
            images: [album?.imageSrc ?? ''],
        },
    };
}

const Page = () => <CoverFlowPage />;

export default Page;
