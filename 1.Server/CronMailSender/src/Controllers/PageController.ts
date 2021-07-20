import { Request, Response } from 'express';
import { PageHandler } from '../Services/PageHandler';

export class PageController {
    public static loadPage1(req: Request, res: Response) {
        try {
            const email1 = PageHandler.loadPage1();
            return res.render("page1", {mail: email1});
        }
        catch(err) {
            return res.status(500).json(err.message);
        }
    }

    public static loadPage2(req: Request, res: Response) {
        try {
            const email2 = PageHandler.loadPage2();
            return res.render("page2", {mail: email2});
        }
        catch(err) {
            return res.status(500).json(err.message);
        }
    }

    public static loadPage3(req: Request, res: Response) {
        try {
            const email3 = PageHandler.loadPage3();
            return res.render("page3", {mail: email3});
        }
        catch(err) {
            return res.status(500).json(err.message);
        }
    }
}