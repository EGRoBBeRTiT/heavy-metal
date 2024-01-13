import React from 'react';

export { Album } from './Album';
export { AlbumSkeleton } from './AlbumSkeleton';

export const AlbumLazy = React.lazy(() => import('./Album'));
