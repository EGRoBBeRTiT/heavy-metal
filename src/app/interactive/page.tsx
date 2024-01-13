import type { Metadata } from 'next';

import { InteractivePage } from '@/_pages/InteractivePage';

export const metadata: Metadata = {
    title: 'Interaction with Albums',
    description: "Interaction with Rock 'N' Roll Albums",
};

const Home = () => <InteractivePage />;

export default Home;
