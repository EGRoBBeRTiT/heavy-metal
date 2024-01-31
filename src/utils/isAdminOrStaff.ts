import type { Profile } from '@/contexts/StoreProvider';
import { UserType } from '@/types/User.types';

export const isAdminOrStaff = (profile: Profile | null) =>
    profile?.type === UserType.ADMIN || profile?.type === UserType.STAFF;
