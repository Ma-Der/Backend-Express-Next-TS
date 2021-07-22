import { Email } from '../Models/email';
import { IEmail } from '../Types/types';

const email1 = new Email('pasadena@poldi.pl', 'Chciałbym to wszystko miec');


export const emailDB: IEmail[] = [email1];
export const encryptedEmailDB: IEmail[] = [];