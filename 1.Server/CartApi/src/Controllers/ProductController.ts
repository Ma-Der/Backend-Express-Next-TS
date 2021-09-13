import { Request, Response } from 'express';
import { ProductHandler } from '../Services/productHandler';

export class ProductController {

    public static createProduct(req: Request<{}, {}, { name: string, price: number }>, res: Response) {
        try {
            const { name, price } = req.body;

            const product = ProductHandler.createProduct(name, price);
            return res.status(200).json(product);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static changeProductName(req: Request<{ id: string }, {}, {newProductName: string}>, res: Response) {
        try {
            const { id } = req.params;
            const { newProductName } = req.body;
            const updatedProduct = ProductHandler.changeProductName(id, newProductName);
            return res.status(200).json(updatedProduct);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static changeProductPrice(req: Request<{ id: string }, {}, {newPrice: number}>, res: Response) {
        try {
            const { id } = req.params;
            const { newPrice } = req.body;
            const updatedProductPrice = ProductHandler.changeProductPrice(id, newPrice);
            return res.status(200).json(updatedProductPrice);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static deleteProduct(req: Request<{ id: string}>, res: Response) {
        try {
            const { id } = req.params;
            const updatedProductDB = ProductHandler.deleteProduct(id);
            return res.status(200).json(updatedProductDB);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static getAllProducts(req: Request, res: Response) {
        try {
            const allProducts = ProductHandler.getAllProducts();
            return res.status(200).json(allProducts);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static addDiscountToProduct(req: Request< {id: string }, {}, { key: string }>, res: Response) {
        try {
            const { id } = req.params;
            const { key } = req.body;
    
            const productWithDiscount = ProductHandler.addDiscountToProduct(id, key);
            return res.status(200).json(productWithDiscount);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }

    }
}