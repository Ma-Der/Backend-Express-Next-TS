import nodemailer from 'nodemailer';
import { IEmailData } from '../../db/emailsDB';

export class EmailSender {
    emailOptions: IEmailData;
    
    constructor(emailOptions: IEmailData) {
        this.emailOptions = emailOptions;
    }

    sendEmail<T>(): Promise<T> {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: process.env.PORT_NODEMAILER,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });
        
        return transporter.sendMail({
            to: this.emailOptions.to,
            html: `<a href="http://localhost:3000/${this.emailOptions.id}">Click Me</a>`
        });
    }
}