import { EmailSender } from '../Services/Nodemailer/EmailSender';
import { emailArray } from '../db/emailsDB';
const cron = require('node-cron');


export class NodemailerHandler {
    public static send() {
        cron.schedule('*/1 * * * *', this.getMails);
    }

    private static getMails() {
        for(const mail of emailArray) {
            if(mail.switch) {
                const emailSender = new EmailSender(mail);
                emailSender.sendEmail();
            }
        }
    }
}