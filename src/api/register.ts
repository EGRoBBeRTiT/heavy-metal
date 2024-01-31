/* eslint-disable no-console */

import { createUser } from '@/api/createUser';
import { signIn } from '@/auth';

export const register = async (
    prevState: string | undefined,
    formData: FormData,
) => {
    try {
        await createUser(formData);
        await signIn('credentials', formData);
    } catch (error) {
        if (typeof error === 'object' && error && 'message' in error) {
            return error.message as string;
        }

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
