/* eslint-disable no-console */
import { DATA_BASE, clientDb } from '@/api/config';
import type { User } from '@/types/User.types';

export const getUser = async (email: string): Promise<User | null> => {
    try {
        const db = await clientDb();

        const user = await db
            .collection<User>(DATA_BASE.COLLECTION.USERS)
            .find({ email })
            .toArray();

        if (user.length) {
            return user[0];
        }

        return null;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
};
