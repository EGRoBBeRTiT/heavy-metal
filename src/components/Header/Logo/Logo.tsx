import Link from 'next/link';
import cnBind from 'classnames/bind';

import { useHistory } from '@/hooks/context/useHistory';
import { appRoutes } from '@/routes';
import { IcLogo } from '@/icons';

import styles from './Logo.module.scss';

const cx = cnBind.bind(styles);

const Logo = () => {
    const { push } = useHistory();

    return (
        <Link
            href={appRoutes.root()}
            onClick={(e) => {
                e.preventDefault();
                push(appRoutes.root());
            }}
        >
            <IcLogo className={cx('logo-icon')} />
        </Link>
    );
};

export default Logo;
