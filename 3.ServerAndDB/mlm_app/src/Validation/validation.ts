import Joi from 'joi';

export class Validation {
    public static async id(id: string) {
        const idSchema = Joi.string();
        const result = idSchema.validateAsync(id);
        return result;
    }

    public static async username(username: string) {
        const usernameSchema = Joi.string().min(3);
        const result = usernameSchema.validateAsync(username);

        return result;
    }

    public static async password(password: string) {
        const passwordSchema = Joi.string().min(6);
        const result = passwordSchema.validateAsync(password);

        return result;
    }

    public static async propertyToChange(property: string) {
        const propSchema = Joi.string().allow("username", "password");
        const result = propSchema.validateAsync(property);

        return result;
    }
}