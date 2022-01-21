import Joi from 'joi';

export class HeartValidation {
    public static async getCard(cardName: string) {
        const valCardNameSchema = Joi.string().min(3);
        const valResult = await valCardNameSchema.validateAsync(cardName);
        
        return valResult;
    }
}