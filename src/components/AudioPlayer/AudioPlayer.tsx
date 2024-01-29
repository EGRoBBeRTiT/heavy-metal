'use client';

import cnBind from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import { LoudSlider } from '@/components/AudioPlayer/LoudSlider';
import { useAudioPlayerView } from '@/contexts/AudioPlayerViewProvider';
import { useScreenConfig } from '@/contexts/ScreenConfigProvider';

import { TrackSlider } from './TrackSlider';
import { ControlButtons } from './ControlButtons';
import styles from './AudioPlayer.module.scss';
import { TrackInfo } from './TrackInfo';

const cx = cnBind.bind(styles);

export const AudioPlayer = () => {
    const plyerRef = useRef<HTMLElement>(null);
    const [hovered, setHovered] = useState(false);

    const { isMobile } = useScreenConfig();

    const { view, setView, styles, setStyles } = useAudioPlayerView();

    useEffect(() => {
        document.documentElement.style.setProperty(
            '--player-height',
            `${(plyerRef.current?.offsetHeight ?? 0) + 2}px`,
        );

        if (isMobile) {
            setView('mobile');
        }
    }, [isMobile, setStyles, setView]);

    return (
        <aside
            ref={plyerRef}
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
