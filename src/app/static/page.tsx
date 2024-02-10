import type { Metadata } from 'next';

import { StaticPage } from '@/_pages/StaticPage/StaticPage';

export const metadata: Metadata = {
    title: 'Статический просмотр альбомов',
    description: 'Альбомы, и ничего лишнего без потери качества',
};

const Page = () => <StaticPage />;

export default Page;
