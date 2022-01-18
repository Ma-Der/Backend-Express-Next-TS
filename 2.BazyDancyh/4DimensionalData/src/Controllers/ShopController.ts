import { Request, Response } from 'express';
import { ShopHandler } from '../Handlers/ShopHandler';
import { IShop, ShopProperty, IRating } from '../Types/types';
import { shopSchema, shopPropertySchema, idSchema, shopPropertyValueStringSchema, shopPropertyValueNumberSchema, shopRatingCommentSchema, shopRatingRateSchema } from '../Validation/validationSchema';

export class ShopController {
    public static async getShops(req: Request, res: Response) {
        try {
            const shops = await ShopHandler.getShops();

            return res.status(200).json(shops);
        }
        catch(err: any) {
            return res.status(404).json(err.message);
        }
    }

    public static async getShop(req: Request<{id: string}>, res: Response) {
        try {
            const validationResult = await idSchema.validateAsync(req.params);
    
            const { id } = req.params;
            
            const shop = await ShopHandler.getShop(parseInt(id));
                
            return res.status(200).json(shop);
        }
        catch(err: any) {
            return res.status(404).json(err.message);
        }
    }

    public static async createShop(req: Request<{}, {}, {shopData: IShop}>, res: Response) {
        try {
            const validationResult = await shopSchema.validateAsync(req.body.shopData);
            console.log(validationResult);

            const { name, address, storeChainId } = req.body.shopData;

            const createdShop = await ShopHandler.createShop(name, address, storeChainId);

            return res.status(201).json(createdShop);
        }
        catch(err: any) {
            return res.status(400).json(err.message);
        }
    }

    public static async changeShopProperty(req: Request<{id: string}, {}, {shopProperty: ShopProperty, newPropertyValue: string | number}>, res: Response) {
        try {
            const validationIdResult = await idSchema.validateAsync(req.params);
            const validationPopertyResult = await shopPropertySchema.validateAsync(req.body.shopProperty);

            const { id } = req.params;
            const { shopProperty, newPropertyValue } = req.body;
            
            const value = typeof newPropertyValue;
            switch(value) {
                case 'string':
                    await shopPropertyValueStringSchema.validateAsync(req.body.newPropertyValue);
                    break;
                case 'number':
                    await shopPropertyValueNumberSchema.validateAsync(req.body.newPropertyValue);
                    break;
                default:
                    throw new Error('newPropertyValue is either string or number.');
            }

            const updatedShop = await ShopHandler.changeShopProperty(parseInt(id), shopProperty, newPropertyValue);

            return res.status(200).json(updatedShop);
        }
        catch(err: any) {
            return res.status(400).json(err.message);
        }
    }

    public static async deleteShop(req: Request<{id: string}>, res: Response) {
        try {
            const validationIdResult = await idSchema.validateAsync(req.params);

            const { id } = req.params;

            const deletedShop = await ShopHandler.deleteShop(parseInt(id));

            return res.status(204).json(deletedShop);
        }
        catch(err: any) {
            return res.status(400).json(err.message);
        }
    }

    public static async addRating(req: Request<{id: string}, {}, {ratingData: IRating}>, res: Response) {
        try {
            const validationIdResult = await idSchema.validateAsync(req.params);
            const validationCommentResult = await shopRatingCommentSchema.validateAsync(req.body.ratingData.comment);
            const validationRatingResult = await shopRatingRateSchema.validateAsync(req.body.ratingData.rating);

            const { id } = req.params;
            const { comment, rating } = req.body.ratingData;

            const newRating = await ShopHandler.addRating(parseInt(id), comment, rating);

            return res.status(200).json(newRating);
        }
        catch(err: any) {
            return res.status(400).json(err.message);
        }
    }
}