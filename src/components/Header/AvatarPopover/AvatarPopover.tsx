import type { AvatarProps } from '@nextui-org/react';
import {
    Avatar,
    Listbox,
    ListboxItem,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@nextui-org/react';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import cnBind from 'classnames/bind';

import { appRoutes } from '@/routes';
import { useHistory } from '@/hooks/context/useHistory';
import { useProfile } from '@/contexts/StoreProvider';

import styles from './AvatarPopover.module.scss';

const cx = cnBind.bind(styles);

export interface AvatarPopoverProps {
    name: string;
    isBordered?: boolean;
    color?: AvatarProps['color'];
}

const AvatarPopover = ({ name, isBordered, color }: AvatarPopoverProps) => {
    const profile = useProfile();
    const { push } = useHistory();
    const [popoverOpened, setPopoverOpened] = useState(false);

    return (
        <Popover
            showArrow
            placement="bottom-end"
            isOpen={popoverOpened}
            onOpenChange={(open) => setPopoverOpened(open)}
        >
            <PopoverTrigger>
                <Avatar
                    className={cx('avatar')}
                    name={name}
                    isBordered={isBordered}
                    color={color}
                    size="md"
                    isFocusable
                    aria-controls="avatar-popover"
                    role="button"
                />
            </PopoverTrigger>
            <PopoverContent>
                <Listbox
                    id="avatar-popover"
                    aria-label="Actions"
                    onAction={() => setPopoverOpened(false)}
                >
                    {profile ? (
                        <ListboxItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                            onClick={() => {
                                void signOut();
                            }}
                        >
                            Выйти
                        </ListboxItem>
                    ) : (
                        <ListboxItem
                            key="login"
                            href={appRoutes.login()}
                            onClick={(e) => {
                                e.preventDefault();

                                push(appRoutes.login());
                            }}
                        >
                            Войти
                        </ListboxItem>
                    )}
                </Listbox>
            </PopoverContent>
        </Popover>
    );
};

export default AvatarPopover;
