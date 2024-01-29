'use client';

import { NextUIProvider } from '@nextui-org/react';

import { ScreenConfigProvider } from '@/contexts/ScreenConfigProvider';
import { AudioPlayerProvider } from '@/contexts/AudioPlayerProvider';
import { AudioPlayerViewProvider } from '@/contexts/AudioPlayerViewProvider';
import type { StoreProviderProps } from '@/contexts/StoreProvider';
import { StoreProvider } from '@/contexts/StoreProvider';

export const Providers = ({
    children,
    profile,
    albums,
}: {
    children: React.ReactNode;
} & StoreProviderProps) => (
    <NextUIProvider>
        <StoreProvider profile={profile} albums={albums}>
            <ScreenConfigProvider>
                <AudioPlayerProvider>
                    <AudioPlayerViewProvider>
                        {children}
                    </AudioPlayerViewProvider>
                </AudioPlayerProvider>
            </ScreenConfigProvider>
        </StoreProvider>
    </NextUIProvider>
);
