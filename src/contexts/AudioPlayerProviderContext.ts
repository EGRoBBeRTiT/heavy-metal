import { createContext } from 'react';

import type { UseAudioPlayerControlType } from '@/hooks/player/useAudioPlayerControl';
import { playerControlDefaultValue } from '@/shared/playerControlDefaultValue';

export const AudioPlayerContext = createContext<UseAudioPlayerControlType>(
    playerControlDefaultValue,
);
