import { Request, Response } from 'express';
import { DiscountHandler } from '../Services/discountHandler';
import { ResponseProcessor } from '../Services/ResponseProcessor';
import { DiscountValidation } from '../Validation/Validation';

export class DiscountController {
    public static async createDiscount(req: Request<{}, {}, {discountCode: string, discountValue: number}>, res: Response) {
        try {
            const validationResult = await DiscountValidation.discountData(req.body);

            const { discountCode, discountValue } = req.body;
            const newDiscountCode = await DiscountHandler.createDiscount(discountCode, discountValue);
            
            return ResponseProcessor.endWithSuccess(res, {message: `New discount code created.`, status: 200, error: false, values: newDiscountCode});
        }
        catch(err: any) {
            return ResponseProcessor.endWithError(res, {message: err.message, status: 400, error: true});
        }
    }

    public static async modifyDiscount(req: Request<{}, {}, {discountCode: string, discountValue: number}>, res: Response) {
        try {
            const validationResult = await DiscountValidation.discountData(req.body);

            const { discountCode, discountValue } = req.body;
            const modifiedDiscount = await DiscountHandler.modifyDiscount(discountCode, discountValue);

            return ResponseProcessor.endWithSuccess(res, {message: 'Discount modified correctly.', status: 200, error: false, values: modifiedDiscount})
        }
        catch(err: any) {
            return ResponseProcessor.endWithError(res, {message: err.message, status: 400, error: true});
        }
    }

    public static async deleteDiscount(req: Request<{}, {}, {discountCode: string}>, res: Response) {
        try {
            const validationResult = await DiscountValidation.discountCode(req.body.discountCode);
            
            const { discountCode } = req.body;
            const discount = await DiscountHandler.deleteDiscount(discountCode);

            return ResponseProcessor.endWithSuccess(res, {message: `Discount deleted.`, status: 200, error: false, values: discount});
        }
        catch(err: any) {
            return ResponseProcessor.endWithError(res, {message: err.message, status: 400, error: true});
        }
    }

    public static async showDiscounts(req: Request, res: Response) {
        try {
            const discounts = await DiscountHandler.showDiscounts();

            return ResponseProcessor.endWithSuccess(res, {message: `All discounts.`, status: 200, error: false, values: discounts});
        }
        catch(err: any) {
            return ResponseProcessor.endWithError(res, {message: err.message, status: 400, error: true});
        }
    }
}