import { google, Auth } from 'googleapis';
import { PrismaClient } from '@prisma/client';
import { scopes } from '../Config/envVar';

export class GoogleOAuthHandler {
    private static prisma = new PrismaClient();

    public static getGoogleOAuth2Client(clientId: string, clientSecret: string, redirectURI: string) {
        const oAuth2 = new google.auth.OAuth2(clientId, clientSecret, redirectURI);
        return oAuth2;
    }

    public static async getOAuthCredentials(oAuth2Client: Auth.OAuth2Client, code: string) {
        const token = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(token.tokens);
        const authCredentialsTokens = token.tokens;

        if(authCredentialsTokens.refresh_token) {
            const userInfo = (await google.oauth2({version: 'v2', auth: oAuth2Client }).userinfo.get()).data;
            const userEmail = userInfo.email;
            if(!userEmail) throw new Error('No user email.');

            const authCredentials = await this.prisma.auth.upsert({
                create: {
                    email: userEmail,
                    refresh_token: authCredentialsTokens.refresh_token as string
                },
                update: {
                    refresh_token: authCredentialsTokens.refresh_token as string
                },
                where: {
                    email: userEmail
                }
            });

            return { authCredentialsTokens, userEmail };
        }
        return { authCredentialsTokens };
    }

    public static generateAuthUrl(oAuth2Client: Auth.OAuth2Client) {
        return oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            prompt: 'consent'   // only for testing purposes
        })
    }
}