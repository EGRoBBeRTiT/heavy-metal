'use client';

import { Modal, ModalBody, ModalContent } from '@nextui-org/react';

import { LoginForm } from '@/components/LoginForm';
import { RegisterForm } from '@/components/RegisterForm';
import { useHistory } from '@/hooks/context/useHistory';

export interface LoginPageProps {
    isRegister?: boolean;
}

export const LoginPage = ({ isRegister }: LoginPageProps) => {
    const { back } = useHistory();

    return (
        <Modal defaultOpen onClose={back}>
            <ModalContent>
                <ModalBody>
                    {isRegister ? <RegisterForm /> : <LoginForm />}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
