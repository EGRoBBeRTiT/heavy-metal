'use client';

import type { CSSProperties, ReactNode } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

export type AudioPLayerView = 'compact' | 'full' | 'mobile';

export interface AudioPlayerViewProps {
    view: AudioPLayerView;
    setView: (view: AudioPLayerView) => void;
    styles: CSSProperties | null;
    setStyles: (styles: CSSProperties | null) => void;
}

const AudioPlayerViewContext = createContext({
    view: 'full',
} as AudioPlayerViewProps);

export const useAudioPlayerView = () => useContext(AudioPlayerViewContext);

interface AudioPlayerViewProviderProps {
    children: ReactNode;
}

export const AudioPlayerViewProvider = ({
    children,
}: AudioPlayerViewProviderProps) => {
    const [view, setView] = useState<AudioPLayerView>('full');
    const [styles, setStyles] = useState<CSSProperties | null>(null);

    const value = useMemo(
        () => ({ view, setView, styles, setStyles }),
        [styles, view],
    );

    return (
        <AudioPlayerViewContext.Provider value={value}>
            {children}
        </AudioPlayerViewContext.Provider>
    );
};
