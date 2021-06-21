import { Request, Response } from 'express';
import { IProduct } from '../Types/productTypes';
import { CartHandler } from '../Services/cartHandler';
import { IDiscountCode } from '../Types/discountsTypes';

export class CartController {

    public static addProductToCart(req: Request<{ cartId: string }, {}, { product: IProduct, amountOfProduct: number }>, res: Response) {
        try {
            const { cartId } = req.params;
            const { product, amountOfProduct } = req.body
            const result = CartHandler.addToCart(cartId, product, amountOfProduct);
            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(400).json(err.message);
        }
    }

    public static deleteProductFromCart(req: Request<{ cartId: string, productId: string }>, res: Response) {
        try {
            const { cartId, productId } = req.params;
            const result = CartHandler.deleteFromCart(cartId, productId);
            return res.status(200).json(result);
        }
        catch (err) {
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
        catch (err) {
            return res.status(400).json(err.message);
        }
    }

    public static checkCart(req: Request<{ cartId: string }>, res: Response) {
        try {
            const { cartId } = req.params;
            const cartData = CartHandler.checkCart(cartId);
            return res.status(200).json(cartData);
        }
        catch (err) {
            return res.status(400).json(err.message);
        }
    }

    public static buyCart(req: Request<{ cartId: string }>, res: Response) {
        try {
            const { cartId } = req.params;
            const cartProducts = CartHandler.buyCart(cartId);
            return res.status(200).json(cartProducts);
        }
        catch (err) {
            return res.status(400).json(err.message);
        }
    }

    public static addDiscountToCart(req: Request<{ cartId: string }, {}, {discountCode: IDiscountCode}>, res: Response) {
        try {
            const { cartId } = req.params;
            const { discountCode } = req.body;
            const cartWithDiscount = CartHandler.addDiscountToCart(cartId, discountCode);

            return res.status(200).json(cartWithDiscount);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }
}