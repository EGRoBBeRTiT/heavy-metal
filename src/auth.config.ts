import type { NextAuthConfig } from 'next-auth';

import { appRoutes } from '@/routes';

export const authConfig = {
    pages: {
        signIn: appRoutes.login(),
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;

            const callbackUrl = nextUrl.searchParams.get('callbackUrl');

            if (isLoggedIn && callbackUrl) {
                return Response.redirect(new URL(callbackUrl, nextUrl));
            }

            const isOnPlayer = nextUrl.pathname.startsWith(appRoutes.player());
            const isOnLogin = nextUrl.pathname.startsWith(appRoutes.login());

            if (isOnLogin && isLoggedIn) {
                return Response.redirect(new URL(appRoutes.root(), nextUrl));
            }

            if (isOnPlayer) {
                if (!isLoggedIn) {
                    return false;
                }
            }

            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
