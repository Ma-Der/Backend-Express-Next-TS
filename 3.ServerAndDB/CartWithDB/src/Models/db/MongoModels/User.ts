import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    cart: String
});

const UserMongo = mongoose.model('User', UserSchema);
export default UserMongo;