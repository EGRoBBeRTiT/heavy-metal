import { useRouter } from 'next/navigation';

import { canGoBack } from '@/utils';
import { appRoutes } from '@/routes';

export const useGoBack = () => {
    const router = useRouter();

    const handleGoBack = (backRoute = appRoutes.root()) => {
        if (canGoBack()) {
            router.back();
        } else {
            router.push(backRoute);
        }
    };

    return [handleGoBack] as const;
};
