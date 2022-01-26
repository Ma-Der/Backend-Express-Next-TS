import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT;
export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;
export const mongoUri = process.env.MONGO_URI as string;