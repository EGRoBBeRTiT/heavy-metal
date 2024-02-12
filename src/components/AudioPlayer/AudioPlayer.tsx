'use client';

import cnBind from 'classnames/bind';
import React, { cache, useEffect, useState } from 'react';

import { LoudSlider } from '@/components/AudioPlayer/LoudSlider';
import { useAudioPlayerView } from '@/contexts/AudioPlayerViewProvider';
import { useAudioPlayer } from '@/hooks/context/useAudioPlayer';
import { DownloadButton } from '@/components/DownloadButton';
import { ListButton } from '@/components/ListButton';

import { TrackSlider } from './TrackSlider';
import { ControlButtons } from './ControlButtons';
import styles from './AudioPlayer.module.scss';
import { TrackInfo } from './TrackInfo';

const cx = cnBind.bind(styles);

const setPlayerHeight = cache((height: number) => {
    document.documentElement.style.setProperty(
        '--player-height',
        `${height}px`,
    );
});

const AudioPlayer = React.memo(() => {
    const [mounted, setMounted] = useState(false);
    const { activeTrack } = useAudioPlayer();

    const { view, styles } = useAudioPlayerView();

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <aside
            ref={(node) => {
                setPlayerHeight(node?.offsetHeight || 0);
            }}
            className={cx('aside', view)}
            style={styles ?? undefined}
            hidden={!mounted}
        >
            {view !== 'full' && <TrackSlider size="sm" />}
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
