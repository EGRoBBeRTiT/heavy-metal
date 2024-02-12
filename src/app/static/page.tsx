import type { Metadata, ResolvingMetadata } from 'next';

import { StaticPage } from '@/_pages/StaticPage/StaticPage';
import type { SearchParams } from '@/types/SearchParams.types';

export async function generateMetadata(
    props: SearchParams,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const parentOpenGraph = (await parent).openGraph ?? {};

    return {
        title: 'Статический просмотр альбомов',
        description: 'Альбомы, и ничего лишнего без потери качества',
        openGraph: {
            ...parentOpenGraph,
            title: 'Статический просмотр альбомов',
            description: 'Альбомы, и ничего лишнего без потери качества',
        },
    };
}

const Page = () => <StaticPage />;

export default Page;
