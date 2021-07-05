import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IUserAuth {
    id: string,
    username: string,
    email: string
}

const userOAuthSchema = new Schema({
    id: {type: String, required: true },
    username: {type: String, required: true},
    email: {type: String, required: true}
});

const userLocalSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
})

export const UserOAuth = mongoose.model("user", userOAuthSchema);
export const UserLocal = mongoose.model("userLocal", userLocalSchema);
