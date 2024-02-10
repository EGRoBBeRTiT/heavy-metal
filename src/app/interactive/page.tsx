import type { Metadata } from 'next';

import { InteractivePage } from '@/_pages/InteractivePage';

export const metadata: Metadata = {
    title: 'Интерактивный просмотр альбомов',
    description:
        'Лучшие альбомы в лучшем качестве, расположенные в хронологическом порядке. Просмотр обложки, песен в необычном исполнении',
    openGraph: {
        title: 'Интерактивный просмотр альбомов',
        description:
            'Лучшие альбомы в лучшем качестве, расположенные в хронологическом порядке. Просмотр обложки, песен в необычном исполнении',
        siteName: "Hard 'N' Heavy",
        images: ['/logo/logo-rect-256.png'],
    },
};

const Home = () => <InteractivePage />;

export default Home;
