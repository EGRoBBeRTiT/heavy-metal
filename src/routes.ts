class AppRoutes {
    root = () => '/' as const;

    interactive = () => '/interactive' as const;

    static = () => '/static' as const;
}

export const appRoutes = new AppRoutes();
