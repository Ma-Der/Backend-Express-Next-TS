import { Request, Response } from "express";
import { IUserToAdd, UserValue } from '../Types/userTypes';
import { UserHandler } from '../Services/userHandler';
import { ResponseProcessor } from "../Services/ResponseProcessor";
import { UserValidation, Validation } from "../Validation/Validation";

export class UserController {

    public static async addUser(req: Request<{}, {}, IUserToAdd>, res: Response) {
        try {
            const validationResult = await UserValidation.addUser(req.body);

            const { name, surname, email, password } = req.body;
            const newUser = await UserHandler.addUser(name, surname, email, password);

            return ResponseProcessor.endResponse(res, {message: `User created.`, status: 201, error: false, values: newUser});
        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, status: 400, error: true});
        }
    }

    public static async deleteUser(req: Request<{userId: string}>, res: Response) {    
        try {
            const validationResult = await Validation.idSchema(req.params.userId);

            const { userId } = req.params;
            const deletedUser = await UserHandler.deleteUser(userId);

            return ResponseProcessor.endResponse(res, {message: `User deleted.`, status: 200, error: false, values: deletedUser});
        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, status: 400, error: true});
        }
    }

    public static async updateUser(req: Request<{ userId: string }, {}, {userProperty: UserValue, newPropertyValue: string}>, res: Response) {
        try {
            const validationResult = await UserValidation.updateUser(req.params.userId, req.body.userProperty, req.body.newPropertyValue);

            const { userId } = req.params;
            const { userProperty, newPropertyValue } = req.body;

            const userToUpdate = await UserHandler.updateUser(userId, userProperty, newPropertyValue);

            return ResponseProcessor.endResponse(res, {message: `User updated.`, status: 200, error: false, values: userToUpdate});
        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, status: 400, error: true});
        }
    }

    public static async getAllUsers(req: Request, res: Response) {
        try {
            const allUsers = await UserHandler.showUsers();

            return ResponseProcessor.endResponse(res, {message: `All users.`, status: 200, error: false, values: allUsers});
        }   
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, status: 404, error: true});
        }
    }
}