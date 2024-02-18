'use client';

import cnBind from 'classnames/bind';
import { Link } from '@nextui-org/react';

import { appRoutes } from '@/routes';
import { cloisterBlack } from '@/styles/fonts';
import { AnimatedAlbumList } from '@/components/AnimatedAlbumList';
import { AnimatedBands } from '@/components/AnimatedBands';
import { useProfile } from '@/contexts/StoreProvider';
import { isAdminOrStaff } from '@/utils/isAdminOrStaff';
import { useHistory } from '@/hooks/context/useHistory';

import styles from './RootPage.module.scss';

const cx = cnBind.bind(styles);

export const RootPage = () => {
    const { push } = useHistory();

    const profile = useProfile();

    const showPlayerLink = isAdminOrStaff(profile);

    return (
        <>
            <div className={cx('main', cloisterBlack.className)}>
                <nav>
                    <ul>
                        <li>
                            <Link
                                href={appRoutes.interactive()}
                                className={cx('link')}
                                underline="always"
                                color="foreground"
                                onClick={(e) => {
                                    e.preventDefault();

                                    push(appRoutes.interactive());
                                }}
                            >
                                Interactive View
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={appRoutes.static()}
                                className={cx('link')}
                                underline="always"
                                color="foreground"
                                onClick={(e) => {
                                    e.preventDefault();

                                    push(appRoutes.static());
                                }}
                            >
                                Static View
                            </Link>
                        </li>
                        {showPlayerLink && (
                            <li>
                                <Link
                                    href={appRoutes.player()}
                                    className={cx('link')}
                                    underline="always"
                                    color="foreground"
                                    onClick={(e) => {
                                        e.preventDefault();

                                        push(appRoutes.player());
                                    }}
                                >
                                    Player
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
            <div className={cx('background')}>
                <section>
                    <h1 className={cx('hidden')}>Rock Albums images</h1>
                    <AnimatedAlbumList withNextImage />
                </section>
                <section>
                    <h1 className={cx('hidden')}>Rock Bands</h1>
                    <AnimatedBands className={cx('animated-bands')} />
                </section>
            </div>
        </>
    );
};
