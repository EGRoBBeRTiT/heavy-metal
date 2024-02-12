import cnBind from 'classnames/bind';

import { AlbumList } from '@/components/AlbumList/AlbumList';

import styles from './StaticPage.module.scss';

const cx = cnBind.bind(styles);

export const StaticPage = () => (
    <div className={cx('page')}>
        <section className={cx('section')}>
            <h1 className={cx('hidden')}>Albums list</h1>
            <AlbumList
                width={5000}
                mobileWidth={200}
                quality={100}
                withNextImage
            />
        </section>
    </div>
);
