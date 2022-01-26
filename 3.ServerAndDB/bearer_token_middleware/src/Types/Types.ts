import { Request } from 'express';

export interface IUser {
    id: string;
    email: string;
    password: string;
}

export interface IRequestWithUser extends Request {
    user: IUser;
}