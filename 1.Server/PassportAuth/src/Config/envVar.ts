import dotenv from 'dotenv';
dotenv.config();

export const envVar = {
    connectMongoDB: process.env.MONGO_DB_URI
}