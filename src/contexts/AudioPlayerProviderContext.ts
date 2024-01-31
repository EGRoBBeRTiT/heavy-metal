import { createContext } from 'react';

import type { UseAudioPlayerControlType } from '@/hooks/player/useAudioPlayerControl';

export const AudioPlayerContext = createContext(
    {} as UseAudioPlayerControlType,
);
