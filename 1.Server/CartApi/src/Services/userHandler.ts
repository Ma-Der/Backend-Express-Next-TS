import { UserValue, IUserData, IUserCartData, IUser } from '../Types/userTypes';
import { User } from '../Models/user';
import { Cart } from '../Models/cart';
import { users, carts } from '../Models/db/database';


export class UserHandler {
    public static addUser(name: string, surname: string, email: string, password: string): IUserCartData {
        const newUser = new User(name, surname, email, password);
        if(this.isUserExists(newUser.id)) throw new Error('User already exists in database.');

        const newCart = new Cart(newUser.id);
        users.push(newUser);
        carts.push(newCart);

        return {
            user: newUser.getUserData(),
            cart: newCart.getCartData()
        }
    }

    public static deleteUser(userId: string) {
        if(!(this.isUserExists(userId))) throw new Error('User does not exist in database.');
        return users.filter(({id}) => id !== userId);
    }

    public static updateUser(userId: string, valueToUpdate: UserValue, newValue: string): IUserData { 
        const userToUpdate = users.find(({id}) => id === userId) as IUser;

        if(!userToUpdate) throw new Error('User does not exist in database.');

        userToUpdate.updateUser(valueToUpdate, newValue);

        return userToUpdate.getUserData();
    }

    private static isUserExists(userId: string): boolean {
        const checkUser = users.find(({id}) => id === userId);
        if(checkUser) return true;
        return false;
    }
}