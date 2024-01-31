/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */

'use server';

import { cache } from 'react';

import type { AlbumType, Song } from '@/shared/albums';
import { auth } from '@/auth';
import { getUser } from '@/api/getUser';
import { isAdminOrStaff } from '@/utils/isAdminOrStaff';
import { DATA_BASE, clientDb } from '@/api/config';

export const getAlbums = cache(async () => {
    try {
        const db = await clientDb();

        const albums = await db
            .collection<AlbumType>(DATA_BASE.COLLECTION.ALBUMS)
            .find({})
            .sort({ releasedAt: 1 })
            .toArray();

        const session = await auth();

        const filterAlbums = async () => {
            if (session && session.user && session.user.email) {
                const user = await getUser(session.user.email);

                if (isAdminOrStaff(user)) {
                    return albums.map(({ _id, ...album }) => album);
                }
            }

            return albums.map(({ _id, ...album }) => ({
                ...album,
                songs: album.songs?.map((song) => ({
                    ...song,
                    src: '',
                })),
            }));
        };

        const filteredAlbums = await filterAlbums();

        const generateAlbumsMap = () => {
            const map = new Map<string, AlbumType>();

            filteredAlbums.forEach((album) => {
                map.set(album.id, album);
            });

            return map;
        };

        const generateSongList = () => {
            const songs: Song[] = [];

            filteredAlbums.forEach((album) => {
                album.songs?.forEach((song) => {
                    songs.push(song);
                });
            });

            return songs.filter((song) => song.src);
        };

        return {
            albums: filteredAlbums,
            albumsMap: generateAlbumsMap(),
            songs: generateSongList(),
        };
    } catch (error) {
        console.error('Failed to fetch albums:', error);

        throw new Error('Failed to fetch albums.');
    }
});
