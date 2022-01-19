import { Request, Response } from 'express';
import { CartHandler } from '../Services/cartHandler';

export class CartController {
// brak walidacjji
    public static addProductToCart(req: Request<{ cartId: string }, {}, { productId: string, amountOfProduct: number }>, res: Response) {
        try {
            const { cartId } = req.params;
            const { productId, amountOfProduct } = req.body;

            if(typeof amountOfProduct === 'string') {
                const amount = parseFloat(amountOfProduct);
                const result = CartHandler.addToCart(cartId, productId, amount);    
                return res.status(200).json(result);
            }
            
            const result = CartHandler.addToCart(cartId, productId, amountOfProduct);
            return res.status(200).json(result);
        }
        catch (err: any) {
            return res.status(400).json(err.message);
        }
    }

    public static deleteProductFromCart(req: Request<{ cartId: string, productId: string }>, res: Response) {
        try {
            const { cartId, productId } = req.params;
            const result = CartHandler.deleteFromCart(cartId, productId);
            return res.status(200).json(result);
        }
        catch (err: any) {
            return res.status(400).json(err.message);
        }
    }

    public static changeProductAmount(req: Request<{ cartId: string, productId: string }, {}, { amount: number }>, res: Response) {
        try {
            const { cartId, productId } = req.params;
            const { amount } = req.body;
            const result = CartHandler.changeAmountInCart(cartId, productId, amount);

            return res.status(200).json(result);
        }
        catch (err: any) {
            return res.status(400).json(err.message);
        }
    }

    public static checkCart(req: Request<{ cartId: string }>, res: Response) {
        try {
            const { cartId } = req.params;
            const cartData = CartHandler.checkCart(cartId);
            return res.status(200).json(cartData);
        }
        catch (err: any) {
            return res.status(400).json(err.message);
        }
    }

    public static buyCart(req: Request<{ cartId: string }>, res: Response) {
        try {
            const { cartId } = req.params;
            const cartProducts = CartHandler.buyCart(cartId);
            return res.status(200).json(cartProducts);
        }
        catch (err: any) {
            return res.status(400).json(err.message);
        }
    }

    public static addDiscountToCart(req: Request<{ cartId: string }, {}, {discountCodeKey: string}>, res: Response) {
        try {
            const { cartId } = req.params;
            const { discountCodeKey } = req.body;
            const cartWithDiscount = CartHandler.addDiscountToCart(cartId, discountCodeKey);

            return res.status(200).json(cartWithDiscount);
        }
        catch(err: any) {
            return res.status(400).json(err.message);
        }
    }
}