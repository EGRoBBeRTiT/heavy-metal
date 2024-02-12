import type { UseAudioPlayerControlType } from '@/hooks/player/useAudioPlayerControl';
import { noop } from '@/utils';

export const playerControlDefaultValue: UseAudioPlayerControlType = {
    duration: 0,
    isPlaying: false,
    handleChangeVolume: noop,
    handleChangeCurrentTime: noop,
    activeTrack: null,
    handleSetTrack: () => Promise.resolve(undefined),
    handlePrevTrack: noop,
    handleNextTrack: noop,
    handleTogglePlaying: () => Promise.resolve(undefined),
    audioRef: {
        current:
            typeof Audio !== 'undefined'
                ? new Audio()
                : ({} as HTMLAudioElement),
    },
    setTrackList: noop,
    setTimeChange: noop,
};
