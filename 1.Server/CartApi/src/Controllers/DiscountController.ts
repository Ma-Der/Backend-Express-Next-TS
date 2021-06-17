import { Request, Response } from 'express';
import { DiscountHandler } from '../Services/discountHandler';

export class DiscountController {
    public static createDiscount(req: Request<{}, {}, {key: string, value: number}>, res: Response) {
        try {
            const { key, value } = req.body;
            const discountCode = DiscountHandler.createDiscount(key, value);
            
            return res.status(200).json(discountCode);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static modifyDiscount(req: Request<{}, {}, {name: string, newValue: number}>, res: Response) {
        try {
            const { name, newValue } = req.body;
            const modifiedDiscount = DiscountHandler.modifyDiscount(name, newValue);

            return res.status(200).json(modifiedDiscount);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static deleteDiscount(req: Request<{}, {}, {discountName: string}>, res: Response) {
        try {
            const { discountName } = req.body;
            const discounts = DiscountHandler.deleteDiscount(discountName);

            return res.status(200).json(discounts);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static showDiscounts(req: Request, res: Response) {
        try {
            const discounts = DiscountHandler.showDiscounts();

            return res.status(200).json(discounts);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }
}