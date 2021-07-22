import { Request, Response } from 'express';
import { PageHandler } from '../Handlers/PageHandler';

export class PageController {
    public static loadPage(req: Request, res: Response) {
        try {
            const email = PageHandler.loadPage();
            return res.render('main', {email});
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }
}