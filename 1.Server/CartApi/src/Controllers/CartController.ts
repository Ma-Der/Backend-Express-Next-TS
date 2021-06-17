import { Request, Response } from 'express';
import { IProduct } from '../Types/productTypes';
import { CartHandler } from '../Services/cartHandler';

// dorobienie rzeczy opcjonalnych - user, discount

export class CartController {

    public static addProductToCart(req: Request<{}, {}, { product: IProduct, amountOfProduct: number }>, res: Response) {
        try {
            const { product, amountOfProduct } = req.body
            const result = CartHandler.addToCart(product, amountOfProduct);
            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(400).json(err.message);
        }
    }

    public static deleteProductFromCart(req: Request<{}, {}, { productId: string }>, res: Response) {
        try {
            const { productId } = req.body;
            const result = CartHandler.deleteFromCart(productId);
            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(400).json(err.message);
        }
    }

    public static changeProductAmount(req: Request<{ id: string }, {}, { amount: number }>, res: Response) {
        try {
            const { id } = req.params;
            const { amount } = req.body;
            const result = CartHandler.changeAmountInCart(id, amount);

            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(400).json(err.message);
        }
    }

    public static checkCart(req: Request, res: Response) {
        try {
            const cartData = CartHandler.checkCart();
            return res.status(200).json(cartData);
        }
        catch (err) {
            return res.status(400).json(err.message);
        }
    }

    public static buyCart(req: Request, res: Response) {
        try {
            const cartProducts = CartHandler.buyCart();
            return res.status(200).json(cartProducts);
        }
        catch (err) {
            return res.status(400).json(err.message);
        }
    }
}