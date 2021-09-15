import { Request, Response } from 'express';
import { WebhookHandler } from '../Services/webhookHandler';
import { IUserData } from '../../pseudoDB/pseudoDB';

export type WebhookAction = 'addUser' | 'userLoggedIn' | 'userLoggedOut' | 'userBoughtProduct';

export class WebhookControler {
    public static async log(req: Request<{ id?: string }, {}, {action: WebhookAction, data: IUserData | string, productAmount?: number}>, res: Response) {
        try {
            const { id } = req.params;
            const { action, data, productAmount } = req.body;
            
            if(productAmount && id) {
                const result = await WebhookHandler.log(action, productAmount, id); 
                return res.status(200).json(result);
            }
            if(id) { 
                const result = await WebhookHandler.log(action, data, id); 
                return res.status(200).json(result);
            }

            const result = await WebhookHandler.log(action, data);

            return res.status(200).json(result);
        }
        catch(err) {
            console.log(err)
            return res.status(500).json(err.message);
        }
    }
}