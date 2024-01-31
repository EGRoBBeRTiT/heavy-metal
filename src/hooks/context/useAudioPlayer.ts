import { useContext } from 'react';

import { AudioPlayerContext } from '@/contexts/AudioPlayerProviderContext';

export const useAudioPlayer = () => useContext(AudioPlayerContext);
