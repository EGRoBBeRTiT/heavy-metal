import { useEffect, useMemo, useState } from 'react';
import throttle from 'lodash.throttle';

export const SCREEN_MOBILE_MAX = 768 as const;
export const SCREEN_TABLET_MAX = 992 as const;
export const SCREEN_DESKTOP_MAX = 1200 as const;
export const SCREEN_LARGE_MONITOR_MIN = SCREEN_DESKTOP_MAX + 1;

export interface WindowConfig {
    isMobile: boolean;
    isTablet: boolean;
    isNotebook: boolean;
    isDesktop: boolean;
    isLargeMonitor: boolean;
}

const getWindowConfig = (): WindowConfig => {
    let innerWidth = 0;

    if (typeof window !== 'undefined') {
        innerWidth = window.innerWidth;
    }

    switch (true) {
        case innerWidth >= SCREEN_DESKTOP_MAX:
            return {
                isMobile: false,
                isTablet: false,
                isNotebook: false,
                isDesktop: true,
                isLargeMonitor: true,
            };
        case innerWidth > SCREEN_TABLET_MAX:
            return {
                isMobile: false,
                isTablet: false,
                isNotebook: true,
                isDesktop: true,
                isLargeMonitor: false,
            };
        case innerWidth > SCREEN_MOBILE_MAX:
            return {
                isMobile: false,
                isTablet: true,
                isNotebook: false,
                isDesktop: false,
                isLargeMonitor: false,
            };
        case innerWidth <= SCREEN_MOBILE_MAX:
            return {
                isMobile: true,
                isTablet: false,
                isNotebook: false,
                isDesktop: false,
                isLargeMonitor: false,
            };

        default:
            return {
                isMobile: false,
                isTablet: false,
                isNotebook: false,
                isDesktop: false,
                isLargeMonitor: false,
            };
    }
};

export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowConfig());

    const throttleWindowChange = useMemo(
        () =>
            throttle(() => {
                const newConfig = getWindowConfig();

                if (
                    JSON.stringify(windowDimensions) !==
                    JSON.stringify(newConfig)
                ) {
                    setWindowDimensions(newConfig);
                }
            }, 200),
        [windowDimensions],
    );

    useEffect(() => {
        window.addEventListener('resize', throttleWindowChange);

        return () => {
            window.removeEventListener('resize', throttleWindowChange);
        };
    }, [throttleWindowChange]);

    return windowDimensions;
};
