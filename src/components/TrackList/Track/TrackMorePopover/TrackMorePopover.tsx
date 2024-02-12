import { Listbox, ListboxItem } from '@nextui-org/react';

import { MorePopover } from '@/components/MorePopover';
import { useHistory } from '@/hooks/context/useHistory';
import { appRoutes } from '@/routes';
import { stopPropagation } from '@/utils';

export interface TrackMorePopoverProps {
    className?: string;
    albumId: string;
    trackSrc: string;
}

export const TrackMorePopover = ({
    className,
    albumId,
    trackSrc,
}: TrackMorePopoverProps) => {
    const { push } = useHistory();

    return (
        <MorePopover
            triggerClassName={className}
            aria-controls={`popover-${trackSrc}`}
            aria-label="Track more actions trigger"
        >
            {(onClose) => (
                <Listbox
                    id={`popover-${trackSrc}`}
                    variant="flat"
                    onAction={onClose}
                    onClick={stopPropagation}
                    aria-label="Track more actions"
                >
                    <ListboxItem
                        key="album"
                        startContent={
                            <span className="material-symbols-outlined">
                                call_made
                            </span>
                        }
                        aria-label="Перейти к альбому"
                        onClick={() => push(appRoutes.fullscreen(albumId))}
                    >
                        Перейти к альбому
                    </ListboxItem>
                    <ListboxItem
                        key="download"
                        startContent={
                            <span className="material-symbols-outlined">
                                download
                            </span>
                        }
                        aria-label="Скачать трек"
                        href={trackSrc}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Скачать трек
                    </ListboxItem>
                </Listbox>
            )}
        </MorePopover>
    );
};
