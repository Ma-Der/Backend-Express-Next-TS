import Joi from 'joi';

export class UserModelValidation {
    public static createUser(email: string, password: string) {
        const emailSchema = Joi.string().email();
        const passwordSchema = Joi.string();

        const emailResult = emailSchema.validate(email);
        const passResult = passwordSchema.validate(password);
        return {emailResult, passResult};
    }
}

export class TokenValidation {
    public static token(token: string) {
        const tokenSchema = Joi.string().token();

        const result = tokenSchema.validate(token);
        return result;
    }
}