import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy, Profile as GithubProfile } from 'passport-github2';
import { PrismaClient } from "@prisma/client";
import { googleCallbackURL, 
         googleClientId, 
         googleClientSecret, 
         githubClientId, 
         githubClientSecret, 
         githubCallbackURL } from '../Config/envVar';

export class PassportHandler {
    private static client = new PrismaClient();
    
    public static GoogleStrategy() {
        return new GoogleStrategy({
            clientID: googleClientId,
            clientSecret: googleClientSecret,
            callbackURL: googleCallbackURL
          },
          function(accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback) {
              return cb(null, profile);
          }
        )
    }

    public static GithubStrategy() {
        return new GitHubStrategy({
            clientID: githubClientId,
            clientSecret: githubClientSecret,
            callbackURL: githubCallbackURL
        },
        function(req: any, accessToken: string, refreshToken: string, profile: GithubProfile, done: any) {

            return done(null, profile);
        }
        )
    }
}