import { useEffect, useRef } from 'react';

export const useSpaceListener = (handler: () => void) => {
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                event.preventDefault();

                handlerRef.current();
            }
        };
        document.addEventListener('keydown', listener);

        return () => {
            document.removeEventListener('keydown', listener);
        };
    }, []);
};
