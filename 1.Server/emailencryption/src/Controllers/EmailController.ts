import { Request, Response } from 'express';
import { EmailHandler } from '../Handlers/EmailHandler';
import { IEmailData } from '../Types/types';

export class EmailController {
    public static async sendEmail(req: Request<{emailId: string}>, res: Response) {
        try {
            const { emailId } = req.params;

            const email = EmailHandler.sendMail(emailId);
            console.log(email);
            return res.status(200).json('Encrypted email has been sent.');
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static decryptEmail(req: Request<{}, {}, {email: IEmailData}>, res: Response) {
        try {
            const { email } = req.body;
            const decryptedEmail = EmailHandler.decryptEmail(email);
            
            return res.status(200).json(decryptedEmail);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }
}