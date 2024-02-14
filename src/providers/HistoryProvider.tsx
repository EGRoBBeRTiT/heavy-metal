import { useMemo, type ReactNode, useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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

const setHistoryToStorage = (history: string[]) => {
    sessionStorage.setItem(LocalStorageItem.HISTORY, JSON.stringify(history));
};

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const fullPathName = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;

    const historyRef = useRef<string[]>(getHistoryFromSession());

    // const routerRef = useRef(router);
    // router = router;

    const value = useMemo<HistoryContextProps>(
        () => ({
            back: () => {
                if (historyRef.current.length > 1) {
                    router.back();
                } else {
                    historyRef.current[0] = appRoutes.root();
                    setHistoryToStorage(historyRef.current);

                    router.replace(appRoutes.root());
                }
            },
            push: (path: string, options?: NavigateOptions) => {
                router.push(path, options);
            },
            replace: (path: string, options?: NavigateOptions) => {
                historyRef.current[historyRef.current.length - 1] = path;
                setHistoryToStorage(historyRef.current);

                router.replace(path, options);
            },
            forward: () => {
                router.forward();
            },
        }),
        [router],
    );

    useEffect(() => {
        const last = historyRef.current[historyRef.current.length - 1];

        if (last !== fullPathName) {
            historyRef.current = [...historyRef.current, fullPathName];
            setHistoryToStorage(historyRef.current);
        }
    }, [fullPathName]);

    useEffect(() => {
        const listener = () => {
            historyRef.current.pop();
            setHistoryToStorage(historyRef.current);
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
