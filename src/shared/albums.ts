import { ALBUMS_WITH_IDS } from '@/shared/albumsWithIds';
import type { Band } from '@/types/Albums.types';

// import SONG from './song.json';

// export const getAlbum = () => {
//     const { albumName } = Object.values(SONG.resources.songs)[0].attributes;

//     const releaseDate = Object.values(SONG.resources.albums).find(
//         (album) => album.attributes.name === albumName,
//     )?.attributes.releaseDate;

//     const albumId = crypto.randomUUID();

//     return {
//         id: albumId,
//         band: Object.values(SONG.resources.songs)[0].attributes.artistName,
//         imageSrc: '',
//         album: albumName,
//         releasedAt: `new Date("${releaseDate ?? ''}")`,
//         songs: Object.values(SONG.resources.songs).map((song) => ({
//             id: crypto.randomUUID(),
//             title: song.attributes.name,
//             albumId,
//             src: '',
//         })),
//         link: '',
//     };
// };

// console.log(getAlbum());

export interface Song {
    id: string;
    albumId: string;
    title: string;
    src: string;
}

export interface AlbumType {
    band: Band;
    album: string;
    imageSrc: string;
    releasedAt: string;
    songs?: Song[];
    link?: string;
    id: string;
}

export const ALBUMS: AlbumType[] = [...ALBUMS_WITH_IDS].sort(
    (a, b) =>
        new Date(a.releasedAt).getTime() - new Date(b.releasedAt).getTime(),
);

const generateAlbumsMap = () => {
    const map = new Map<string, AlbumType>();

    ALBUMS_WITH_IDS.forEach((album) => {
        map.set(album.id, album);
    });

    return map;
};

export const ALBUMS_MAP = generateAlbumsMap();

const generateSongList = () => {
    const songs: Song[] = [];

    ALBUMS_WITH_IDS.forEach((album) => {
        album.songs?.forEach((song) => {
            songs.push(song);
        });
    });

    return songs.filter((song) => song.src);
};

export const SONGS = generateSongList();
