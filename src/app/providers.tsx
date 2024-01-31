'use client';

import { NextUIProvider } from '@nextui-org/react';

import { ScreenConfigProvider } from '@/contexts/ScreenConfigProvider';
import type { StoreProviderProps } from '@/contexts/StoreProvider';
import { StoreProvider } from '@/contexts/StoreProvider';
import { AudioPlayerProvider } from '@/providers/AudioPlayerProvider';

export const Providers = ({
    children,
    profile,
    albums,
    withPlayer,
}: {
    children: React.ReactNode;
} & StoreProviderProps & { withPlayer: boolean }) => (
    <NextUIProvider>
        <StoreProvider profile={profile} albums={albums}>
            <ScreenConfigProvider>
                {withPlayer ? (
                    <AudioPlayerProvider>{children}</AudioPlayerProvider>
                ) : (
                    children
                )}
            </ScreenConfigProvider>
        </StoreProvider>
    </NextUIProvider>
);
