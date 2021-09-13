import { ICart, ICartData } from "./cartTypes";

export type UserValue = 'name' | 'surname' | 'email' | 'password';

export interface IUserData {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    cart: ICart;
}

export interface IUser {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    updateUser(valueToUpdate: UserValue, newValue: string): IUserData;
    getUserData(): IUserData;
}

export interface IUserCartData {
    user: IUserData;
    cart: ICartData;
}

export interface IUserToAdd {
    name: string;
    surname: string;
    email: string;
    password: string;
}