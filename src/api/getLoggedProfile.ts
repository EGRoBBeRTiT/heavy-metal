import { getUser } from '@/api/getUser';
import { auth, signOut } from '@/auth';

export const getLoggedProfile = async () => {
    const session = await auth();

    if (session && session.user && session.user.email) {
        const user = await getUser(session.user.email);

        if (!user) {
            await signOut();
        }

        return {
            email: user?.email,
            type: user?.type,
            firstName: user?.firstName,
            lastName: user?.lastName,
        };
    }

    return null;
};
