import dotenv from 'dotenv';

dotenv.config();

export const mongoUri = process.env.MONGO_URI as string;