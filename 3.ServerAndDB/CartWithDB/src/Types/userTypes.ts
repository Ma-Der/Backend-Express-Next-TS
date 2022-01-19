import { ICartData } from "./cartTypes";
import { ObjectId } from 'mongoose';

export type UserValue = 'name' | 'surname' | 'email' | 'password';

export interface IUserData {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    cart: ObjectId;
}

export interface IUser {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
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