'use client';

import cnBind from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';

import { LoudSlider } from '@/components/AudioPlayer/LoudSlider';
import { useAudioPlayerView } from '@/contexts/AudioPlayerViewProvider';
import { useScreenConfig } from '@/contexts/ScreenConfigProvider';
import { useAudioPlayer } from '@/hooks/context/useAudioPlayer';
import { DownloadButton } from '@/components/DownloadButton';
import { ListButton } from '@/components/ListButton';

import { TrackSlider } from './TrackSlider';
import { ControlButtons } from './ControlButtons';
import styles from './AudioPlayer.module.scss';
import { TrackInfo } from './TrackInfo';

const cx = cnBind.bind(styles);

const AudioPlayer = React.memo(() => {
    const plyerRef = useRef<HTMLElement>(null);
    const [hovered, setHovered] = useState(false);
    const { activeTrack } = useAudioPlayer();

    const { isMobile, isTablet } = useScreenConfig();

    const { view, setView, styles } = useAudioPlayerView();

    useEffect(() => {
        document.documentElement.style.setProperty(
            '--player-height',
            `${(plyerRef.current?.offsetHeight ?? 0) + 2}px`,
        );
    }, [view]);

    useEffect(() => {
        if (isMobile || isTablet) {
            setView('mobile');
        }
    }, [isMobile, isTablet, setView]);

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
                {view !== 'mobile' && (
                    <div className={cx('end')}>
                        <ListButton className={cx('button')} />
                        <DownloadButton href={activeTrack?.src} />
                        <LoudSlider />
                    </div>
                )}
            </div>
        </aside>
    );
});

AudioPlayer.displayName = 'Memo (AudioPlayer)';

export default AudioPlayer;
