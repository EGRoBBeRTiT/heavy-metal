import type { Metadata } from 'next';

import { FullScreenPage } from '@/_pages/FullScreenPage/FullScreenPage';
import type { SearchParams } from '@/types/SearchParams.types';
import { getAlbumById } from '@/api/getAlbumById';

export async function generateMetadata({
    searchParams,
}: SearchParams): Promise<Metadata> {
    const index = String(searchParams.album);

    const album = await getAlbumById(index);

    const title = `Альбом ${album?.album ?? ''} от ${
        album?.band ?? ''
    } | Fullscreen`;
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
            // images: [album?.imageSrc ?? ''],
        },
    };
}

const Page = () => <FullScreenPage />;

export default Page;
