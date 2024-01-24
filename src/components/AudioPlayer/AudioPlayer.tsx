'use client';

import cnBind from 'classnames/bind';
import { useEffect, useState } from 'react';

import { LoudSlider } from '@/components/AudioPlayer/LoudSlider';
import { useAudioPlayerView } from '@/contexts/AudioPlayerViewProvider';
import { useScreenConfig } from '@/contexts/ScreenConfigProvider';

import { TrackSlider } from './TrackSlider';
import { ControlButtons } from './ControlButtons';
import styles from './AudioPlayer.module.scss';
import { TrackInfo } from './TrackInfo';

const cx = cnBind.bind(styles);

export const AudioPlayer = () => {
    const [hovered, setHovered] = useState(false);

    const { isMobile } = useScreenConfig();

    const { view, setView, styles } = useAudioPlayerView();

    useEffect(() => {
        if (isMobile) {
            setView('mobile');
        }
    }, [isMobile, setView]);

    return (
        <aside
            className={cx('aside', view)}
            onMouseEnter={() => {
                setHovered(true);
            }}
            onMouseLeave={() => {
                setHovered(false);
            }}
            style={styles ?? undefined}
        >
            <TrackSlider size={hovered && view !== 'mobile' ? 'md' : 'sm'} />
            <div className={cx('bottom', view)}>
                <ControlButtons className={cx('control-buttons')} />
                <TrackInfo className={cx('info')} />
                <LoudSlider />
            </div>
        </aside>
    );
};
