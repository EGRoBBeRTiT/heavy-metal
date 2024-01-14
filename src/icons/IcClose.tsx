import type { SVGProps } from 'react';

export const IcClose = (
    props: Omit<SVGProps<SVGSVGElement>, 'ref' | 'children'>,
) => (
    <svg
        fill="none"
        height="18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="18"
        aria-hidden="true"
        {...props}
    >
        <path d="M18 6L6 18M6 6l12 12" />
    </svg>
);
