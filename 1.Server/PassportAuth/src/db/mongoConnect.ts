import { connect } from 'mongoose';
import { envVar } from '../Config/envVar';

const connectWithMongoDB = async () => {
const connectString: string = envVar.connectMongoDB as string;
    try {
        await connect(connectString, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('MongoDB connected.')
    }
    catch(err) {
        console.log(err.message);
    }
    
}

export default connectWithMongoDB;