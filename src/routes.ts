class AppRoutes {
    root = () => '/' as const;

    interactive = () => '/interactive' as const;

    static = () => '/static' as const;

    fullscreen = (index: number) => `/interactive/fullscreen/${index}` as const;

    coverflow = (index: number) => `/interactive/coverflow/${index}` as const;
}

export const appRoutes = new AppRoutes();
