import type { ButtonProps } from '@nextui-org/button';
import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/react';
import cnBind from 'classnames/bind';

import styles from './DownloadButton.module.scss';

const cx = cnBind.bind(styles);

export interface DownloadButtonProps
    extends Omit<ButtonProps, 'ref' | 'children'> {
    href?: string;
}

export const DownloadButton = ({
    href,
    className,
    title = 'Скачать',
    tabIndex,
    ...props
}: DownloadButtonProps) => (
    <Tooltip content={title}>
        <a
            href={href}
            download={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            tabIndex={tabIndex}
        >
            <Button
                isIconOnly
                variant="light"
                radius="full"
                size="md"
                title={title}
                aria-label={props['aria-label'] ?? 'Скачать трек'}
                tabIndex={-1}
                className={cx('button')}
                {...props}
            >
                <span className="material-symbols-outlined">download</span>
            </Button>
        </a>
    </Tooltip>
);
