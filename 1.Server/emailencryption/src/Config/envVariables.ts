import dotenv from 'dotenv';

dotenv.config();

export const passphrase = process.env.PASSPHRASE;
export const host = process.env.HOST;
export const portNodemailer = process.env.PROCESS_NODEMAILER;
export const user = process.env.USER;
export const pass = process.env.PASS;