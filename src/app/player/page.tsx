import { redirect } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

import { appRoutes } from '@/routes';
import { getLoggedProfile } from '@/api/getLoggedProfile';
import { isAdminOrStaff } from '@/utils/isAdminOrStaff';
import { PlayerPage } from '@/_pages/PlayerPage';
import type { SearchParams } from '@/types/SearchParams.types';

export async function generateMetadata(
    props: SearchParams,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const parentOpenGraph = (await parent).openGraph ?? {};

    return {
        title: "Hard 'N' Heavy | Плеер",
        description:
            'Слушайте оригинальную музыку онлайн бесплатно и в хорошем качестве',
        openGraph: {
            ...parentOpenGraph,
            title: "Hard 'N' Heavy | Плеер",
            description:
                'Слушайте оригинальную музыку онлайн бесплатно и в хорошем качестве',
        },
    };
}

const Page = async () => {
    const profile = await getLoggedProfile();

    const canReturnPage = isAdminOrStaff(profile);

    if (!canReturnPage) {
        return redirect(appRoutes.root());
    }

    return <PlayerPage />;
};

export default Page;
