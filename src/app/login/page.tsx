import type { Metadata } from 'next';

import { LoginPage } from '@/_pages/LoginPage';

export const metadata: Metadata = {
    title: "Hard 'N' Heavy | Авторизация",
    description: 'Авторизация',
    openGraph: {
        title: "Hard 'N' Heavy | Авторизация'",
        siteName: "Hard 'N' Heavy",
        images: ['/logo/logo-rect-256.png'],
    },
};

const Page = () => <LoginPage />;

export default Page;
