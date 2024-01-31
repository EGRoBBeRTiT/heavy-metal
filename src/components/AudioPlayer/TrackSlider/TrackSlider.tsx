import type { SliderProps } from '@nextui-org/react';
import { Slider } from '@nextui-org/react';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import cnBind from 'classnames/bind';
import throttle from 'lodash.throttle';

import { useAudioPlayerView } from '@/contexts/AudioPlayerViewProvider';
import { LocalStorageItem } from '@/types/LocalStorageItem.types';
import { useAudioPlayer } from '@/hooks/context/useAudioPlayer';

import { convertNumberToTimeString } from './TrackSlider.utils';
import styles from './TrackSlider.module.scss';

const cx = cnBind.bind(styles);

export interface TrackSliderProps
    extends Omit<
            DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
            'ref' | 'children'
        >,
        Pick<SliderProps, 'size'> {}

export const TrackSlider = ({
    className,
    size = 'sm',
    ...props
}: TrackSliderProps) => {
    const [canChangeValue, setCanChangeValue] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [sliderValue, setSliderValue] = useState(0);
    const { duration, handleChangeCurrentTime, setTimeChange } =
        useAudioPlayer();

    const { view } = useAudioPlayerView();

    const handleSetTime = useCallback((time?: number) => {
        localStorage.setItem(
            LocalStorageItem.PLAYED_SECONDS,
            `${Math.floor(time ?? 0)}`,
        );

        setCurrentTime(time || 0);
    }, []);

    const throttledTimeChange = useMemo(
        () =>
            throttle((time: number) => {
                if (time > currentTime) {
                    handleSetTime(time || 0);

                    if (canChangeValue) {
                        setSliderValue(time || 0);
                    }
                }
            }, 1000),
        [canChangeValue, currentTime, handleSetTime],
    );

    useEffect(() => {
        setTimeChange(() => (time: number) => {
            setTimeout(() => {
                if (time < 0.5) {
                    handleSetTime(0);
                    setSliderValue(0);
                } else {
                    throttledTimeChange(time);
                }
            });
        });
    }, [handleSetTime, setTimeChange, throttledTimeChange]);

    return (
        <div
            {...props}
            className={cx('slider-container', className, {
                animate: canChangeValue && currentTime >= 0.5,
            })}
        >
            <Slider
                aria-labelledby="time-track"
                className={cx('slider')}
                minValue={0}
                maxValue={duration}
                value={sliderValue}
                showTooltip
                hideThumb
                size={size}
                tooltipProps={{
                    content: convertNumberToTimeString(sliderValue),
                }}
                onChange={(time) => {
                    setCanChangeValue(false);

                    if (typeof time === 'number' && time) {
                        setSliderValue(time);
                    }
                }}
                onChangeEnd={(value) => {
                    if (typeof value === 'number' && value) {
                        handleChangeCurrentTime(value);
                    }

                    setCanChangeValue(true);
                }}
            />
            {view !== 'mobile' && (
                <div className={cx('time', view)} aria-label="vdfv">
                    <div>{convertNumberToTimeString(currentTime)}</div>
                    <div>{convertNumberToTimeString(duration)}</div>
                </div>
            )}
        </div>
    );
};
