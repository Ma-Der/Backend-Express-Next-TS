import { Request, Response } from 'express';
import { SCOPES, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '../Config/envVariables';
import { GoogleHandler } from '../Handlers/GoogleHandler';

export class ViewsController {
    public static async loadIndex(req: Request, res: Response) {
        try {
            const oAuth2Client = await GoogleHandler.getGoogleOAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
            const url = await GoogleHandler.generateAuthUrl(oAuth2Client, SCOPES);

            return res.status(200).render("index", {url: url});
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }
    public static loadForm(req: Request, res: Response) {
        try {
            return res.status(200).render("form");
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }
}