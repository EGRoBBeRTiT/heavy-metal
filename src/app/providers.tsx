'use client';

import { NextUIProvider } from '@nextui-org/react';

import { ScreenConfigProvider } from '@/contexts/ScreenConfigProvider';
import { AudioPlayerProvider } from '@/contexts/AudioPlayerProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => (
    <NextUIProvider>
        <ScreenConfigProvider>
            <AudioPlayerProvider>{children}</AudioPlayerProvider>
        </ScreenConfigProvider>
    </NextUIProvider>
);
