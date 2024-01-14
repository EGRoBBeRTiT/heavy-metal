import cnBind from 'classnames/bind';
import { Link } from '@nextui-org/react';

import { appRoutes } from '@/routes';
import { cloisterBlack } from '@/styles/fonts';
import { AnimatedAlbumList } from '@/components/AnimatedAlbumList';
import { AnimatedBands } from '@/components/AnimatedBands';

import styles from './RootPage.module.scss';

const cx = cnBind.bind(styles);

export const RootPage = () => (
    <>
        <main className={cx('main', cloisterBlack.className)}>
            <header className={cx('header', cloisterBlack.className)}>
                <h1>My favorite Rock &apos;N&apos; Roll Albums</h1>
            </header>
            <div className={cx('content')}>
                <nav>
                    <ul>
                        <li>
                            <Link
                                href={appRoutes.interactive()}
                                className={cx('link')}
                                underline="always"
                                color="foreground"
                            >
                                Open Interactive View
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={appRoutes.static()}
                                className={cx('link')}
                                underline="always"
                                color="foreground"
                            >
                                Open Static View
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </main>
        <section>
            <h1 className={cx('hidden')}>Rock Albums images</h1>
            <AnimatedAlbumList />
        </section>
        <section>
            <h1 className={cx('hidden')}>Rock Bands</h1>
            <AnimatedBands className={cx('animated-bands')} />
        </section>
    </>
);
