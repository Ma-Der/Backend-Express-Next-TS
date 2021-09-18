import passportGoogle from 'passport-google-oauth20';
import passportFacebook from 'passport-facebook';
import passportGithub from 'passport-github2';
import { UserOAuth, UserLocal } from '../db/UserModel';

export const passportGoogleHandler = async (accessToken: string, refreshToken: string, profile: passportGoogle.Profile, done: passportGoogle.VerifyCallback) => {
    try {
        const user = await new UserOAuth({
            id: profile.id,
            username: profile.displayName,
            email: profile._json.email
        });
        const searchedUser = await UserOAuth.findOne({id: profile.id});
    
         if(searchedUser) {
            return done(null, searchedUser);
         } else {
             const newUser = await user.save();
             return done(null, newUser);
         }        
    }
    catch(err) {
        return done(err.message, profile);
    }

}

export const passportFacebookHandler = async (accessToken: string, refreshToken: string, profile: passportFacebook.Profile, done: any) => {
    try {
        const user = await new UserOAuth({
            id: profile.id,
            username: profile.displayName,
            email: profile.emails
        });
    
        const searchedUser = await UserOAuth.findOne({id: profile.id});
    
        if(searchedUser) {
           return done(null, searchedUser);
        } else {
            const newUser = await user.save();
            return done(null, newUser);
        } 
    }
    catch(err) {
        return done(err.message, profile);
    }
}

export const passportGithubHandler = async (accessToken: string, refreshToken: string, profile: passportGithub.Profile, done: any) => {
    try {
        const user = await new UserOAuth({
            id: profile.id,
            username: profile.username,
            email: profile.emails
        });
    
        const searchedUser = await UserOAuth.findOne({id: profile.id});
        console.log(searchedUser)
    
        if(searchedUser) {
           return done(null, searchedUser);
        } else {
            const newUser = await user.save();
            return done(null, newUser);
        }         
    }
    catch(err) {
        return done(err.message, profile);
    }
}

export const passportLocalHandler = async (email: string, password: string, done: any) => {
    try {
        const user = await UserLocal.findOne({email: email});
        if(!user) {
            return done(null, false);
        } 
        if(password !== user.password) {
            return done(null, false);
        }

        return done(null, user);
    }
    catch(err) {
        return done(err.message, false);
    }
}