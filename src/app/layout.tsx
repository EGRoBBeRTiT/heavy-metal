import type { Metadata } from 'next';
import type React from 'react';

import '@/styles/tailwind.css';
import '@/styles/globalicons.css';
import '@/styles/globals.scss';

import { Providers } from '@/app/providers';
import { roboto } from '@/styles/fonts';
import { Header } from '@/components/Header';
import { getAlbums } from '@/api/getAlbums';
import { isAdminOrStaff } from '@/utils/isAdminOrStaff';
import { getLoggedProfile } from '@/api/getLoggedProfile';

export const metadata: Metadata = {
    metadataBase: new URL('https://hardnheavy.vercel.app'),
    title: "Hard 'N' Heavy — Сборник альбомов мировых икон в мире hard 'n' heavy и rock 'n' roll'а в лучшем качестве",
    description:
        "Сборник Hard 'N' Heavy — лучшие альбомы в лучшем качестве, расположенные в хронологическом порядке. Просмотр обложки, песен в необычном исполнении и, возможно, кое-что еще...",
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
        'рок',
        'метал',
        'рок альбомы',
        'альбомы хеви метала',
    ],
    appleWebApp: true,
    applicationName: "Hard 'N' Heavy",
    authors: [{ url: 'https://github.com/EGRoBBeRTiT', name: 'Egor Titov' }],
    creator: 'Egor Titov',
    publisher: 'Vercel',
    manifest: '/manifest.json',
    openGraph: {
        title: "Hard 'N' Heavy — Сборник альбомов мировых икон в мире hard 'n' heavy и rock 'n' roll'а в лучшем качестве",
        description:
            "Сборник Hard 'N' Heavy — лучшие альбомы в лучшем качестве, расположенные в хронологическом порядке. Просмотр обложки, песен в необычном исполнении и, возможно, кое-что еще...",
        siteName: "Hard 'N' Heavy",
        images: ['/logo/logo-rect-256.png'],
    },
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    const profile = await getLoggedProfile();

    const albums = await getAlbums();

    return (
        <html lang="ru-RU" className="dark">
            <body className={roboto.className}>
                <Providers
                    profile={profile}
                    albums={albums}
                    withPlayer={isAdminOrStaff(profile)}
                >
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    );
};

export default RootLayout;
