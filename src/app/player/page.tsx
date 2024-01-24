import Link from 'next/link';

import { appRoutes } from '@/routes';

const Page = () => (
    <section>
        <header>
            <h1>Player</h1>
        </header>
        <Link href={appRoutes.root()}>Back</Link>
    </section>
);

export default Page;
