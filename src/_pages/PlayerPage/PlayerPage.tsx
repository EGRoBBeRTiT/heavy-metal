import cnBind from 'classnames/bind';

import { TrackList } from '@/components/TrackList';

import styles from './PlayerPage.module.scss';

const cx = cnBind.bind(styles);

export const PlayerPage = () => (
    <section className={cx('section')}>
        <TrackList className={cx('list')} />
    </section>
);
