import React from 'react';

export const LazyAudioPlayerProvider = React.lazy(
    () => import('./AudioPlayerProvider'),
);
