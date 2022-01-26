import jwt from 'jsonwebtoken';
import User from '../db/Models/User';
import Token from '../db/Models/Token';
import bcrypt from 'bcrypt';
import { accessTokenSecret, refreshTokenSecret } from '../Config/envVar';
import mongoose from 'mongoose';

export class BearerHandler {
    public static async login(email: string, password: string) {
        const user = await User.findOne({email});
        if(!user) throw new Error('User does not exists.');
        
        const passwordCheck = await bcrypt.compare(password, user.password);
        if(!passwordCheck) throw new Error('Pass fail.'); 

        const accessToken = this.generateAccessToken(email);

        const refreshToken = jwt.sign(email, refreshTokenSecret);
        const refreshTokenInDB = await Token.create({refreshToken: refreshToken, user: this.newObjectId(user._id)});
        
        return {accessToken, refreshToken};
    }

    public static async logout(token: string) {
        const tokenToDelete = await Token.findOneAndDelete({token});

        return tokenToDelete;
    }

    public static async refreshAccessToken(refreshToken: string) {
        const token = await Token.findOne({refreshToken});
        if(!token) throw new Error("Refresh token does not exist.");

        const newToken = jwt.verify(refreshToken, refreshTokenSecret);
        if(!newToken) throw new Error("Token not verified.");
        
        const accessToken = this.generateAccessToken(newToken as string);

        return accessToken;
    }

    private static generateAccessToken(email: string) {
        return jwt.sign({ exp: Math.floor(Date.now() / 1000) + 60, data: email }, accessTokenSecret);
    }

    private static newObjectId(id: string) {
        return new mongoose.Types.ObjectId(id);
    }
}