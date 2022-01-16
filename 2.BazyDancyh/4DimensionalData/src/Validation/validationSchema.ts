import Joi from 'joi';

export const storeChainSchema = Joi.object({
    name: Joi.string().required(),
    owner: Joi.string().required()
});

export const storeChainPropertySchema = Joi.object({
    name: Joi.string(),
    owner: Joi.string()
});

export const idSchema = Joi.object({
    id: Joi.number()
});

export const shopSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    storeChainId: Joi.number().required()
});

export const shopPropertySchema = Joi.object({
    name: Joi.string(),
    address: Joi.string(),
    storeChainId: Joi.number()
});