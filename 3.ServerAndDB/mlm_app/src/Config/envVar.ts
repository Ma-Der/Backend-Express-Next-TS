import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT;

export const googleCallbackURL = process.env.GOOGLE_CALLBACK_URL as string;
export const googleClientId = process.env.GOOGLE_CLIENT_ID as string;
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;

export const githubCallbackURL = process.env.GITHUB_CALLBACK_URL as string;
export const githubClientId = process.env.GITHUB_CLIENT_ID as string;
export const githubClientSecret = process.env.GITHUB_CLIENT_SECRET as string;