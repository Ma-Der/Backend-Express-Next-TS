import { IEmail } from '../Models/email';
import { Email } from '../Models/email';

export interface IEmailData {
    id: string;
    to: string;
    counter: number;
    switch: boolean;
    text: string;
}

const email1 = new Email('eco_derma@poczta.onet.pl', 'http://localhost:3000/page1');
const email2 = new Email('eco_derma@poczta.onet.pl', 'http://localhost:3000/page2');
const email3 = new Email('eco_derma@poczta.onet.pl', 'http://localhost:3000/page3');

export const emailArray: IEmail[] = [email1, email2, email3];