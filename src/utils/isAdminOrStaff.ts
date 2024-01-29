import type { User } from '@/types/User.types';
import { UserType } from '@/types/User.types';

export const isAdminOrStaff = (profile: User | null) =>
    profile?.type === UserType.ADMIN || profile?.type === UserType.STAFF;
