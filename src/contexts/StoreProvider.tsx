'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';

import type { User } from '@/types/User.types';
import type { AlbumType, Song } from '@/shared/albums';

export type Profile = Partial<Omit<User, 'password'>>;

export interface AlbumsStore {
    albums: AlbumType[];
    albumsMap: Map<string, AlbumType>;
    songs: Song[];
}

export interface Store {
    profile: Profile | null;
    albums: AlbumsStore;
}

const StoreContext = createContext<Store>({
    profile: null,
    albums: { albums: [], songs: [], albumsMap: new Map() },
});

export const useProfile = () => useContext(StoreContext).profile;
export const useAlbums = () => useContext(StoreContext).albums;

export interface StoreProviderProps {
    children: ReactNode;
    profile: Profile | null;
    albums: AlbumsStore;
}

export const StoreProvider = ({
    children,
    profile,
    albums,
}: StoreProviderProps) => {
    const value = useMemo(() => ({ profile, albums }), [profile, albums]);

    return (
        <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    );
};
