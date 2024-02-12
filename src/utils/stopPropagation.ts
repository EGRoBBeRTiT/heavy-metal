import type { SyntheticEvent } from 'react';

export const stopPropagation = <E extends SyntheticEvent>(e: E) => {
    e.stopPropagation();
};
