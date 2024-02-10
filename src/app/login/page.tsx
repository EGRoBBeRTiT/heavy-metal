import type { Metadata } from 'next';

import { LoginPage } from '@/_pages/LoginPage';

export const metadata: Metadata = {
    title: "Hard 'N' Heavy | Авторизация",
    description: 'Авторизация',
};

const Page = () => <LoginPage />;

export default Page;
