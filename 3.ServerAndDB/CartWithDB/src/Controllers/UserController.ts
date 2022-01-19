import { Request, Response } from "express";
import { IUserToAdd, UserValue } from '../Types/userTypes';
import { UserHandler } from '../Services/userHandler';

export class UserController {

    public static addUser(req: Request<{}, {}, IUserToAdd>, res: Response) {
        try {
            const { name, surname, email, password } = req.body;
            const newUser = UserHandler.addUser(name, surname, email, password);

            return res.status(200).json(newUser);
        }
        catch(err: any) {
            return res.status(400).json(err.message);
        }
    }

    public static deleteUser(req: Request<{userId: string}>, res: Response) {    
        try {
            const { userId } = req.params;
            const users = UserHandler.deleteUser(userId);

            return res.status(200).json(users);
        }
        catch(err: any) {
            return res.status(400).json(err.message);
        }
    }

    public static updateUser(req: Request<{ userId: string }, {}, {valueToUpdate: UserValue, newValue: string}>, res: Response) {
        try {
            const { userId } = req.params;
            const { valueToUpdate, newValue } = req.body;

            const userToUpdate = UserHandler.updateUser(userId, valueToUpdate, newValue);

            return res.status(200).json(userToUpdate);
        }
        catch(err: any) {
            return res.status(400).json(err.message);
        }
    }

    public static getAllUsers(req: Request, res: Response) {
        try {
            const allUsers = UserHandler.showUsers();

            return res.status(200).json(allUsers);
        }   
        catch(err: any) {
            return res.status(400).json(err.message);
        }
    }
}