/* eslint-disable no-console */
import clientPromise from '@/lib/mongodb';
import type { User } from '@/types/User.types';

export const getUser = async (email: string): Promise<User | null> => {
    try {
        const client = await clientPromise;

        const db = client.db('heavy-metal');

        const user = await db
            .collection<User>('users')
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
