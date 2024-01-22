'use client';

import cnBind from 'classnames/bind';
import { useEffect } from 'react';
import { Button } from '@nextui-org/button';
import Image from 'next/image';

import { useAudioPlayerContext } from '@/contexts/AudioPlayerProvider/AudioPlayerProvider';

import styles from './AudioPlayer.module.scss';

const cx = cnBind.bind(styles);

const TRACKS = [
    {
        src: 'https://rocknation.su/upload/mp3/Accept/1979%20-%20Accept/01.%20Lady%20Lou.mp3',
        title: 'Lady Lou',
        artist: 'Accept',
        album: 'Accept',
        imageSrc: '/albums/Accept_1979_Accept.jpg',
        year: '1979',
    },
    {
        src: 'https://rocknation.su/upload/mp3/Manowar/2009%20-%20Thunder%20In%20The%20Sky/25.%20Heaven%20And%20Hell.mp3',
        title: 'Heaven And Hell',
        artist: 'Manowar',
        album: 'Thunder In the Sky',
        imageSrc: '/albums/Manowar_2009_Thunder-In-the-Sky.png',
        year: '2009',
    },
    {
        src: 'https://rocknation.su/upload/mp3/Pantera/1988%20-%20Power%20Metal/02.%20Power%20Metal.mp3',
        title: 'Power Metal',
        artist: 'Pantera',
        album: 'Power Metal',
        imageSrc: '/albums/Pantera_1988_Power-Metal.jpg',
        year: '1988',
    },
    {
        src: '/music/Sektor_Gaza_1994_06_Ария-графа-Дракулы.mp3',
        title: 'Ария графа Дракулы (Anthrax — I Am the Law)',
        artist: 'Сектор Газа',
        album: 'Кащей Бессмертный',
        imageSrc: '/albums/Sektor-gaza_1994_Кащей-Бессмертный.png',
        year: '1994',
    },
    {
        src: '/music/Sektor_Gaza_1994_07_Ария-Васидисы-Прекрасной.mp3',
        title: 'Ария Василисы Прекрасной (Queen — Bohemian Rhapsody)',
        artist: 'Сектор Газа',
        album: 'Кащей Бессмертный',
        imageSrc: '/albums/Sektor-gaza_1994_Кащей-Бессмертный.png',
        year: '1994',
    },
    {
        src: '/music/Sektor_Gaza_1994_09_Ария-Кащея-Бессмертного.mp3',
        title: 'Ария Кащея Бессмертного (Песняры — Дрозды)',
        artist: 'Сектор Газа',
        album: 'Кащей Бессмертный',
        imageSrc: '/albums/Sektor-gaza_1994_Кащей-Бессмертный.png',
        year: '1994',
    },
];

export const AudioPlayer = () => {
    const {
        handlePrevTrack,
        handleTogglePlaying,
        isPlaying,
        handleNextTrack,
        setSongsList,
        activeTrack,
    } = useAudioPlayerContext();

    useEffect(() => {
        setTimeout(() => {
            setSongsList(TRACKS);
        });
    }, [setSongsList]);

    return (
        <aside className={cx('aside')}>
            <div className={cx('control-buttons')}>
                <Button onClick={handlePrevTrack} isIconOnly>
                    <span className="material-symbols-outlined" aria-hidden>
                        skip_previous
                    </span>
                </Button>
                <Button
                    onClick={handleTogglePlaying}
                    isIconOnly
                    role="switch"
                    aria-checked={isPlaying}
                >
                    <span className="material-symbols-outlined" aria-hidden>
                        {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                </Button>
                <Button onClick={handleNextTrack} isIconOnly>
                    <span className="material-symbols-outlined" aria-hidden>
                        skip_next
                    </span>
                </Button>
            </div>
            {/* <Button
                onClick={() => {
                    if (audioRef.current) {
                        audioRef.current.volume = 0;
                    }
                }}
            >
                Mute
            </Button> */}
            {/* <Button
                onClick={() => {
                    if (audioRef.current) {
                        audioRef.current.volume = 0.3;
                    }
                }}
            >
                Loud
            </Button> */}
            {activeTrack?.imageSrc && (
                <Image
                    className={cx('cover')}
                    src={activeTrack.imageSrc}
                    alt="Accept - Lady Lou"
                    width={50}
                    height={50}
                    quality={70}
                    role="img"
                />
            )}
            {activeTrack && (
                <div>
                    <h1>
                        <b>{activeTrack.title}</b>
                    </h1>
                    <p>
                        {activeTrack.artist} — {activeTrack.album}
                    </p>
                    <p>{activeTrack.year}</p>
                </div>
            )}
        </aside>
    );
};
