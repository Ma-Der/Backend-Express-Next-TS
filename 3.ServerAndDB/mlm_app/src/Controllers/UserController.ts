import { Request, Response } from 'express';
import { ResponseProcessor } from '../Services/ResponseProcessor';
import { UserHandler } from '../Handlers/UserHandler';
import { Validation } from '../Validation/validation';
import { TUserToUpdate } from '../Types/userTypes';

export class UserController {
    public static async getUser(req: Request<{id: string}>, res: Response) {
        try {
            const validationResult = await Validation.id(req.params.id);

            const { id } = req.params;

            const user = await UserHandler.getUser(id);

            return ResponseProcessor.endResponse(res, {error: false, status: 200, message: 'User found.', values: user});
        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {error: true, status: 404, message: err.message});
        }
    }

    public static async createUser(req: Request<{}, {}, {username: string, password: string}, {referrerId?: string}>, res: Response) {
        try {
            const { username, password } = req.body;
            const { referrerId } = req.query;
            console.log(referrerId)

            const usernameValidation = await Validation.username(username);
            const passwordValidation = await Validation.password(password);
            if(referrerId) {
                const referrerValidation = await Validation.id(referrerId);
            }

            if(referrerId) {
                const newUser = await UserHandler.createUser(username, password, referrerId);
                return ResponseProcessor.endResponse(res, {error: false, status: 201, message: 'User created.', values: newUser});
            }
            const newUser = await UserHandler.createUser(username, password);

            return ResponseProcessor.endResponse(res, {error: false, status: 201, message: 'User created.', values: newUser});
        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {error: true, status: 400, message: err.message});
        }
    }

    public static async updateUser(req: Request<{userId: string}, {}, {propertyToChange: TUserToUpdate, newValue: string}>, res: Response) {
        try {
            const { userId } = req.params;
            const { propertyToChange, newValue } = req.body;

            const idValidation = await Validation.id(userId);
            const propertyValidation = await Validation.propertyToChange(propertyToChange);
            if(propertyToChange === 'password') {
                const newValueValidation = await Validation.password(newValue);
            }
            const newValueValidation = await Validation.username(newValue);
            
            const updatedUser = await UserHandler.updateUser(userId, propertyToChange, newValue);

            return ResponseProcessor.endResponse(res, {error: false, status: 200, message: 'User updated.', values: updatedUser});
        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {error: true, status: 400, message: err.message});
        }
    }

    public static async deleteUser(req: Request<{userId: string}>, res: Response) {
        try {
            const { userId } = req.params;
            const idValidation = await Validation.id(userId);

            const deletedUser = await UserHandler.deleteUser(userId);

            return ResponseProcessor.endResponse(res, {error: false, status: 204, message: 'User deleted.'});
        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {error: true, status: 400, message: err.message});
        }
    }
}