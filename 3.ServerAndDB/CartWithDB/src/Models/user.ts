import { v4 as uuidv4 } from 'uuid';
import { UserValue, IUserData, IUser } from '../Types/userTypes';
import { ObjectId } from 'mongoose';

export class User implements IUser {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    cart: ObjectId;

    constructor(name: string, surname: string, email: string, password: string, cartId: ObjectId) {
        this.id = uuidv4();
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.cart = cartId;
    }
}