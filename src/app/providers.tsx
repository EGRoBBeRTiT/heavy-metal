'use client';

import { NextUIProvider } from '@nextui-org/react';
import { Suspense } from 'react';

import { ScreenConfigProvider } from '@/contexts/ScreenConfigProvider';
import type { StoreProviderProps } from '@/contexts/StoreProvider';
import { StoreProvider } from '@/contexts/StoreProvider';
import { HistoryProvider } from '@/providers/HistoryProvider';
import { LazyAudioPlayerProvider } from '@/providers';
import { AudioPlayerViewProvider } from '@/contexts/AudioPlayerViewProvider';
import { AudioPlayerContext } from '@/contexts/AudioPlayerProviderContext';
import { playerControlDefaultValue } from '@/shared/playerControlDefaultValue';

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
            <HistoryProvider>
                <ScreenConfigProvider>
                    <AudioPlayerViewProvider>
                        {withPlayer ? (
                            <Suspense fallback={null}>
                                <LazyAudioPlayerProvider>
                                    {children}
                                </LazyAudioPlayerProvider>
                            </Suspense>
                        ) : (
                            <AudioPlayerContext.Provider
                                value={playerControlDefaultValue}
                            >
                                {children}
                            </AudioPlayerContext.Provider>
                        )}
                    </AudioPlayerViewProvider>
                </ScreenConfigProvider>
            </HistoryProvider>
        </StoreProvider>
    </NextUIProvider>
);
