import { useEffect, useRef } from 'react';

export const useEscapeListener = (listener: () => void, canListen = true) => {
    const listenerRef = useRef(listener);

    listenerRef.current = listener;

    useEffect(() => {
        const listenerInner = (event: KeyboardEvent) => {
            if (event.code === 'Escape') {
                listenerRef.current();
            }
        };

        if (canListen) {
            document.addEventListener('keydown', listenerInner);
        }

        return () => {
            document.removeEventListener('keydown', listenerInner);
        };
    }, [canListen]);
};
