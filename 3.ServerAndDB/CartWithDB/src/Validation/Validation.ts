import Joi from 'joi';
import { IDiscountCodeData } from '../Types/discountsTypes';
import { IProductToAdd, ProductProperty } from '../Types/productTypes';
import { IUserToAdd, UserValue } from '../Types/userTypes';

export class Validation {
    public static isPositiveNumber(number: number) {
        if(number > 0) return true;
        return false;
    }
}

export class UserValidation {
    public static async addUser(requestUserCreate: IUserToAdd) {
        const schema = Joi.object({
            name: Joi.string().min(3),
            surname: Joi.string().min(3),
            email: Joi.string().email(),
            password: Joi.string().min(4)
        });

        const result = await schema.validateAsync(requestUserCreate);

        return result;
    }

    public static async idSchema(id: string) {
        const schema = Joi.string().uuid();

        const result = await schema.validateAsync(id);
        return result;
    }

    public static async updateUser(userId: string, userProperty: UserValue, newValue: string) {
        const resultId = await this.idSchema(userId);
        const userPropertySchema = Joi.string().allow('name', 'surname', 'email', 'password');
        const resultUserProperty = await userPropertySchema.validateAsync(userProperty);
        const newValueNameSurnameSchema = Joi.string().min(3);
        const newValueEmailSchema = Joi.string().email();
        const newValuePasswordSchema = Joi.string().min(4);

        let resultNewValue = null;
        
        switch(userProperty) {
            case 'name':
                resultNewValue = await newValueNameSurnameSchema.validateAsync(newValue);
                break;
            case 'surname':
                resultNewValue = await newValueNameSurnameSchema.validateAsync(newValue);
                break;
            case 'email':
                resultNewValue = await newValueEmailSchema.validateAsync(newValue);
                break;
            case 'password':
                resultNewValue = await newValuePasswordSchema.validateAsync(newValue);
                break;
            default:
                throw new Error('newValue must be string');
        }

        return {
            resultId,
            resultUserProperty,
            resultNewValue
        }
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