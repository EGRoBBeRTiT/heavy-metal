import { useMemo, type ReactNode, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import type { HistoryContextProps } from '@/contexts/HistoryContext';
import { HistoryContext } from '@/contexts/HistoryContext';
import { appRoutes } from '@/routes';
import { LocalStorageItem } from '@/types/LocalStorageItem.types';

const getHistoryFromSession = (): string[] => {
    if (typeof sessionStorage !== 'undefined') {
        const parsedSessionValue = JSON.parse(
            sessionStorage.getItem(LocalStorageItem.HISTORY) || '[]',
        );

        if (Array.isArray(parsedSessionValue)) {
            return parsedSessionValue as string[];
        }
    }

    return [];
};

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const historyRef = useRef<string[]>(getHistoryFromSession());

    const routerRef = useRef(router);
    routerRef.current = router;

    const value = useMemo<HistoryContextProps>(
        () => ({
            back: () => {
                if (historyRef.current.length > 1) {
                    routerRef.current.back();
                } else {
                    routerRef.current.replace(appRoutes.root());
                }
            },
            push: (path: string, options?: NavigateOptions) => {
                routerRef.current.push(path, options);
            },
            replace: (path: string, options?: NavigateOptions) => {
                historyRef.current[historyRef.current.length - 1] = path;

                routerRef.current.replace(path, options);
            },
            forward: () => {
                routerRef.current.forward();
            },
        }),
        [],
    );

    useEffect(() => {
        const last = historyRef.current[historyRef.current.length - 1];

        if (last !== pathname) {
            historyRef.current = [...historyRef.current, pathname];
            sessionStorage.setItem(
                LocalStorageItem.HISTORY,
                JSON.stringify(historyRef.current),
            );
        }
    }, [pathname]);

    useEffect(() => {
        const listener = () => {
            historyRef.current.pop();
            historyRef.current = [...historyRef.current];
            sessionStorage.setItem(
                LocalStorageItem.HISTORY,
                JSON.stringify(historyRef.current),
            );
        };
        window.addEventListener('popstate', listener);

        return () => {
            window.removeEventListener('popstate', listener);
        };
    }, []);

    return (
        <HistoryContext.Provider value={value}>
            {children}
        </HistoryContext.Provider>
    );
};
