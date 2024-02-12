import type { ButtonProps } from '@nextui-org/button';
import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/react';
import cnBind from 'classnames/bind';

import { appRoutes } from '@/routes';
import { useHistory } from '@/hooks/context/useHistory';

import styles from './ListButton.module.scss';

const cx = cnBind.bind(styles);

export interface ListButtonProps extends Omit<ButtonProps, 'ref' | 'children'> {
    path?: string;
}

export const ListButton = ({
    path = appRoutes.player(),
    title = 'К списку песен',
    onClick,
    className,
    ...props
}: ListButtonProps) => {
    const { push } = useHistory();

    return (
        <Tooltip content={title}>
            <Button
                className={cx('button', className)}
                isIconOnly
                variant="light"
                radius="full"
                size="md"
                title={title}
                aria-label={
                    props['aria-label'] ?? 'Переключиться к списку песен'
                }
                onClick={(e) => {
                    if (onClick) {
                        onClick(e);

                        return;
                    }

                    push(path);
                }}
                {...props}
            >
                <span className="material-symbols-outlined">list</span>
            </Button>
        </Tooltip>
    );
};
