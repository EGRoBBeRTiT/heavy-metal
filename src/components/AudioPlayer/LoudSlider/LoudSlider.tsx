import cnBind from 'classnames/bind';
import { Button, Slider } from '@nextui-org/react';
import {
    useState,
    type DetailedHTMLProps,
    type HTMLAttributes,
    useEffect,
    // useEffect,
} from 'react';

import { useAudioPlayerView } from '@/contexts/AudioPlayerViewProvider';
import { useAudioPlayer } from '@/hooks/context/useAudioPlayer';

import styles from './LoudSlider.module.scss';

const cx = cnBind.bind(styles);

export type LoudSliderProps = Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'ref' | 'children'
>;

export const LoudSlider = ({ className, ...props }: LoudSliderProps) => {
    const [value, setValue] = useState(100);
    const [isMuted, setIsMuted] = useState(false);
    const { handleChangeVolume, audioRef } = useAudioPlayer();

    const { view } = useAudioPlayerView();

    useEffect(() => {
        audioRef.current.onvolumechange = () => {
            setValue(audioRef.current.volume * 100);

            if (audioRef.current.volume <= 0) {
                audioRef.current.muted = true;
                setIsMuted(true);

                return;
            }

            audioRef.current.muted = false;
            setIsMuted(false);
        };
    }, [audioRef]);

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
                defaultValue={100}
                startContent={
                    <Button
                        isIconOnly
                        radius="full"
                        variant="light"
                        onPress={() => {
                            if (isMuted) {
                                setIsMuted(false);
                                handleChangeVolume(1);
                            } else {
                                setIsMuted(true);
                                handleChangeVolume(0);
                            }
                        }}
                        className={cx('button', { muted: isMuted })}
                    >
                        <span
                            className={cx('material-symbols-outlined', 'on', {
                                hidden: isMuted,
                            })}
                        >
                            volume_up
                        </span>
                        <span
                            className={cx('material-symbols-outlined', 'off', {
                                hidden: !isMuted,
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
