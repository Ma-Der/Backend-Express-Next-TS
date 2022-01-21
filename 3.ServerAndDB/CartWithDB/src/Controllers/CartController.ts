import { Request, Response } from 'express';
import { CartHandler } from '../Services/cartHandler';
import { ResponseProcessor } from '../Services/ResponseProcessor';
import { CartValidation, Validation } from '../Validation/Validation';

export class CartController {
    public static async addProductToCart(req: Request<{ cartId: string }, {}, { productId: string, amountOfProduct: string }>, res: Response) {
        try {
            const validationResult = await CartValidation.addProductToCart(req.params.cartId, req.body.productId, parseInt(req.body.amountOfProduct));
            
            const { cartId } = req.params;
            const { productId, amountOfProduct } = req.body;
           
            const result = await CartHandler.addToCart(cartId, productId, parseInt(amountOfProduct));

            return ResponseProcessor.endResponse(res, {message: `Product succesfully added to cart.`, status: 201, error: false, values: result});
        }
        catch (err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, status: 400, error: true});
        }
    }

    public static async deleteProductFromCart(req: Request<{ cartId: string }, {}, {productId: string}>, res: Response) {
        try {
            const validationResult = await CartValidation.deleteProductFromCart(req.params.cartId, req.body.productId);

            const { cartId } = req.params;
            const { productId } = req.body;
            const result = CartHandler.deleteFromCart(cartId, productId);

            return ResponseProcessor.endResponse(res, {message: `Product succesfully deleted from cart.`, status: 200, error: false, values: result});
        }
        catch (err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, status: 400, error: true});
        }
    }

    public static async changeProductAmount(req: Request<{ cartId: string }, {}, { amount: string, productId: string }>, res: Response) {
        try {
            
            const validationResult = await CartValidation.changeProductAmount(req.params.cartId, req.body.productId, parseInt(req.body.amount));
            
            const { cartId } = req.params;
            const { amount, productId } = req.body;

            const result = await CartHandler.changeAmountInCart(cartId, productId, parseInt(amount));

            return ResponseProcessor.endResponse(res, {message: `Amoount in cart succesfully updated.`, status: 200, error: false, values: result});
        }
        catch (err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, status: 400, error: true});
        }
    }

    public static async checkCart(req: Request<{ cartId: string }>, res: Response) {
        try {
            const { cartId } = req.params;
            const cartData = await CartHandler.checkCart(cartId);
            
            return ResponseProcessor.endResponse(res, {message: `Cart found.`, status: 200, error: false, values: cartData});
        }
        catch (err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, status: 400, error: true});
        }
    }

    public static async buyCart(req: Request<{ cartId: string }>, res: Response) {
        try {
            const validationResult = await Validation.idSchema(req.params.cartId);

            const { cartId } = req.params;
            const cartProducts = await CartHandler.buyCart(cartId);

            return ResponseProcessor.endResponse(res, {message: `Cart boughted.`, status: 200, error: false, values: cartProducts});
        }
        catch (err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, status: 400, error: true});
        }
    }

    public static async addDiscountToCart(req: Request<{ cartId: string }, {}, {discountCode: string}>, res: Response) {
        try {
            const validationResult = await CartValidation.addDiscountToCart(req.params.cartId, req.body.discountCode);

            const { cartId } = req.params;
            const { discountCode } = req.body;

            const cartWithDiscount = await CartHandler.addDiscountToCart(cartId, discountCode);

            return ResponseProcessor.endResponse(res, {message: `Discount added to cart.`, error: false, status: 200, values: cartWithDiscount});
        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, error: true, status: 400});
        }
   }
}