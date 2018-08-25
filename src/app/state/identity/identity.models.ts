

export interface Credentials {
    email?: string;
    password?: string;
    remember?: boolean;
    lastLoginDate?: Date;
}

export interface LoggedInUserDetails {
    email?: string;
    token?: string;
    remember?: boolean;
    lastLoginDate?: Date;
}