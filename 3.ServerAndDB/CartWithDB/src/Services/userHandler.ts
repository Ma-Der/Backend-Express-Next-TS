import { UserValue, IUserData, IUser } from '../Types/userTypes';
import { User } from '../Models/user';
import { users, carts } from '../Models/db/database';
import { Cart } from '../Models/cart';
import CartMongo from '../Models/db/MongoModels/Cart';
import UserMongo from '../Models/db/MongoModels/User';
import mongoose, { ObjectId } from 'mongoose';

export class UserHandler {
    public static async addUser(name: string, surname: string, email: string, password: string) {
        const cart = new Cart();
        const userCart = await this.addCartToDB(cart);

        const newUser = new User(name, surname, email, password, userCart._id);
        const newUserInDB = await UserMongo.create(newUser);

        return newUserInDB;
    }

    public static async deleteUser(userId: string) {        
        const deletedUser = await UserMongo.findOneAndDelete({id: userId});
        const cartId = new mongoose.Types.ObjectId(deletedUser[0].cart);
        const deletedUserCart = await CartMongo.findByIdAndDelete(cartId);

        if(!deletedUser) throw new Error('User does not exist in database.');

        return deletedUser;
    }

    public static async updateUser(userId: string, userProperty: UserValue, newPropertyValue: string) { 
        const updatedUser = await UserMongo.findOneAndUpdate({id: userId}, {
            [userProperty]: newPropertyValue
        });
        if(!updatedUser) throw new Error("User does not exist in database");

        return updatedUser;
    }

    public static async showUsers() {
        const users = await UserMongo.find({}).populate('cart');

        if(!users) throw new Error('No users in database.');

        return users;
    }

    private static async addCartToDB(cart: Cart) {
        const newCart = await CartMongo.create(cart);
        if(!newCart) throw new Error('Something went wrong with creating cart.');

        return newCart;
    }
}