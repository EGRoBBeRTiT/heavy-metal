import type { MutableRefObject } from 'react';
import { useEffect } from 'react';

export const useFullScreen = (
    element?: MutableRefObject<HTMLElement | null>,
    onSuccess?: () => void,
    onError?: () => void,
    onClose?: () => void,
) => {
    useEffect(() => {
        const screenChangeListener = () => {
            if (!document.fullscreenElement) {
                onClose?.();
            }
        };

        document.addEventListener('fullscreenchange', screenChangeListener);

        return () => {
            document.removeEventListener(
                'fullscreenchange',
                screenChangeListener,
            );
        };
    }, [onClose]);

    useEffect(() => {
        if (
            element?.current &&
            document.fullscreenEnabled &&
            typeof element?.current.requestFullscreen !== 'undefined' &&
            !document.fullscreenElement
        ) {
            element?.current
                .requestFullscreen({ navigationUI: 'auto' })
                .then(() => {
                    onSuccess?.();
                })
                .catch((error) => {
                    onError?.();
                    // eslint-disable-next-line no-console
                    console.error(error);
                });
        } else if (document.fullscreenElement) {
            void document.exitFullscreen();
        }
    }, [element, onError, onSuccess]);
};
