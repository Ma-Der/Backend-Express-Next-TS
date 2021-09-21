import { Request, Response } from 'express';
import { EmailHandler } from '../Services/EmailHandler';

export class EmailController {
    public static async stopSendEmail(req: Request<{emailNmr: string}, {}, {}>, res: Response) {
        try {
            const { emailNmr } = req.params;

            const result = await EmailHandler.stopSendEmail(emailNmr);

            return res.status(200).render("mailStopped");
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static async showEmail(req: Request<{emailNmr: string}, {}, {}>, res: Response) {
        try {
            const { emailNmr } = req.params;
     
            const result = await EmailHandler.showEmail(emailNmr);

            return res.status(200).json(result);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static async getPage(req: Request<{ emailNmr: string }>, res: Response) {
        try {
            const { emailNmr } = req.params;
            const incrementCounter = await EmailHandler.incrementCounter(emailNmr);

            return res.render("page", {mail: incrementCounter});
        }
        catch(err) {
            return res.status(400).json(err.message);
        }

    }

}