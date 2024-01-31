import clientPromise from '@/lib/mongodb';

class DataBase {
    public NAME = 'heavy-metal' as const;

    public COLLECTION = {
        ALBUMS: 'albums' as const,
        USERS: 'users' as const,
    };
}

export const DATA_BASE = new DataBase();

export const clientDb = async () => {
    const client = await clientPromise;

    const db = client.db(DATA_BASE.NAME);

    return db;
};
