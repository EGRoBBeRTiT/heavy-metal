/* eslint-disable no-console */
import { signIn } from '@/auth';

export const authenticate = async (
    prevState: string | undefined,
    formData: FormData,
) => {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (typeof error === 'object' && error && 'type' in error) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }

        console.error(error);

        return 'Something went wrong.';
    }
};
