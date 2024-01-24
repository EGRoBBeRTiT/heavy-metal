class AppRoutes {
    root = () => '/' as const;

    interactive = () => '/interactive' as const;

    static = () => '/static' as const;

    fullscreen = (albumId: string) =>
        `/interactive/fullscreen/${albumId}` as const;

    coverflow = (albumId: string) =>
        `/interactive/coverflow/${albumId}` as const;

    player = () => 'player' as const;
}

export const appRoutes = new AppRoutes();
