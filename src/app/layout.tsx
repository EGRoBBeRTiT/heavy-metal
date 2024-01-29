import type { Metadata } from 'next';
import type React from 'react';

import '@/styles/tailwind.css';
import '@/styles/globalicons.css';
import '@/styles/globals.scss';

import { Providers } from '@/app/providers';
import { roboto } from '@/styles/fonts';
import { AudioPlayer } from '@/components/AudioPlayer';
import { Header } from '@/components/Header';
import { auth, signOut } from '@/auth';
import { getUser } from '@/api/getUser';
import { UserType } from '@/types/User.types';
import { getAlbums } from '@/api/getAlbums';

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
    appleWebApp: true,
    applicationName: "The Best Rock 'n' Roll Albums",
    authors: [{ url: 'https://github.com/EGRoBBeRTiT', name: 'Egor Titov' }],
    creator: 'Egor Titov',
    publisher: 'Vercel',
    manifest: '/manifest.json',
};

const getData = async () => {
    const session = await auth();

    if (session && session.user && session.user.email) {
        const user = await getUser(session.user.email);

        if (!user) {
            await signOut();
        }

        return {
            email: user?.email,
            type: user?.type,
            firstName: user?.firstName,
            lastName: user?.lastName,
        };
    }

    return null;
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    const profile = await getData();

    const albums = await getAlbums();

    return (
        <html lang="en-US" className="dark">
            <body className={roboto.className}>
                <Providers profile={profile} albums={albums}>
                    <Header />
                    {children}
                    {profile?.type === UserType.ADMIN && <AudioPlayer />}
                </Providers>
            </body>
        </html>
    );
};

export default RootLayout;
