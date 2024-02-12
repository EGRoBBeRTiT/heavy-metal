import type { Metadata, ResolvingMetadata } from 'next';

import { LoginPage } from '@/_pages/LoginPage';
import type { SearchParams } from '@/types/SearchParams.types';

export async function generateMetadata(
    props: SearchParams,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const parentOpenGraph = (await parent).openGraph ?? {};

    return {
        title: "Hard 'N' Heavy | Авторизация",
        description: 'Авторизация',
        openGraph: {
            ...parentOpenGraph,
            title: "Hard 'N' Heavy | Авторизация",
            description: '',
        },
    };
}

const Page = () => <LoginPage />;

export default Page;
