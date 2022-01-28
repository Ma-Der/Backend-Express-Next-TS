import Joi from 'joi';

export class Validation {
    public static id(id: string) {
        const idSchema = Joi.string();
        const result = idSchema.validate(id);
        return result;
    }

    public static username(username: string) {
        const usernameSchema = Joi.string().min(3);
        const result = usernameSchema.validate(username);

        return result;
    }

    public static password(password: string) {
        const passwordSchema = Joi.string().min(6);
        const result = passwordSchema.validate(password);

        return result;
    }

    public static propertyToChange(property: string) {
        const propSchema = Joi.string().allow("username", "password");
        const result = propSchema.validate(property);

        return result;
    }
}