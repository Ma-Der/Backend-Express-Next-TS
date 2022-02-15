import { Request, Response } from 'express';
import { GoogleOAuthHandler } from '../Handlers/GoogleOAuthHandler';
import { ResponseProcessor } from '../Services/ResponseProcessor';
import { googleClientId, googleClientSecret, googleCallbackURL } from '../Config/envVar';

export class GoogleAuthController {
    public static async getOAuthCredentials(req: Request<{}, {}, {}, {code: string}>, res: Response) {
        try {
            const { code } = req.query;
            const oAuth2Client = GoogleOAuthHandler.getGoogleOAuth2Client(googleClientId, googleClientSecret, googleCallbackURL);
            
            const credentials = await GoogleOAuthHandler.getOAuthCredentials(oAuth2Client, code);

            return ResponseProcessor.endResponse(res, {message: `Credentials created.`, status: 201, error: false, values: credentials});

        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, error: true, status: 401});
        }
    }

    public static async generateAuthUrl(req: Request, res: Response) {
        try {
            const oAuth2Client = GoogleOAuthHandler.getGoogleOAuth2Client(googleClientId, googleClientSecret, googleCallbackURL);
            const url = GoogleOAuthHandler.generateAuthUrl(oAuth2Client);

            return ResponseProcessor.endResponse(res, {message: `OAuth Url created.`, status: 200, error: false, values: url});
        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, error: true, status: 400});
        }
    }
}