import cnBind from 'classnames/bind';
import { Link } from '@nextui-org/react';

import { appRoutes } from '@/routes';
import { AlbumList } from '@/components/AlbumList/AlbumList';
import { cloisterBlack } from '@/styles/fonts';

import styles from './RootPage.module.scss';

const cx = cnBind.bind(styles);

export const RootPage = () => (
    <>
        <header className={cx('header', cloisterBlack.className)}>
            My favorite Rock &apos;N&apos; Roll Albums
        </header>
        <main className={cx('main', cloisterBlack.className)}>
            <Link
                href={appRoutes.interactive()}
                className={cx('link')}
                underline="always"
                color="foreground"
            >
                Open Interactive View
            </Link>
            <Link
                href={appRoutes.static()}
                className={cx('link')}
                underline="always"
                color="foreground"
            >
                Open Static View
            </Link>
        </main>
        <div className={cx('container')}>
            <div className={cx('albums-list-container')}>
                <div className={cx('list-wrapper')}>
                    <AlbumList albumsInRow={10} />
                </div>
                <div className={cx('list-wrapper')}>
                    <AlbumList albumsInRow={10} />
                </div>
            </div>
        </div>
    </>
);
