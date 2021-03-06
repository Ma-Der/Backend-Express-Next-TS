
export type TUserToUpdate = 'username' | 'password';

export interface IUser {
    id: number;
    userId: string;
    username: string;
    password: string;
    points: number;
    inferiors: string[];
    referrer: string;
}