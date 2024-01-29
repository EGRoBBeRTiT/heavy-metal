'use client';

import { Modal, ModalBody, ModalContent } from '@nextui-org/react';

import { LoginForm } from '@/components/LoginForm';
import { useGoBack } from '@/hooks/useGoBack';
import { RegisterForm } from '@/components/RegisterForm';

export interface LoginPageProps {
    isRegister?: boolean;
}

export const LoginPage = ({ isRegister }: LoginPageProps) => {
    const [goBack] = useGoBack();

    return (
        <Modal defaultOpen onClose={() => goBack()}>
            <ModalContent>
                <ModalBody>
                    {isRegister ? <RegisterForm /> : <LoginForm />}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
