import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT;
export const googleClientId = process.env.GOOGLE_CLIENT_ID as string;
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
export const googleCallbackURL = process.env.GOOGLE_CALLBACK_URL as string;
export const scopes = [process.env.CALENDAR_SCOPE as string, process.env.CALENDAR_EVENTS_SCOPE as string, process.env.USERINFO_SCOPE as string];