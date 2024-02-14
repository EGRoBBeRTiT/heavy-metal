import type { MutableRefObject } from 'react';
import { useEffect, useRef } from 'react';

export const useFullScreen = (
    element?: MutableRefObject<HTMLElement | null>,
    onSuccess?: () => void,
    onError?: () => void,
    onClose?: () => void,
) => {
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;
    useEffect(() => {
        const screenChangeListener = () => {
            if (!document.fullscreenElement) {
                onCloseRef.current?.();
            }
        };

        document.addEventListener('fullscreenchange', screenChangeListener);

        return () => {
            document.removeEventListener(
                'fullscreenchange',
                screenChangeListener,
            );
        };
    }, []);

    const onErrorRef = useRef(onError);
    onErrorRef.current = onError;

    const onSuccessRef = useRef(onSuccess);
    onSuccessRef.current = onSuccess;

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
                    onSuccessRef.current?.();
                })
                .catch((error) => {
                    onErrorRef.current?.();
                    // eslint-disable-next-line no-console
                    console.error(error);
                });
        } else if (document.fullscreenElement) {
            void document.exitFullscreen();
        }
    }, [element]);
};
