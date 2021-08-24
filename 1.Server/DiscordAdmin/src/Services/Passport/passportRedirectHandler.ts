import discord from 'passport-discord';
import oauth2 from 'passport-oauth2';
import User from '../MongoDB/userModel';

export const passportDiscordHandler = async (req: any, accessToken: string, refreshToken: string, profile: discord.Profile, done: oauth2.VerifyCallback) => {
req.session.accessToken = accessToken;
req.session.refreshToken = refreshToken;
    try {

        const user = await User.findOne({discordId: profile.id});
        if(user) {
            done(null, user);
        } else {
            
            const newUser = await User.create({
                discordId: profile.id,
                userName: profile.username,
                guilds: profile.guilds
            });

            const saveUser = await newUser.save();
            done(null, saveUser);
        }
    }
    catch(err) {
        return done(err.message, false);
    }

}