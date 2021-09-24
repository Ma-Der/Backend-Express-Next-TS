import { connect } from 'mongoose';
import { mongoUri } from '../../Config/envVar';

export const connectWithMongoDB = async () => {
    const connectString = mongoUri;

    try {
        await connect(connectString, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('MongoDB connected.');
    }
    catch(err) {
        console.log(err.message);
    }
}