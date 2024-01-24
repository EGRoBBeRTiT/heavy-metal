import cnBind from 'classnames/bind';
import Image from 'next/image';
import { useMemo, type DetailedHTMLProps, type HTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';

import { useAudioPlayerContext } from '@/contexts/AudioPlayerProvider/AudioPlayerProvider';
import { ALBUMS_MAP } from '@/shared/albums';
import { useAudioPlayerView } from '@/contexts/AudioPlayerViewProvider';
import { appRoutes } from '@/routes';

import styles from './TrackInfo.module.scss';

const cx = cnBind.bind(styles);

export type TrackInfoProps = Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'ref' | 'children'
>;

export const TrackInfo = ({ className, ...props }: TrackInfoProps) => {
    const router = useRouter();
    const { activeTrack } = useAudioPlayerContext();

    const { view } = useAudioPlayerView();

    const album = useMemo(
        () =>
            activeTrack?.albumId ? ALBUMS_MAP.get(activeTrack?.albumId) : null,
        [activeTrack?.albumId],
    );

    return (
        <div {...props} className={cx('track-info', className)}>
            {album?.imageSrc && (
                <Image
                    className={cx('cover')}
                    src={album.imageSrc}
                    alt="Accept - Lady Lou"
                    width={50}
                    height={50}
                    quality={70}
                    role="img"
                    onClick={() => {
                        if (activeTrack?.id) {
                            router.push(
                                appRoutes.fullscreen(activeTrack.albumId),
                            );
                        }
                    }}
                />
            )}
            {activeTrack && (
                <div className={cx('info', view)}>
                    <h1>
                        <b>{activeTrack.title}</b>
                    </h1>
                    <p className={cx('add-info')}>
                        {album?.band} — {album?.album}
                        {` • `}
                        {album?.releasedAt
                            ? new Date(album?.releasedAt).getFullYear()
                            : ''}
                    </p>
                </div>
            )}
        </div>
    );
};
