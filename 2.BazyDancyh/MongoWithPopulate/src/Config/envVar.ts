import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT as string;
export const mongoUri = process.env.MONGO_DB_URI as string;