import { IDiscountCode } from '../Types/discountsTypes';

export class Discount implements IDiscountCode {
    discountCode: string;
    discountValue: number;
    constructor(discountCode: string, discountValue: number) {
        this.discountCode = discountCode;
        this.discountValue = discountValue;
        if(discountCode.length === 0) throw new Error('Code name cannot be empty.');
        if(!(discountValue >= 0 && discountValue <= 1)) throw new Error("Number should be between 0 and 1.");
    }

    showDiscount() {
        return {
            discountCode: this.discountCode,
            discountValue: this.discountValue
        }
    }
}