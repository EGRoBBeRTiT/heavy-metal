import type { Metadata } from 'next';
import type React from 'react';

import '@/styles/tailwind.css';
import '@/styles/globalicons.css';
import '@/styles/globals.scss';
import { Providers } from '@/app/providers';
import { inter } from '@/styles/fonts';

export const metadata: Metadata = {
    title: "The Best Rock 'n' Roll Albums",
    description: "List of my favorite Rock 'n' Roll albums of all time",
    keywords: [
        'rock',
        "rock 'n' roll",
        'metal',

        'hard rock',
        'albums',
        'favorite rock albums',
        "favorite rock 'n' roll albums",
        'favorite heavy metal albums',
        'favorite metal albums',
        "best rock 'n' roll albums",
        'best rock albums',
        'best metal albums',
        'best heavy albums',
    ],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
    <html lang="ru-RU" className="dark">
        <body className={inter.className}>
            <Providers>{children}</Providers>
        </body>
    </html>
);

export default RootLayout;
