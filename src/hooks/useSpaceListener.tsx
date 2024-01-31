import { useEffect, useRef } from 'react';

export const useSpaceListener = (handler: () => void | Promise<void>) => {
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                event.preventDefault();

                void handlerRef.current();
            }
        };
        document.addEventListener('keydown', listener);

        return () => {
            document.removeEventListener('keydown', listener);
        };
    }, []);
};
