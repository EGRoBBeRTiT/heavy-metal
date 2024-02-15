import type { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { createContext } from 'react';

export interface HistoryContextProps {
    /**
     * Navigate to the previous history entry.
     */
    back: () => void;
    /**
     * Navigate to the next history entry.
     */
    forward: () => void;
    /**
     * Navigate to the provided href.
     * Pushes a new history entry.
     */
    push: (path: string, options?: NavigateOptions) => void;
    /**
     * Navigate to the provided href.
     * Replaces the current history entry.
     */
    replace: (
        path: string,
        useWindowHistory?: boolean,
        options?: NavigateOptions,
    ) => void;
}

const defaultValue: HistoryContextProps = {
    back: () => {
        void undefined;
    },
    forward: () => {
        void undefined;
    },
    push: (path: string) => {
        void path;
    },
    replace: (path: string) => {
        void path;
    },
};

export const HistoryContext = createContext(defaultValue);
