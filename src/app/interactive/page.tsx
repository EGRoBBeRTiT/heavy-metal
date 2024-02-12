import type { Metadata, ResolvingMetadata } from 'next';

import { InteractivePage } from '@/_pages/InteractivePage';
import type { SearchParams } from '@/types/SearchParams.types';

export async function generateMetadata(
    props: SearchParams,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const parentOpenGraph = (await parent).openGraph ?? {};

    return {
        title: 'Интерактивный просмотр альбомов',
        description:
            'Лучшие альбомы в лучшем качестве, расположенные в хронологическом порядке. Просмотр обложки, песен в необычном исполнении',
        openGraph: {
            ...parentOpenGraph,
            title: 'Интерактивный просмотр альбомов',
            description:
                'Лучшие альбомы в лучшем качестве, расположенные в хронологическом порядке. Просмотр обложки, песен в необычном исполнении',
        },
    };
}

const Home = () => <InteractivePage />;

export default Home;
