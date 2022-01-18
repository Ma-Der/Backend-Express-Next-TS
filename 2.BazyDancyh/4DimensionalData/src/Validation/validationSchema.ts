import Joi from 'joi';

export const storeChainSchema = Joi.object({
    name: Joi.string().required(),
    owner: Joi.string().required()
});

export const storeChainPropertySchema = Joi.string().allow("name", "owner");
export const storeChainPropertyValueSchema = Joi.string();

export const idSchema = Joi.object({
    id: Joi.number().integer()
});

export const shopSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    storeChainId: Joi.number().integer().required()
});

export const shopPropertySchema = Joi.string().allow("name", "address", "storeChainId");
export const shopPropertyValueNumberSchema = Joi.number().integer();
export const shopPropertyValueStringSchema = Joi.string();

export const shopRatingCommentSchema = Joi.string();
export const shopRatingRateSchema = Joi.number().integer();

export const categorySchema = Joi.object({
    name: Joi.string().required(),
    shopId: Joi.number().integer().required()
});

export const categoryPropertySchema = Joi.string().allow("name", "similar_categories", "shopId");

export const categoryPropertyValueNumberSchema = Joi.number().integer();
export const categoryPropertyValueStringSchema = Joi.string();

export const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    amount: Joi.number().integer().required(),
    opinion: Joi.string().required(),
    categoryId: Joi.number().integer().required()
});

export const productPropertySchema = Joi.string().allow("name", "price", "amount", "opinion", "categoryId");

export const productPropertyValueNumberSchema = Joi.number().integer();
export const productPropertyValueStringSchema = Joi.string();
