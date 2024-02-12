'use client';

import cnBind from 'classnames/bind';
import { Suspense, cache, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@nextui-org/button';
import type { AvatarProps } from '@nextui-org/react';
import { Tooltip } from '@nextui-org/react';

import { appRoutes } from '@/routes';
import { useProfile } from '@/contexts/StoreProvider';
import { getStringHash } from '@/utils';
import { isAdminOrStaff } from '@/utils/isAdminOrStaff';
import { useHistory } from '@/hooks/context/useHistory';
import { useAudioPlayerView } from '@/contexts/AudioPlayerViewProvider';
import { LazyAudioPlayer } from '@/components/AudioPlayer';
import { useScreenConfig } from '@/contexts/ScreenConfigProvider';

import styles from './Header.module.scss';
import { LazyLogo } from './Logo';
import { LazyTitle } from './Title';
import { LazyAvatarPopover } from './AvatarPopover';

const cx = cnBind.bind(styles);

const AVATAR_COLORS: AvatarProps['color'][] = [
    'danger',
    'primary',
    'secondary',
    'success',
    'warning',
];

const setHeaderHeight = cache((height: number) => {
    document.documentElement.style.setProperty(
        '--header-height',
        `${height}px`,
    );
});

export interface HeaderProps {
    withPlayer?: boolean;
}

export const Header = ({ withPlayer }: HeaderProps) => {
    const profile = useProfile();
    const { view } = useAudioPlayerView();
    const { isMobile } = useScreenConfig();
    const [mounted, setMounted] = useState(false);

    const nameForAvatar = profile
        ? `${profile.firstName?.[0] ?? ''}${profile.lastName?.[0] ?? ''}`
        : '';

    const avatarColor = profile
        ? AVATAR_COLORS[
              getStringHash(
                  (profile.firstName ?? '') + (profile.lastName ?? ''),
              ) % AVATAR_COLORS.length
          ]
        : 'default';

    const isPrimary = isAdminOrStaff(profile);

    const pathname = usePathname();

    const [showBackButton, setShowBackButton] = useState(false);
    const { back } = useHistory();

    useEffect(() => {
        setShowBackButton(pathname !== appRoutes.root());
    }, [pathname]);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header
            ref={(node) => {
                setHeaderHeight(node?.offsetHeight || 0);
            }}
            className={cx('header')}
        >
            {!isMobile && mounted && (
                <Suspense fallback={null}>
                    <LazyLogo />
                </Suspense>
            )}
            {showBackButton && (
                <Tooltip content="Назад">
                    <Button
                        onClick={back}
                        variant="light"
                        size="md"
                        className={cx('back-button')}
                        isIconOnly
                    >
                        <span className="material-symbols-outlined" aria-hidden>
                            keyboard_backspace
                        </span>
                    </Button>
                </Tooltip>
            )}
            {view === 'full' && withPlayer ? (
                <div className={cx('player-container')}>
                    <Suspense fallback={null}>
                        <LazyAudioPlayer />
                    </Suspense>
                </div>
            ) : (
                <Suspense fallback={<div className={cx('title')} />}>
                    <LazyTitle className={cx('title')} />
                </Suspense>
            )}
            {mounted && (
                <Suspense fallback={<div />}>
                    <LazyAvatarPopover
                        name={nameForAvatar}
                        isBordered={isPrimary}
                        color={avatarColor}
                    />
                </Suspense>
            )}
        </header>
    );
};
