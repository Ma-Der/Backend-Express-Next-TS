import nodemailer from 'nodemailer';
import { IEmailData } from '../Types/types';
import { host, portNodemailer, user, pass } from '../Config/envVariables';

export class EmailSender {
    email: IEmailData;

    constructor(email: IEmailData) {
        this.email = email;
    }

    sendEmail<T>(): Promise<T> {
        const transporter = nodemailer.createTransport({
            host,
            port: portNodemailer,
            auth: {
                user,
                pass
            }
        });

        return transporter.sendMail({
            to: this.email.to,
            text: this.email.text
        });
    }
}