import { Request, Response } from 'express';
import { CronHandler } from '../Services/CronHandler';

export class CronController {
    public static stopSendEmail(req: Request<{id: string}>, res: Response) {
        try {
            const { id } = req.params;

            const result = CronHandler.stopSendEmail(id);

            return res.status(200).json(result);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static showEmail(req: Request<{id: string}>, res: Response) {
        try {
            const { id } = req.params;

            const result = CronHandler.showEmail(id);

            return res.status(200).json(result);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }
}