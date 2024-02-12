import type { ButtonProps } from '@nextui-org/react';
import {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@nextui-org/react';
import { useState, type ReactNode } from 'react';

export interface MorePopoverProps
    extends Omit<ButtonProps, 'children' | 'ref'> {
    children: (onClose: () => void) => ReactNode;
    triggerClassName?: string;
}

export const MorePopover = ({
    children,
    triggerClassName,
    className,
    ...props
}: MorePopoverProps) => {
    const [popoverOpened, setPopoverOpened] = useState(false);

    return (
        <Popover
            placement="bottom-end"
            isOpen={popoverOpened}
            onOpenChange={(open) => setPopoverOpened(open)}
            className={className}
        >
            <PopoverTrigger>
                <Button
                    isIconOnly
                    variant="light"
                    radius="full"
                    size="md"
                    className={triggerClassName}
                    {...props}
                >
                    <span className="material-symbols-outlined">more_vert</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                {children(() => {
                    setPopoverOpened(false);
                })}
            </PopoverContent>
        </Popover>
    );
};
