import { Request, Response } from 'express';
import { CatHandler } from '../Services/CatHandler';
import { CatGender } from '../Types/types';

export class CatController {
    public static showCat(req: Request<{ catId: string }>, res: Response) {
        try {
            const { catId } = req.params;
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static async createCat(req: Request<{}, {}, { name: string, gender: CatGender, color: string, age: number }>, res: Response) {
        try {
            const { name, gender, color, age } = req.body;
            const newCat = await CatHandler.createCat(name, gender, color, age);

            return res.status(200).json(newCat);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static modifyCat(req: Request<{ catId: string }>, res: Response) {
        try {
            const { catId } = req.params;
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static deleteCat(req: Request<{ catId: string }>, res: Response) {
        try {
            const { catId } = req.params;
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }
}