import cnBind from 'classnames/bind';

import { IcCorner } from '@/assets';

import { InteractivePageContent } from './InteractivePageContent';
import styles from './InteractivePage.module.scss';

const cx = cnBind.bind(styles);

export const InteractivePage = () => (
    <main className={cx('main')}>
        <div className={cx('box')}>
            {Array.from({ length: 4 }, (_, index) => (
                <IcCorner
                    key={index}
                    width={50}
                    height={50}
                    className={cx('corner')}
                />
            ))}
            <div className={cx('content')}>
                <InteractivePageContent />
            </div>
        </div>
    </main>
);
