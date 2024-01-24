import cnBind from 'classnames/bind';
import { Button, Slider } from '@nextui-org/react';
import {
    useState,
    type DetailedHTMLProps,
    type HTMLAttributes,
    useEffect,
} from 'react';

import { useAudioPlayerContext } from '@/contexts/AudioPlayerProvider/AudioPlayerProvider';
import { useAudioPlayerView } from '@/contexts/AudioPlayerViewProvider';

import styles from './LoudSlider.module.scss';

const cx = cnBind.bind(styles);

export type LoudSliderProps = Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'ref' | 'children'
>;

export const LoudSlider = ({ className, ...props }: LoudSliderProps) => {
    const [value, setValue] = useState(100);
    const [muted, setMuted] = useState(false);
    const { handleChangeVolume, audioRef } = useAudioPlayerContext();

    const { view } = useAudioPlayerView();

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.onvolumechange = () => {
                setValue((audioRef.current?.volume ?? 0) * 100);

                if (audioRef.current && audioRef.current.volume <= 0) {
                    audioRef.current.muted = true;
                    setMuted(true);

                    return;
                }

                if (audioRef.current) {
                    audioRef.current.muted = false;
                    setMuted(false);
                }
            };
        }
    }, [audioRef]);

    if (view === 'mobile') {
        return null;
    }

    return (
        <div {...props} className={cx('loud-slider', className, view)}>
            <Slider
                color="foreground"
                maxValue={100}
                minValue={0}
                value={value}
                aria-labelledby="loud-track"
                size="sm"
                hideThumb={view === 'compact'}
                defaultValue={audioRef.current?.volume ?? 100}
                startContent={
                    <Button
                        isIconOnly
                        radius="full"
                        variant="light"
                        onPress={() => {
                            if (audioRef.current && !audioRef.current.muted) {
                                audioRef.current.muted = true;
                                audioRef.current.volume = 0;
                                setMuted(true);

                                return;
                            }

                            if (audioRef.current && audioRef.current.muted) {
                                audioRef.current.muted = false;
                                audioRef.current.volume = 1;
                                setMuted(false);
                            }
                        }}
                        className={cx('button', { muted })}
                    >
                        <span
                            className={cx('material-symbols-outlined', 'on', {
                                hidden: muted,
                            })}
                        >
                            volume_up
                        </span>
                        <span
                            className={cx('material-symbols-outlined', 'off', {
                                hidden: !muted,
                            })}
                        >
                            volume_off
                        </span>
                    </Button>
                }
                onChange={(value) => {
                    if (typeof value === 'number') {
                        handleChangeVolume(value / 100);
                        setValue(value);
                    }
                }}
            />
        </div>
    );
};
