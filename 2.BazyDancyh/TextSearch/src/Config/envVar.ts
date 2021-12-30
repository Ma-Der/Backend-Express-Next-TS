import dotenv from 'dotenv';

dotenv.config();

export const pgUser = process.env.POSTGRE_USER as string;
export const pgPass = process.env.POSTGRE_PASSWORD as string;
export const mongoUri = process.env.MONGO_DB_URI as string;
export const port = process.env.PORT as string;