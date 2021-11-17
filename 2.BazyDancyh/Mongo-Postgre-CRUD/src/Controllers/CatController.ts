import { Request, Response } from 'express';
import { CatHandler } from '../Services/CatHandler';
import { TCatGender, ICatData } from '../Types/types';

export class CatController {
    public static async showAllCats(req: Request, res: Response) {
        try {
            const allCats = await CatHandler.showAllCats();
            return res.status(200).json(allCats);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }

    public static async showCat(req: Request<{ catId: string }>, res: Response) {
        try {
            const { catId } = req.params;

            const catToShow = await CatHandler.showCat(catId);

            return res.status(200).json(catToShow);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }

    public static async createCat(req: Request<{}, {}, { name: string, gender: TCatGender, color: string, age: number }>, res: Response) {
        try {
            const { name, gender, color, age } = req.body;
            const newCat = await CatHandler.createCat(name, gender, color, age);

            return res.status(200).json(newCat);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }

    public static async modifyCat(req: Request<{ catId: string }, {}, {catData: ICatData}>, res: Response) {
        try {
            const { catId } = req.params;
            const { catData } = req.body;

            const modifiedCat = await CatHandler.modifyCat(catId, catData);

            return res.status(200).json(modifiedCat);
        }
        catch(err) {
            console.log(err);
            return res.status(400).json(err);
        }
    }

    public static async deleteCat(req: Request<{ catId: string }>, res: Response) {
        try {
            const { catId } = req.params;
            const adoptedKitten = await CatHandler.adoptKitten(catId);

            return res.status(200).json(adoptedKitten);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }
}