import type { Metadata } from 'next';

import { RootPage } from '@/_pages/RootPage';

export const metadata: Metadata = {
    title: "Hard 'N' Heavy — Сборник альбомов мировых икон в мире hard 'n' heavy и rock 'n' roll'а в лучшем качестве",
    description:
        "Сборник Hard 'N' Heavy — лучшие альбомы в лучшем качестве, расположенные в хронологическом порядке. Просмотр обложки, песен в необычном исполнении и, возможно, кое-что еще...",
    openGraph: {
        title: "Hard 'N' Heavy — Сборник альбомов мировых икон в мире hard 'n' heavy и rock 'n' roll'а в лучшем качестве",
        description:
            "Сборник Hard 'N' Heavy — лучшие альбомы в лучшем качестве, расположенные в хронологическом порядке. Просмотр обложки, песен в необычном исполнении и, возможно, кое-что еще...",
        siteName: "Hard 'N' Heavy",
        images: ['/logo/logo-rect-256.png'],
    },
};

const Home = () => <RootPage />;

export default Home;
