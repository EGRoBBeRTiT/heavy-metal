'use client';

import cnBind from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';
import type { AvatarProps } from '@nextui-org/react';
import {
    Avatar,
    Listbox,
    ListboxItem,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Tooltip,
} from '@nextui-org/react';

import { cloisterBlack } from '@/styles/fonts';
import { useGoBack } from '@/hooks/useGoBack';
import { appRoutes } from '@/routes';
import { signOut } from '@/auth';
import { useProfile } from '@/contexts/StoreProvider';
import { getStringHash } from '@/utils';
import { useScreenConfig } from '@/contexts/ScreenConfigProvider';
import { isAdminOrStaff } from '@/utils/isAdminOrStaff';

import styles from './Header.module.scss';

const cx = cnBind.bind(styles);

const AVATAR_COLORS: AvatarProps['color'][] = [
    'danger',
    'primary',
    'secondary',
    'success',
    'warning',
];

export const Header = () => {
    const profile = useProfile();

    const { isMobile, isTablet } = useScreenConfig();

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

    const [popoverOpened, setPopoverOpened] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const [showBackButton, setShowBackButton] = useState(false);
    const [goBack] = useGoBack();
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        document.documentElement.style.setProperty(
            '--header-height',
            `${(headerRef.current?.clientHeight ?? 0) + 1}px`,
        );
    }, []);

    useEffect(() => {
        setShowBackButton(pathname !== appRoutes.root());
    }, [pathname]);

    return (
        <header ref={headerRef} className={cx('header')}>
            {showBackButton && (
                <Tooltip content="Назад">
                    <Button
                        onClick={() => goBack()}
                        variant="light"
                        size="lg"
                        className={cx('back-button')}
                        isIconOnly={isMobile || isTablet}
                    >
                        <span className="material-symbols-outlined" aria-hidden>
                            keyboard_backspace
                        </span>
                    </Button>
                </Tooltip>
            )}
            <h1 className={cx('title', cloisterBlack.className)}>
                The Best Rock &apos;n&apos; Roll Albums
            </h1>
            <Popover
                showArrow
                placement="top-end"
                isOpen={popoverOpened}
                onOpenChange={(open) => setPopoverOpened(open)}
            >
                <PopoverTrigger>
                    <Avatar
                        className={cx('avatar')}
                        name={nameForAvatar}
                        color={avatarColor}
                        size="md"
                        isBordered={isPrimary}
                        isFocusable
                        aria-controls="avatar-popover"
                        role="button"
                    />
                </PopoverTrigger>
                <PopoverContent>
                    <Listbox
                        id="avatar-popover"
                        aria-label="Actions"
                        onAction={() => setPopoverOpened(false)}
                    >
                        {profile ? (
                            <ListboxItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                                onClick={() => {
                                    void signOut();
                                }}
                            >
                                Выйти
                            </ListboxItem>
                        ) : (
                            <ListboxItem
                                key="login"
                                href={appRoutes.login()}
                                onClick={(e) => {
                                    e.preventDefault();

                                    router.push(appRoutes.login());
                                }}
                            >
                                Войти
                            </ListboxItem>
                        )}
                    </Listbox>
                </PopoverContent>
            </Popover>
        </header>
    );
};
