import { connect } from 'mongoose';
import { mongoURI } from '../../Config/envVariables';

export const connectWithMongoDB = async () => {
    const connectString = mongoURI;

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