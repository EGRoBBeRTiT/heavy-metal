'use client';

import { NextUIProvider } from '@nextui-org/react';

import { ScreenConfigProvider } from '@/contexts/ScreenConfigProvider';
import { AudioPlayerProvider } from '@/contexts/AudioPlayerProvider';
import { AudioPlayerViewProvider } from '@/contexts/AudioPlayerViewProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => (
    <NextUIProvider>
        <ScreenConfigProvider>
            <AudioPlayerProvider>
                <AudioPlayerViewProvider>{children}</AudioPlayerViewProvider>
            </AudioPlayerProvider>
        </ScreenConfigProvider>
    </NextUIProvider>
);
