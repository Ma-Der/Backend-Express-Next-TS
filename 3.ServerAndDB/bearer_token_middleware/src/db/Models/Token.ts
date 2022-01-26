import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const TokenSchema = new Schema({
    refreshToken: String,
    user: {type: mongoose.Types.ObjectId, ref: 'User'}
});

const Token = mongoose.model('Token', TokenSchema);
export default Token;