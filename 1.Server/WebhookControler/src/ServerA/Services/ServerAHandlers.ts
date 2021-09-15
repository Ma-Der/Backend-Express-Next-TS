import { loggedIn, loggedOut, users, usersThatBoughtProduct } from '../../pseudoDB/pseudoDB';
import { User } from '../../Models/user';
import { IUserData } from '../../pseudoDB/pseudoDB';

export class ServerAHandler {
    public static addUser(name: string): IUserData {
        const newUser = new User(name);
        users.push(newUser);

        return newUser.getUser();
    }

    public static userLoggedIn(userId: string): IUserData {
        const existingUser = users.find(({id}) => id ===userId);
        if(!existingUser) throw new Error('User does not exist.');
        loggedIn.push(existingUser);

        return existingUser.getUser();
    }

    public static userLoggedOut(userId: string): IUserData {
        if(users.find(({id}) => id !== userId)) throw new Error('User does not exist in database.');
        const userOut = loggedIn.find(({id}) => id === userId);

        if(!userOut) throw new Error("User is not logged in.");

        loggedOut.push(userOut);

        return userOut.getUser();
    }

    public static deleteUserLoggedIn(userId: string) {
        const userOut = loggedIn.find(({id}) => id === userId);

        if(!userOut) throw new Error("User is not logged in.");

        loggedIn.filter(({id}) => id !== userOut.id);

        return userOut.getUser();
    }

    public static userBoughtProduct(userId: string): IUserData {
        const userThatBought = users.find(({id}) => id === userId);

        if(!userThatBought) throw new Error("User does not exist in database.");

        usersThatBoughtProduct.push(userThatBought);

        return userThatBought.getUser();
    }

    public static updateUserProductAmount(userId: string, productAmount: number) {
        const userThatBought = users.find(({id}) => id === userId);

        if(!userThatBought) throw new Error("User does not exist in database.");
        console.log(`In ServerAHandler: ${productAmount}`);
    

        userThatBought.changeProductAmount(productAmount);

        return userThatBought.getUser();
    }
}