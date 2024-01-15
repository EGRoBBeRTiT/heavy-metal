import type React from 'react';

const RootLayout = ({
    children,
    fullscreen,
    coverflow,
}: {
    children: React.ReactNode;
    fullscreen: React.ReactNode;
    coverflow: React.ReactNode;
}) => (
    <>
        {children}
        {fullscreen}
        {coverflow}
    </>
);

export default RootLayout;
