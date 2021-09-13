import { IDiscountCode } from '../Types/discountsTypes';

export class Discount implements IDiscountCode {
    key: string;
    value: number;
    constructor(key: string, value: number) {
        this.key = key;
        this.value = value;
        if(key.length === 0) throw new Error('Code name cannot be empty.');
        if(!(value >= 0 && value <= 1)) throw new Error("Number should be between 0 and 1.");
    }

    showDiscount() {
        return {
            key: this.key,
            value: this.value
        }
    }
}