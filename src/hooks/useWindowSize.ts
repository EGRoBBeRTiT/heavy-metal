import throttle from 'lodash.throttle';
import { useEffect, useMemo, useState } from 'react';

export const useWindowSize = (throttleWait = 200) => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const throttleWindowChange = useMemo(
        () =>
            throttle(() => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
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
