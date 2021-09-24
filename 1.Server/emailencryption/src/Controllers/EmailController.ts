import { Request, Response } from 'express';
import { EmailHandler } from '../Handlers/EmailHandler';
import { emailDB } from '../db/emailDB';

export class EmailController {
    public static async sendEmail(req: Request<{emailId: string}>, res: Response) {
        try {
            const { emailId } = req.params;

            const email = await EmailHandler.sendMail(emailId);

            return res.status(200).json(`Encrypted email has been sent. ${JSON.stringify(email)}`);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static async decryptEmail(req: Request<{}, {}, {text: string}>, res: Response) {
        try {
            const { text } = req.body;
            const key = req.files?.key.data.toString("utf-8");

            if(!key) throw new Error("Key needs to be uploaded.");
            const decryptedEmail = await EmailHandler.decryptEmail(text, key);
            
            return res.status(200).json(decryptedEmail);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static showEmails(req: Request, res: Response) {
        try {
            res.status(200).json(JSON.stringify(emailDB));
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }
}