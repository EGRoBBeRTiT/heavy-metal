import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

import { appRoutes } from '@/routes';
import { getLoggedProfile } from '@/api/getLoggedProfile';
import { isAdminOrStaff } from '@/utils/isAdminOrStaff';
import { PlayerPage } from '@/_pages/PlayerPage';

export const metadata: Metadata = {
    title: "Hard 'N' Heavy | Плеер",
    description:
        'Слушайте оригинальную музыку онлайн бесплатно и в хорошем качестве',
    openGraph: {
        title: "Hard 'N' Heavy | Плеер",
        description:
            'Слушайте оригинальную музыку онлайн бесплатно и в хорошем качестве',
        siteName: "Hard 'N' Heavy",
        images: ['/logo/logo-rect-256.png'],
    },
};

const Page = async () => {
    const profile = await getLoggedProfile();

    const canReturnPage = isAdminOrStaff(profile);

    if (!canReturnPage) {
        return redirect(appRoutes.root());
    }

    return <PlayerPage />;
};

export default Page;
