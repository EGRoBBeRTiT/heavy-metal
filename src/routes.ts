class AppRoutes {
    root = () => '/' as const;

    interactive = () => '/interactive' as const;

    static = () => '/static' as const;

    fullscreen = (albumId: string) =>
        `/interactive/fullscreen/${albumId}` as const;

    coverflow = (index: number) => `/interactive/coverflow/${index}` as const;

    player = () => 'player' as const;
}

export const appRoutes = new AppRoutes();
