import { v4 as uuidv4 } from 'uuid';
import { UserModelValidation } from '../Validation/validation';

export class UserModel {
    id: string;
    email: string;
    password: string;
    constructor(email: string, password: string) {
        UserModelValidation.createUser(email, password);
        this.id = uuidv4();
        this.email = email;
        this.password = password;
    }
}