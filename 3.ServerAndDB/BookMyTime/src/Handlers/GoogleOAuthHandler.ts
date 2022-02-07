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
        
        
/*
        if(authCredentialsTokens.refresh_token) {
            const authCredentials = await this.prisma.auth.create({ data: {
                access_token: authCredentialsTokens.access_token as string,  
                refresh_token: authCredentialsTokens.refresh_token as string, 
                scope: authCredentialsTokens.scope as string,         
                token_type: authCredentialsTokens.token_type as string,    
                expiry_date: authCredentialsTokens.expiry_date as number   
            } });
        }
*/
        return { oAuth2Client };
    }

    public static generateAuthUrl(oAuth2Client: Auth.OAuth2Client) {
        return oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            prompt: 'consent'   // only for testing purposes
        })
    }
}