import { Request, Response } from 'express';
import { ProductHandler } from '../Services/productHandler';
import { ResponseProcessor } from '../Services/ResponseProcessor';
import { ProductProperty } from '../Types/productTypes';
import { DiscountValidation, ProductValidation, Validation } from '../Validation/Validation';

export class ProductController {

    public static async createProduct(req: Request<{}, {}, { productName: string, productPrice: number }>, res: Response) {
        try {
            const validationResult = await ProductValidation.productData(req.body);

            const { productName, productPrice } = req.body;

            const product = await ProductHandler.createProduct(productName, productPrice);
            return ResponseProcessor.endResponse(res, {message: 'Product succesfully created.', status: 201, error: false, values: product});
        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, error: true, status: 400})
        }
    }

    public static async changeProductProperty(req: Request<{ id: string }, {}, {productProperty: ProductProperty, newProductValue: string | number}>, res: Response) {
        try {
            const validationId = await Validation.idSchema(req.params.id);
            const validationBody = await ProductValidation.productModify(req.body.productProperty, req.body.newProductValue);

            const { id } = req.params;
            const { productProperty, newProductValue } = req.body;
            const updatedProduct = await ProductHandler.changeProductProperty(id, productProperty, newProductValue);
            return ResponseProcessor.endResponse(res, {message: 'Product updated.', status: 200, error: false, values: updatedProduct});
        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, error: true, status: 400})
        }
    }

    public static async deleteProduct(req: Request<{ id: string}>, res: Response) {
        try {
            const validationId = await Validation.idSchema(req.params.id);

            const { id } = req.params;
            const deletedProduct = await ProductHandler.deleteProduct(id);
            return ResponseProcessor.endResponse(res, {message: 'Product deleted.', status: 204, error: false, values: deletedProduct});
        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, error: true, status: 400})
        }
    }

    public static async getAllProducts(req: Request, res: Response) {
        try {
            const allProducts = await ProductHandler.getAllProducts();
            return ResponseProcessor.endResponse(res, {message: 'Getting all products succesfull.', status: 200, error: false, values: allProducts});
        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, error: true, status: 404})
        }
    }

    public static async addDiscountToProduct(req: Request< {id: string }, {}, { discountCode: string }>, res: Response) {
        try {
            const validationId = await Validation.idSchema(req.params.id);
            const validationDiscountCode = await DiscountValidation.discountCode(req.body.discountCode);
            
            const { id } = req.params;
            const { discountCode } = req.body;
    
            const productWithDiscount = await ProductHandler.addDiscountToProduct(id, discountCode);
            return ResponseProcessor.endResponse(res, {message: `Discount added to product with id: ${id}.`, status: 200, error: false, values: productWithDiscount});
        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, error: true, status: 400})
        }

    }
}