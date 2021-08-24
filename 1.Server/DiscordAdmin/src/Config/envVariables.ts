import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT;
export const scopes = process.env.SCOPES;
export const clientId = process.env.CLIENT_ID as string;
export const clientSecret = process.env.CLIENT_SECRET as string;
export const redirectUri = process.env.REDIRECT_URI;
export const botToken = process.env.BOT_TOKEN;
export const token = process.env.TOKEN;
export const mongoURI = process.env.MONGO_DB_URI as string;
export const inviteURL = process.env.INVITE_URL as string;