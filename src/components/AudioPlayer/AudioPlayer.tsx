'use client';

import cnBind from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@nextui-org/button';

import { LoudSlider } from '@/components/AudioPlayer/LoudSlider';
import { useAudioPlayerView } from '@/contexts/AudioPlayerViewProvider';
import { useScreenConfig } from '@/contexts/ScreenConfigProvider';
import { useAudioPlayer } from '@/hooks/context/useAudioPlayer';

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

    const { view, setView, styles, setStyles } = useAudioPlayerView();

    useEffect(() => {
        document.documentElement.style.setProperty(
            '--player-height',
            `${(plyerRef.current?.offsetHeight ?? 0) + 2}px`,
        );

        if (isMobile || isTablet) {
            setView('mobile');
        }
    }, [isMobile, isTablet, setStyles, setView]);

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
                <a
                    href={activeTrack?.src}
                    download={activeTrack?.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Скачать"
                    aria-label="Скачать трек"
                >
                    <Button isIconOnly variant="light" radius="full" size="lg">
                        <span className="material-symbols-outlined">
                            download
                        </span>
                    </Button>
                </a>
                <LoudSlider />
            </div>
        </aside>
    );
});

AudioPlayer.displayName = 'Memo (AudioPlayer)';

export default AudioPlayer;
