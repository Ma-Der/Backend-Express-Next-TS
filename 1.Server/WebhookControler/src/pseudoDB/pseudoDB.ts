
export interface IUser {
    id: string;
    name: string;
    productAmount?: number;
    getUser(): IUserData;
    changeUserName(name: string): void;
    changeProductAmount(amount: number): void;
}

export interface IUserData {
    id: string;
    name: string;
    productAmount?: number;
}

export const loggedIn: IUser[] = [];
export const loggedOut: IUser[] = [];
export const users: IUser[] = [];
export const usersThatBoughtProduct: IUser[] = [];