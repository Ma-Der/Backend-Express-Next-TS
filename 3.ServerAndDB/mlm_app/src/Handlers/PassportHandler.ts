import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy, Profile as GithubProfile } from 'passport-github2';
import { PrismaClient } from "@prisma/client";
import { googleCallbackURL, 
         googleClientId, 
         googleClientSecret, 
         githubClientId, 
         githubClientSecret, 
         githubCallbackURL } from '../Config/envVar';
import { UserModel } from '../models/user';
import bcrypt from 'bcrypt';
import { getPoints } from '../Services/pointsCount';

export class PassportHandler {
    private static prisma = new PrismaClient();

    public static GoogleStrategy() {
        const client = this.prisma;
        return new GoogleStrategy({
            clientID: googleClientId,
            clientSecret: googleClientSecret,
            callbackURL: googleCallbackURL,
            passReqToCallback: true
          },
          async function(req: any, accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback) {
            const user = await client.user.findFirst({where: { userId: profile.id}});
            const { referrerId } = req.query;
            
            if(user) {
                return cb(null, user);
            } else {
                const username = profile.displayName as string;
                const id = profile.id as string;
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(username, salt);

                if(referrerId) {
                    const user = new UserModel(username, hashedPassword, id, referrerId);
                    const userToDB = await client.user.create({data: user});
                    await getPoints(userToDB, 10);
                    const updatedInferiorsInReferrerUser = await client.user.update({
                        where: {
                            userId: referrerId
                        },
                        data: {
                            inferiors: { push: userToDB.userId }
                        }
                    });
                    return cb(null, userToDB);
                }

                const user = new UserModel(username, hashedPassword, id);
                const userToDB = await client.user.create({data: user});
                await getPoints(userToDB, 10);
                return cb(null, userToDB);
            }
          }
        )
    }

    public static GithubStrategy() {
        const client = this.prisma;
        return new GitHubStrategy({
            clientID: githubClientId,
            clientSecret: githubClientSecret,
            callbackURL: githubCallbackURL,
            passReqToCallback: true
        },
        async function(req: any, accessToken: string, refreshToken: string, profile: GithubProfile, done: any) {
            const user = await client.user.findFirst({where: { userId: profile.id}});
            const { referrerId } = req.query;

            if(user) {
                return done(null, user);
            } else {
                const username = profile.username as string;
                const id = profile.id as string;

                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(username, salt);

                if(referrerId) {
                    const user = new UserModel(username, hashedPassword, id, referrerId);
                    const userToDB = await client.user.create({data: user});
                    await getPoints(userToDB, 10);
                    const updatedInferiorsInReferrerUser = await client.user.update({
                        where: {
                            userId: referrerId
                        },
                        data: {
                            inferiors: { push: userToDB.userId }
                        }
                    });
                    return done(null, userToDB);
                }

                const user = new UserModel(username, hashedPassword, id);
                const userToDB = await client.user.create({data: user});
                await getPoints(userToDB, 10);
                return done(null, userToDB);
            }
        })
    }
}