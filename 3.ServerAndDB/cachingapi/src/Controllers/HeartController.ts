import { Response, Request } from 'express';
import { HeartHandler } from '../Handlers/HeartHandler';
import { ResponseProcessor } from '../Utils/ResponseProcessor';
import { HeartValidation } from '../Validation/validation';

export class HeartController {
    public static async getCard(req: Request<{}, {}, {cardName: string}>, res: Response) {
        try {
            const validationResult = await HeartValidation.getCard(req.body.cardName);
            
            const { cardName } = req.body;

            const searchedCard = await HeartHandler.getCard(cardName);

            return ResponseProcessor.endResponse(res, {message: 'Card served', error: false, status: 200, values: searchedCard});
        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {message: 'Card not found.', error: true, status: 404});
        } 
    }
}