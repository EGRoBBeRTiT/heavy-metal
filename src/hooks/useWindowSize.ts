'use client';

import throttle from 'lodash.throttle';
import { useEffect, useMemo, useState } from 'react';

export const useWindowSize = (throttleWait = 200) => {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

    useEffect(() => {
        setWindowSize({
            width: typeof window !== 'undefined' ? window.innerWidth : 0,
            height: typeof window !== 'undefined' ? window.innerHeight : 0,
        });
    }, []);

    const throttleWindowChange = useMemo(
        () =>
            throttle(() => {
                setWindowSize({
                    width:
                        typeof window !== 'undefined' ? window.innerWidth : 0,
                    height:
                        typeof window !== 'undefined' ? window.innerHeight : 0,
                });
            }, throttleWait),
        [throttleWait],
    );

    useEffect(() => {
        window.addEventListener('resize', throttleWindowChange);

        return () => {
            window.removeEventListener('resize', throttleWindowChange);
        };
    }, [throttleWindowChange]);

    return { ...windowSize } as const;
};
