import { useDisclosure } from '@nextui-org/react';
import { useCallback, useEffect, useRef } from 'react';

export const useDisclosureState = () => {
    const { isOpen, onOpen, onClose, onOpenChange, ...props } = useDisclosure();

    const onOpenRef = useRef(onOpen);
    const onCloseRef = useRef(onClose);
    const onOpenChangeRef = useRef(onOpenChange);

    useEffect(() => {
        onOpenRef.current = onOpen;
    }, [onOpen]);

    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        onOpenChangeRef.current = onOpenChange;
    }, [onOpenChange]);

    const handleOpen = useCallback(() => {
        onOpenRef.current();
    }, []);

    const handleClose = useCallback(() => {
        onCloseRef.current();
    }, []);

    const handleOpenChange = useCallback(() => {
        onOpenChangeRef.current();
    }, []);

    return [
        isOpen,
        handleOpen,
        handleClose,
        handleOpenChange,
        { ...props },
    ] as const;
};
