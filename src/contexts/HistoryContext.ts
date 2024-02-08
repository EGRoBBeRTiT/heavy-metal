import type { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { createContext } from 'react';

export interface HistoryContextProps {
    back: () => void;
    push: (path: string, options?: NavigateOptions) => void;
    replace: (path: string, options?: NavigateOptions) => void;
    forward: () => void;
}

const defaultValue: HistoryContextProps = {
    back: () => {
        void undefined;
    },
    push: (path: string) => {
        void path;
    },
    replace: (path: string) => {
        void path;
    },
    forward: () => {
        void undefined;
    },
};

export const HistoryContext = createContext(defaultValue);
