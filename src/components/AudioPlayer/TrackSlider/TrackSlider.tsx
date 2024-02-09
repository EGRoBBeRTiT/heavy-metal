import type { SliderProps } from '@nextui-org/react';
import { Slider } from '@nextui-org/react';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
    const [currentTime, setCurrentTime] = useState(0);
    const [sliderValue, setSliderValue] = useState(0);
    const { duration, handleChangeCurrentTime, setTimeChange } =
        useAudioPlayer();
    const [canChangeSliderValue, setCanChangeSliderValue] = useState(true);
    const canAnimate = useRef(false);

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
                handleSetTime(time || 0);

                if (canChangeSliderValue) {
                    setSliderValue(time || 0);

                    if (Math.abs(currentTime - time) <= 1) {
                        canAnimate.current = true;

                        return;
                    }
                }
                canAnimate.current = false;
            }, 1000),
        [handleSetTime, canChangeSliderValue, currentTime],
    );

    const handleTimeChange = useCallback(
        (time: number) => {
            if (time < 0.5) {
                handleSetTime(time);
                setSliderValue(time);
                setCanChangeSliderValue(false);
            } else {
                setCanChangeSliderValue(true);
                throttledTimeChange(time);
            }
        },
        [handleSetTime, throttledTimeChange],
    );

    const timeChangeRef = useRef(handleTimeChange);
    timeChangeRef.current = handleTimeChange;

    useEffect(() => {
        setTimeChange(() => (time: number) => {
            timeChangeRef.current(time);
        });
    }, [setTimeChange]);

    return (
        <div
            {...props}
            className={cx('slider-container', className, {
                animate: canChangeSliderValue && canAnimate.current,
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
                    setCanChangeSliderValue(false);

                    if (typeof time === 'number') {
                        setSliderValue(time || 0);
                    }
                }}
                onChangeEnd={(value) => {
                    if (typeof value === 'number') {
                        handleChangeCurrentTime(value || 0);
                    }

                    setCanChangeSliderValue(true);
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
