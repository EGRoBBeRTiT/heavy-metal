import Link from 'next/link';
import { redirect } from 'next/navigation';

import { appRoutes } from '@/routes';
import { getLoggedProfile } from '@/api/getLoggedProfile';
import { isAdminOrStaff } from '@/utils/isAdminOrStaff';

const Page = async () => {
    const profile = await getLoggedProfile();

    const canReturnPage = isAdminOrStaff(profile);

    if (!canReturnPage) {
        return redirect(appRoutes.root());
    }

    return (
        <section>
            <header>
                <h1>Player</h1>
            </header>
            <Link href={appRoutes.root()}>Back</Link>
        </section>
    );
};

export default Page;
