import User from "../db/Models/User";
import { UserModel }  from '../models/user';
import bcrypt from 'bcrypt';

export class UserHandler {
    public static async createUser(email: string, password: string) {
        const users = await User.find({});
        const emailExists = users.find(user => user.email === email);
        if(emailExists) throw new Error('Email already exists.');

        const hashedPassword = await this.cryptPassword(password);
        const newUser = new UserModel(email, hashedPassword);
        const newUserInDB = await User.create(newUser);

        return newUserInDB;
    }

    private static async cryptPassword(password: string) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    }   
}