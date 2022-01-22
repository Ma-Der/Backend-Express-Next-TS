import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT;
export const rapidHost = process.env.RAPIDAPI_HOST as string;
export const rapidKey = process.env.RAPIDAPI_KEY as string;