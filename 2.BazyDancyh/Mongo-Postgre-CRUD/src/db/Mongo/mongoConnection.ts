import { connect } from 'mongoose';
import { mongoUri } from '../../Config/envVar';

export const connectWithMongoDB = async () => {
    const connectString = mongoUri;

        connect(mongoUri)
        .then(() => {
            return console.log('MongoDB connected.');
        })
        .catch((err: Error) => {
            console.log('Error connecting to MongoDB', err);
        });
}