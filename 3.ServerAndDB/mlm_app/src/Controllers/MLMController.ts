import { Request, Response } from 'express';
import { MLMHandler } from '../Handlers/MLMHandler';
import { ResponseProcessor } from '../Services/ResponseProcessor';
import { Validation } from '../Validation/validation';

export class MLMController {
    public static getStartPage(req: Request, res: Response) {
        if(!req.user) throw new Error('No user logged in.');
        const loggedInUser = req.user;
        return ResponseProcessor.endResponse(res, {message: 'Start Page.', error: false, status: 200, values: loggedInUser});
    }

    public static getFailPage(req: Request, res: Response) {
        return ResponseProcessor.endResponse(res, {message: 'Could not log in.', error: false, status: 401});
    }

    public static async generateRefLink(req: Request<{}, {}, {userId: string}>, res: Response) {
        try {
            const validationResult = Validation.id(req.body.userId);
            const { userId } = req.body;

            const refLink = await MLMHandler.generateRefLink(userId);
            return ResponseProcessor.endResponse(res, {message: 'Ref link generated', error: false, status: 201, values: refLink});
        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, error: true, status: 400});
        }
    }
}