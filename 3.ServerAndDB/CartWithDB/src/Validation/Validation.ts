import Joi from 'joi';
import { IDiscountCodeData } from '../Types/discountsTypes';
import { IProductToAdd, ProductProperty } from '../Types/productTypes';

export class Validation {
    public static isPositiveNumber(number: number) {
        if(number > 0) return true;
        return false;
    }
}

export class DiscountValidation {
    public static async discountData(requestBodyCreate: IDiscountCodeData) {
        const schema = Joi.object({
            discountCode: Joi.string().exist().required(),
            discountValue: Joi.number().min(0).max(1).required()
        });
        const result = await schema.validateAsync(requestBodyCreate);

        return result;
    }

    public static async discountCode(discountCode: string) {
        const schema = Joi.object({
            discountCode: Joi.string().exist().required()
        });

        const result = await schema.validateAsync(discountCode);

        return result;
    }
}

export class ProductValidation {
    public static async productData(requestBodyCreate: IProductToAdd) {
        const schema = Joi.object({
            productName: Joi.string().exist().required(),
            productPrice: Joi.number().min(0).required()
        });
        const result = await schema.validateAsync(requestBodyCreate);

        return result;
    }

    public static async productModify(productProperty: ProductProperty, newProductValue: string | number) {
        const newProductValueStringSchema = Joi.string().exist();
        const newProductValueNumberSchema = Joi.number().min(0);
        const productPropertySchema = Joi.string().allow("productName", "productPrice");
        let result = null;
        
        const productPropertyResult = await productPropertySchema.validateAsync(productProperty);
        const value = typeof newProductValue;
        switch(value) {
            case 'string':
                result = await newProductValueStringSchema.validateAsync(newProductValue);
                break;
            case 'number':
                result = await newProductValueNumberSchema.validateAsync(newProductValue);
                break;
            default:
                throw new Error('newProductValue must be either string or number.');
        }

        const allResults = {
            id: '',
            productProperty: productPropertyResult,
            newProductValue: result
        }
        return allResults;
    }

    public static async idSchema(id: string) {
        const schema = Joi.string().uuid();

        const result = await schema.validateAsync(id);
        return result;
    }
}