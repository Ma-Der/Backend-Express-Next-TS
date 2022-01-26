import { Request, Response } from 'express';
import { UserHandler } from '../Handlers/UserHandler';
import { UserModelValidation } from '../Validation/validation';

export class UserController {
    public static async createUser(req: Request<{}, {}, {email: string, password: string}>, res: Response) {
        try {
            const validationResult = UserModelValidation.createUser(req.body.email, req.body.password);
            const { email, password } = req.body;
            
            const newUser = await UserHandler.createUser(email, password);

            return res.status(201).json(newUser);
        }
        catch(err: any) {
            return res.status(400).json(err.message);
        }
    }
}