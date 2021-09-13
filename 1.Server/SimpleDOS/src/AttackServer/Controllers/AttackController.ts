import { Request, Response } from 'express';
import { AttackHandler, TUrl } from '../Handlers/AttackHandler';

export class AttackController {
    public static async attack(req: Request<{}, {}, {url: TUrl, attackAmount: number}>, res: Response) {
        try {
            const { url, attackAmount } = req.body;

            const numberOfBlockedAttacks = await AttackHandler.attackStart(url, attackAmount);
    
            res.json(numberOfBlockedAttacks);
        }
        catch(err) {
            res.json(err.message);
        }

    }
}