import { Request, Response } from 'express';
import { ProductHandler } from '../Handlers/ProductHandler';
import { idSchema, productSchema, productPropertySchema, productPropertyValueStringSchema, productPropertyValueNumberSchema } from '../Validation/validationSchema';
import { IProduct, ProductProperty } from '../Types/types';

export class ProductController {
    public static async getProducts(req: Request, res: Response) {
        try {
            const products = await ProductHandler.getProducts();

            return res.status(200).json(products);
        }
        catch(err: any) {
            return res.status(404).json(err.message);
        }
    }

    public static async getProduct(req: Request<{id: string}>, res: Response) {
        try {
            const validationIdResult = await idSchema.validateAsync(req.params);

            const { id } = req.params;
            const product = await ProductHandler.getProduct(parseInt(id));

            return res.status(200).json(product);
        }
        catch(err: any) {
            return res.status(404).json(err.message);
        }
    }

    public static async createProduct(req: Request<{}, {}, {productData: IProduct}>, res: Response) {
        try {
            const validationProductResult = await productSchema.validateAsync(req.body.productData);
            const { name, price, amount, opinion, categoryId } = req.body.productData;

            const newProduct = await ProductHandler.createProduct(name, price, amount, opinion, categoryId);

            return res.status(201).json(newProduct);
        }
        catch(err: any) {
            return res.status(404).json(err.message);
        }
    }

    public static async changeProductProperty(req: Request<{id: string}, {}, {productProperty: ProductProperty, newValue: string | number}>, res: Response) {
        try {
            const validationProductPropertyResult = await productPropertySchema.validateAsync(req.body.productProperty);
            const validationIdResult = await idSchema.validateAsync(req.params);

            const { id } = req.params;
            const { productProperty, newValue } = req.body;

            const value = typeof newValue;
            switch(value) {
                case 'string':
                    await productPropertyValueStringSchema.validateAsync(req.body.newValue);
                    break;
                case 'number':
                    await productPropertyValueNumberSchema.validateAsync(req.body.newValue);
                    break;
                default:
                    throw new Error('newPropertyValue is either string or number.');
            }

            const updatedProduct = await ProductHandler.changeProductProperty(parseInt(id), productProperty, newValue);

            return res.status(200).json(updatedProduct);
        }
        catch(err: any) {
            return res.status(404).json(err.message);
        }
    }

    public static async deleteProduct(req: Request<{id: string}>, res: Response) {
        try {
            const validationIdResult = await idSchema.validateAsync(req.params);

            const { id } = req.params;
            const deleteProduct = await ProductHandler.deleteProduct(parseInt(id));

            return res.status(204).json(deleteProduct);
        }
        catch(err: any) {
            return res.status(404).json(err.message);
        }
    }
}