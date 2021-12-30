import { Request, Response } from 'express';
import { TextSearchHandler } from '../Handlers/TextSearchHandler';

export class TextSearchController {
    public static async findDishes(req: Request<{}, {}, {}, {searchForDishes: string}>, res: Response) {
        try {
            const { searchForDishes } = req.query;

            if((typeof searchForDishes !== 'string')) return res.status(400).json('Search word type should be string.');
            if(!searchForDishes) return res.status(404).json('Nothing to search');
            if(searchForDishes.length <= 2) return res.status(404).json('Search needs at least 3 characters.');
            
            const result = await TextSearchHandler.findDishesByText(searchForDishes);

            return res.status(200).json(result);

        }
        catch(err) {
            return res.status(400).json(err);
        }
    }
}