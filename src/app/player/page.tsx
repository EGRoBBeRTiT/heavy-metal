import { redirect } from 'next/navigation';

import { appRoutes } from '@/routes';
import { getLoggedProfile } from '@/api/getLoggedProfile';
import { isAdminOrStaff } from '@/utils/isAdminOrStaff';
import { PlayerPage } from '@/_pages/PlayerPage';

const Page = async () => {
    const profile = await getLoggedProfile();

    const canReturnPage = isAdminOrStaff(profile);

    if (!canReturnPage) {
        return redirect(appRoutes.root());
    }

    return <PlayerPage />;
};

export default Page;
