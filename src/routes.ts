class AppRoutes {
    root = () => '/' as const;

    interactive = () => '/interactive' as const;

    static = () => '/static' as const;

    fullscreen = (albumId: string) =>
        `/interactive/fullscreen?album=${albumId}` as const;

    coverflow = (albumId: string) =>
        `/interactive/coverflow?album=${albumId}` as const;

    player = () => '/player' as const;

    login = (search?: string) => `/login${search ? `?${search}` : ''}` as const;

    register = (search?: string) =>
        `/register${search ? `?${search}` : ''}` as const;
}

export const appRoutes = new AppRoutes();
