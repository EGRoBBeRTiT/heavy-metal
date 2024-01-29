export enum UserType {
    ADMIN = 'admin',
    STAFF = 'staff',
    DEFAULT = 'default',
}

export interface User {
    email: string;
    type: UserType;
    password: string;
    firstName: string;
    lastName: string;
}
