'use client';

import { NextUIProvider } from '@nextui-org/react';

import { ScreenConfigProvider } from '@/contexts/ScreenConfigProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => (
    <NextUIProvider>
        <ScreenConfigProvider>{children}</ScreenConfigProvider>
    </NextUIProvider>
);
