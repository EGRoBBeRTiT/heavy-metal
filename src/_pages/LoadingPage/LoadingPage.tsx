import { Spinner } from '@nextui-org/react';
import cnBind from 'classnames/bind';

import styles from './LoadingPage.module.scss';

const cx = cnBind.bind(styles);

export const LoadingPage = () => (
    <div className={cx('spinner-container')}>
        <Spinner size="lg" />
    </div>
);
