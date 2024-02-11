/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */

'use server';

import { cache } from 'react';

import type { AlbumType } from '@/shared/albums';
import { DATA_BASE, clientDb } from '@/api/config';

export const getAlbumById = cache(async (uid: string) => {
    try {
        const db = await clientDb();

        const albums = await db
            .collection<AlbumType>(DATA_BASE.COLLECTION.ALBUMS)
            .find({ id: uid })
            .toArray();

        if (!albums.length) {
            return null;
        }

        const { _id, ...album } = albums[0] ?? null;

        return {
            ...album,
            songs: album.songs?.map((song) => ({
                ...song,
                src: '',
            })),
        };
    } catch (error) {
        console.error(`Failed to fetch album with id ${uid}:`, error);

        throw new Error(`Failed to fetch album ${uid}.`);
    }
});
