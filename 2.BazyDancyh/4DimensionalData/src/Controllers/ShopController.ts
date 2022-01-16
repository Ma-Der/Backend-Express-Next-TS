import { Request, Response } from 'express';
import { ShopHandler } from '../Handlers/ShopHandler';
import { IShop, ShopProperty } from '../Types/types';
import { shopSchema, shopPropertySchema, idSchema } from '../Validation/validationSchema';

export class ShopController {
    public static async getShops(req: Request, res: Response) {
        try {
            const shops = await ShopHandler.getShops();

            return res.status(200).json(shops);
        }
        catch(err) {
            return res.status(404).json(err.message);
        }
    }

    public static async getShop(req: Request<{id: number}>, res: Response) {
        try {
            const validationResult = await idSchema.validateAsync(req.params);
            console.log(validationResult);
    
            const { id } = req.params;

            if(typeof id !== 'number') {
                const parsedId = parseInt(id);
                const shop = await ShopHandler.getShop(parsedId);
                
                return res.status(200).json(shop);
            } 
            const shop = await ShopHandler.getShop(id);
                
            return res.status(200).json(shop);
        }
        catch(err) {
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
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static async changeShopProperty(req: Request<{id: number}, {}, {shopProperty: ShopProperty, newPropertyValue: string | number}>, res: Response) {
        try {
            const validationIdResult = await idSchema.validateAsync(req.params);
            console.log(validationIdResult);

            const validationPropertyResult = await shopPropertySchema.validateAsync(req.body.shopProperty);
            console.log(validationPropertyResult);

            const { id } = req.params;
            const { shopProperty, newPropertyValue } = req.body;

            const updatedShop = await ShopHandler.changeShopProperty(id, shopProperty, newPropertyValue);

            return res.status(200).json(updatedShop);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static async deleteShop(req: Request<{id: number}>, res: Response) {
        try {
            const validationIdResult = await idSchema.validateAsync(req.params);
            console.log(validationIdResult);

            const { id } = req.params;

            const deletedShop = await ShopHandler.deleteShop(id);

            return res.status(204).json(deletedShop);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }
}