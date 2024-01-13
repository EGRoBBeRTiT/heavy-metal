import type { Metadata } from 'next';

import { StaticPage } from '@/_pages/StaticPage/StaticPage';

export const metadata: Metadata = {
    title: 'Static Albums',
    description: 'Static view albums',
};

const Page = () => <StaticPage />;

export default Page;
