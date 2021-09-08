import { Request, Response } from 'express';
import { Cat } from '../Models/catModel';
import { ICatData } from '../Types/types';

export class CatController {
    public static getCat(req: Request<{ catId: string }>, res: Response) {
        try {
            const { catId } = req.params;
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }

    public static createCat(req: Request<{}, {}, {cat: ICatData}>, res: Response) {
        try {
            const { cat } = req.body;
            
        }
        catch(err) {
            return res.status(400).json(err);
        }
        
    }

    public static modifyCat(req: Request<{ catId: string }>, res: Response) {
        try {
            const { catId } = req.params;
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }

    public static deleteCat(req: Request<{ catId: string }>, res: Response) {
        try {
            const { catId } = req.params;
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }
}