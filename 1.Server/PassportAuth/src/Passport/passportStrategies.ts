const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const GitHubStrategy = require('passport-github2');
const LocalStrategy = require('passport-local');

import { passportGoogleHandler, passportFacebookHandler, passportGithubHandler, passportLocalHandler} from './passportRedirectHandler';
import dotenv from 'dotenv';

dotenv.config();
export const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.CLIENT_ID_GOOGLE,
        clientSecret: process.env.CLIENT_SECRET_GOOGLE,
        callbackURL: process.env.CALLBACK_URL_GOOGLE
    },
        passportGoogleHandler
    );

export const facebookStrategy = new FacebookStrategy(
    {
        clientID: process.env.CLIENT_ID_FB as string,
        clientSecret: process.env.CLIENT_SECRET_FB as string,
        callbackURL: process.env.CALLBACK_URL_FB as string
    },
        passportFacebookHandler
    );

export const githubStrategy = new GitHubStrategy(
    {
        clientID: process.env.CLIENT_ID_GH,
        clientSecret: process.env.CLIENT_SECRET_GH,
        callbackURL: process.env.CALLBACK_URL_GH
    },
        passportGithubHandler
    );
export const localStrategy = new LocalStrategy(
    { usernameField: "email"
    },
    passportLocalHandler
);