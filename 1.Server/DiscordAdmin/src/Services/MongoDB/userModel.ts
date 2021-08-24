import mongoose from 'mongoose';

export interface IUser {
    id: string;
    discordId: string;
    userName: string;
}

const Schema = mongoose.Schema;

const userSchema = new Schema({
    discordId: {type: String, required: true},
    userName: {type: String, required: true},
    guilds: {type: Array, required: true}
});

const User = mongoose.model('Users', userSchema);
export default User;