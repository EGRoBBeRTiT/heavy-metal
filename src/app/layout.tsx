import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import './globalicons.css';

import { Providers } from '@/app/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Heavy metal',
    description: 'Мои сборник любимых групп',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
    <html lang="ru-RU" className="dark">
        <body className={inter.className}>
            <Providers>{children}</Providers>
        </body>
    </html>
);

export default RootLayout;
