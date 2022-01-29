import { Request, Response } from 'express';
import { MLMHandler } from '../Handlers/MLMHandler';
import { ResponseProcessor } from '../Services/ResponseProcessor';
import { Validation } from '../Validation/validation';
import { IUserMLM } from '../Types/MLMTypes';

export class MLMController {
    public static async loggedIn(req: Request<{}, {}, {}, {referrerId?: string}>, res: Response) {
        if(!req.user) throw new Error('No user logged in.');
        
        const { referrerId } = req.query;
        const loggedInUser: any = req.user;
        const loggedUserId = loggedInUser.userId;

        if(!loggedUserId) throw new Error('No user id.');

        if(referrerId) {
            const referrerIdValidationResult = await Validation.id(referrerId);
            const updateReferrerUser = await MLMHandler.loggedIn(loggedUserId.userId, referrerId);
    
            return ResponseProcessor.endResponse(res, {message: 'Start Page.', error: false, status: 200, values: { loggedInUser, updateReferrerUser }});
        }
        return ResponseProcessor.endResponse(res, {message: 'Start Page.', error: false, status: 200, values: loggedInUser});

    }

    public static getFailPage(req: Request, res: Response) {
        return ResponseProcessor.endResponse(res, {message: 'Could not log in.', error: false, status: 401});
    }

    public static async generateRefLink(req: Request<{}, {}, {userId: string}>, res: Response) {
        try {
            const validationResult = await Validation.id(req.body.userId);
            const { userId } = req.body;

            const refLink = await MLMHandler.generateRefLink(userId);
            return ResponseProcessor.endResponse(res, {message: 'Ref link generated', error: false, status: 201, values: refLink});
        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, error: true, status: 400});
        }
    }
}