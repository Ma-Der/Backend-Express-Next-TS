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
    email: {type: String}
});

const userLocalSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
})

export const UserOAuth = mongoose.model("users", userOAuthSchema);
export const UserLocal = mongoose.model("userLocal", userLocalSchema);
