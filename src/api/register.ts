/* eslint-disable no-console */

'use server';

import bcrypt from 'bcrypt';

import clientPromise from '@/lib/mongodb';
import { UserType, type User } from '@/types/User.types';

export const register = async (
    prevState: string | undefined,
    formData: FormData,
) => {
    try {
        const email = formData.get('email')?.toString() ?? '';
        const password = formData.get('password')?.toString() ?? '';
        // const passwordRepeat = formData.get('passwordRepeat')?.toString() ?? '';
        const firstName = formData.get('firstName')?.toString() ?? '';
        const lastName = formData.get('lastName')?.toString() ?? '';

        const client = await clientPromise;

        const db = client.db('heavy-metal');

        await db.collection<User>('users').insertOne({
            email,
            password: await bcrypt.hash(password, 10),
            firstName,
            lastName,
            type: UserType.DEFAULT,
        });
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
