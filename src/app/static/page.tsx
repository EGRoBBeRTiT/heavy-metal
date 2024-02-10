import type { Metadata } from 'next';

import { StaticPage } from '@/_pages/StaticPage/StaticPage';

export const metadata: Metadata = {
    title: 'Статический просмотр альбомов',
    description: 'Альбомы, и ничего лишнего без потери качества',
    openGraph: {
        title: 'Статический просмотр альбомов',
        description: 'Альбомы, и ничего лишнего без потери качества',
        siteName: "Hard 'N' Heavy",
        images: ['/logo/logo-rect-256.png'],
    },
};

const Page = () => <StaticPage />;

export default Page;
