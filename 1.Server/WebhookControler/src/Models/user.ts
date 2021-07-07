import { v4 as uuidv4 } from 'uuid';
import { IUser, IUserData } from '../pseudoDB/pseudoDB';


export class User implements IUser {
    id: string;
    name: string;
    productAmount: number;
    constructor(name: string) {
        this.id = uuidv4();
        this.name = name;
        this.productAmount = 0;
    }

    changeUserName(name: string) {
        this.name = name;
    }

    changeProductAmount(amount: number) {
        this.productAmount = this.productAmount + amount;
    }

    getUser(): IUserData {
        return {
            id: this.id,
            name: this.name,
            productAmount: this.productAmount
        }
    }
}