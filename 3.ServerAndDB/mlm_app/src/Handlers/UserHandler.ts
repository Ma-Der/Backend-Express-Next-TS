import { PrismaClient } from '@prisma/client';
import { UserModel } from '../models/user';
import { TUserToUpdate } from '../Types/userTypes';
import bcrypt from 'bcrypt';

export class UserHandler {
    private static prisma = new PrismaClient();

    public static async getUser(id: string) {
        const searchedUser = await this.prisma.user.findFirst({
            where: {
                userId: id
            }
        });
        if(!searchedUser) throw new Error('User does not exist.');

        return searchedUser;
    }

    public static async createUser(username: string, password: string, referrerId?: string) {
        const encryptedPassword = await this.cryptPassword(password);

        if(referrerId) {
            const referrerUser = await this.prisma.user.findFirst({
                where: {
                    userId: referrerId
                }
            });
            if(!referrerUser) throw new Error('Referrer user does not exist.');

            const user = new UserModel(username, encryptedPassword, '', referrerId);

            const newUser = await this.prisma.user.create({
                data: user
            });
    
            if(!newUser) throw new Error('User could not be created.');
    
            return newUser;
        }

        const user = new UserModel(username, encryptedPassword);

        const newUser = await this.prisma.user.create({
            data: user
        });

        if(!newUser) throw new Error('User could not be created.');

        return newUser;
    }

    public static async updateUser(userId: string, propertyToChange: TUserToUpdate, newValue: string) {
        if(propertyToChange === 'password') {
            const encryptedPassword = await this.cryptPassword(newValue);
            const updatedUser = await this.prisma.user.update({
                where: {
                    userId: userId
                },
                data: {
                    [propertyToChange]: encryptedPassword
                }
            });

            return updatedUser;
        }
        
        const updatedUser = await this.prisma.user.update({
            where: {
                userId: userId
            },
            data: {
                [propertyToChange]: newValue
            }
        });

        return updatedUser;
    }

    public static async deleteUser(userId: string) {
        const deletedUser = await this.prisma.user.delete({
            where: {
                userId: userId
            }
        });

        if(!deletedUser) throw new Error('User not exists in database so it could not be deleted.');

        return deletedUser;
    }

    private static async cryptPassword(password: string) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    }
}