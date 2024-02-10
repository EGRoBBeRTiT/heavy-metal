import type { Metadata } from 'next';

import { LoginPage } from '@/_pages/LoginPage';

export const metadata: Metadata = {
    title: "Hard 'N' Heavy | Регистрация",
    description: 'Регистрация',
};

const Page = () => <LoginPage isRegister />;

export default Page;
