'use client';

import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

import type { WindowConfig } from '@/hooks/useWindowDimensions';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';

const ScreenConfigContext = createContext({} as WindowConfig);

export const useScreenConfig = () => useContext(ScreenConfigContext);

interface ScreenConfigProviderProps {
    children: ReactNode;
}

export const ScreenConfigProvider = ({
    children,
}: ScreenConfigProviderProps) => {
    const windowConfig = useWindowDimensions();

    return (
        <ScreenConfigContext.Provider value={windowConfig}>
            {children}
        </ScreenConfigContext.Provider>
    );
};
