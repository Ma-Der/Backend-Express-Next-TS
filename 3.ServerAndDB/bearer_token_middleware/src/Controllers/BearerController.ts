import { Request, Response } from 'express';
import { TokenValidation, UserModelValidation } from '../Validation/validation';
import { BearerHandler } from '../Handlers/BearerHandler';

export class BearerController {
    public static async login(req: Request<{}, {}, {email: string, password: string}>, res: Response) {
        try {
            const validationResult = UserModelValidation.createUser(req.body.email, req.body.password);

            const { email, password } = req.body;

            const loginResult = await BearerHandler.login(email, password);

            return res.status(200).json(loginResult);
        } 
        catch(err: any) {
            return res.status(403).json(err.message);
        }
    }

    public static async logout(req: Request<{}, {}, {token: string}>, res: Response) {
        try {
            const validationResult = TokenValidation.token(req.body.token);

            const { token } = req.body;

            const deletedToken = await BearerHandler.logout(token);

            return res.status(204).json();
        } 
        catch(err: any) {
            return res.status(400).json(err.message);
        }
    }   

    public static async refreshAccessToken(req: Request<{}, {}, {token: string}>, res: Response) {
        try {
            if(!req.body.token) return res.status(401);
            const validationResult = TokenValidation.token(req.body.token);

            const { token } = req.body;

            const accessToken = await BearerHandler.refreshAccessToken(token);
            
            return res.status(200).json(accessToken);
        } 
        catch(err: any) {
            return res.status(401).json(err.message);
        }
    }
}