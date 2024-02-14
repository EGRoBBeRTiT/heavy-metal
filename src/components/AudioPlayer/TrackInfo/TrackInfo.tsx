import cnBind from 'classnames/bind';
import Image from 'next/image';
import {
    useMemo,
    type DetailedHTMLProps,
    type HTMLAttributes,
    useCallback,
} from 'react';
import { usePathname } from 'next/navigation';
import { Tooltip } from '@nextui-org/react';

import { useAudioPlayerView } from '@/contexts/AudioPlayerViewProvider';
import { appRoutes } from '@/routes';
import { useAlbums } from '@/contexts/StoreProvider';
import { useAudioPlayer } from '@/hooks/context/useAudioPlayer';
import { TrackSlider } from '@/components/AudioPlayer/TrackSlider';
import { useHistory } from '@/hooks/context/useHistory';

import styles from './TrackInfo.module.scss';

const cx = cnBind.bind(styles);

export type TrackInfoProps = Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'ref' | 'children'
>;

export const TrackInfo = ({ className, ...props }: TrackInfoProps) => {
    const { albumsMap } = useAlbums();
    const pathname = usePathname();
    const { activeTrack } = useAudioPlayer();
    const { push, replace } = useHistory();

    const { view } = useAudioPlayerView();

    const album = useMemo(
        () =>
            activeTrack?.albumId ? albumsMap.get(activeTrack?.albumId) : null,
        [activeTrack?.albumId, albumsMap],
    );

    const handleImageClick = useCallback(() => {
        if (activeTrack?.id) {
            if (pathname.startsWith(appRoutes.fullscreen())) {
                replace(appRoutes.fullscreen(activeTrack.albumId));
            } else {
                push(appRoutes.fullscreen(activeTrack.albumId));
            }
        }
    }, [activeTrack?.albumId, activeTrack?.id, pathname, push, replace]);

    return (
        <div {...props} className={cx('track-info', className)}>
            {album?.imageSrc && (
                <Tooltip content="Открыть альбом">
                    <Image
                        className={cx('cover')}
                        src={album.imageSrc}
                        alt={`${album.band} ${album.album}`}
                        width={50}
                        height={50}
                        quality={70}
                        role="img"
                        onClick={handleImageClick}
                    />
                </Tooltip>
            )}
            {activeTrack && (
                <div className={cx('info', view)}>
                    {view === 'full' && <TrackSlider size="sm" />}
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
