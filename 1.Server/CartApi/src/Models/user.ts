import { ICart } from 'src/Types/cartTypes';
import { v4 as uuidv4 } from 'uuid';
import { UserValue, IUserData, IUser } from '../Types/userTypes';
import { Cart } from '../Models/cart';
import { carts } from '../Models/db/database';

export class User implements IUser {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    cart: ICart;

    constructor(name: string, surname: string, email: string, password: string) {
        this.id = uuidv4();
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.cart = new Cart(this.id);
        this.addCartToDB(this.cart);
    }

    updateUser(valueToUpdate: UserValue, newValue: string): IUserData {
        if(newValue.length < 2) throw new Error("Not enough digits.");
        switch(valueToUpdate) {
            case 'name':
                this.name = newValue;
                break;
            case 'surname':
                this.surname = newValue;
                break;
            case 'email':
                this.email = newValue;
                break;
            case 'password':
                this.password = newValue;
                break;
            default: 
                throw new Error('Wrong value to update.');
        }
        return this.getUserData();
    }

    getUserData(): IUserData {
        return {
            id: this.id,
            name: this.name,
            surname: this.surname,
            email: this.email,
            password: this.password,
            cart: this.cart
        }
    }

    addCartToDB(cart: ICart): ICart {
        const cartInDB = carts.find(cartDB => cartDB.id === cart.id);
        if(cartInDB) throw new Error('Cart already exists.');

        carts.push(cart);

        return cart;
    }
}