import type { Metadata } from 'next';

import { LoginPage } from '@/_pages/LoginPage';

export const metadata: Metadata = {
    title: "Hard 'N' Heavy | Регистрация",
    description: 'Регистрация',
    openGraph: {
        title: "Hard 'N' Heavy | Регистрация",
        siteName: "Hard 'N' Heavy",
        images: ['/logo/logo-rect-256.png'],
    },
};

const Page = () => <LoginPage isRegister />;

export default Page;
