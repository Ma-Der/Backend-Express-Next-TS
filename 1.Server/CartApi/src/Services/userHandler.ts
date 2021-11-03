import { UserValue, IUserData, IUser } from '../Types/userTypes';
import { User } from '../Models/user';
import { users, carts } from '../Models/db/database';


export class UserHandler {
    public static addUser(name: string, surname: string, email: string, password: string): IUserData {
        const newUser = new User(name, surname, email, password);
        if(this.isUserExists(newUser.id)) throw new Error('User already exists in database.');

        users.push(newUser);
        //carts.push(newUser.cart);

        return newUser.getUserData()
    }

    public static deleteUser(userId: string) {
        if(!(this.isUserExists(userId))) throw new Error('User does not exist in database.');
        const currentUsersDB = users.filter(({id}) => id !== userId);
        users.splice(0, users.length);
        users.push(...currentUsersDB);
        return currentUsersDB;
    }

    public static updateUser(userId: string, valueToUpdate: UserValue, newValue: string): IUserData { 
        const userToUpdate = users.find(({id}) => id === userId) as IUser;

        if(!userToUpdate) throw new Error('User does not exist in database.');

        userToUpdate.updateUser(valueToUpdate, newValue);

        return userToUpdate.getUserData();
    }

    public static showUsers() {
        return users.map(user => user.getUserData());
    }

    private static isUserExists(userId: string): boolean {
        const checkUser = users.find(({id}) => id === userId);
        if(checkUser) return true;
        return false;
    }
}