import { CryptoService } from '../Services/CryptoService';
import { emailDB } from '../db/emailDB';
import { EmailSender } from '../Services/EmailSender';
import { IEmailData } from '../Types/types';

export class EmailHandler {
    private static cryptoService = new CryptoService();

    public static async sendMail(emailId: string) {

        const emailToSend = await emailDB.find(({id}) => id === emailId);
        console.log(emailToSend)
        if(!emailToSend) throw new Error("There is no such email in database.");

        const encryptedMessage = await this.cryptoService.encryptEmail(emailToSend.to, emailToSend.text);
        emailToSend.changeText(encryptedMessage);
        console.log(encryptedMessage)
        const emailSender = new EmailSender(emailToSend);
        emailSender.sendEmail();
        return emailToSend;

    }

    public static async decryptEmail(email: IEmailData) {
        const decryptedMessage = await this.cryptoService.decryptEmail(email.to, email.text);

        return {
            id: email.id,
            to: email.to,
            text: decryptedMessage
        }
    }
}