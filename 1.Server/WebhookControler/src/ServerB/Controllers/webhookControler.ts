import { Request, Response } from 'express';
import { WebhookHandler } from '../Services/webhookHandler';

export type WebhookAction = 'addUser' | 'userLoggedIn' | 'userLoggedOut' | 'userBoughtProduct';

export class WebhookControler {
    public static async log<T> (req: Request<{}, {}, {action: WebhookAction, data: T}>, res: Response) {
        try {
            const { action, data } = req.body;
            const result = await WebhookHandler.log(action, data);

            return res.status(200).json(result);
        }
        catch(err) {
            return res.status(500).json(err.message);
        }
    }
}