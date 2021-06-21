import { Discount } from '../Models/discount';
import { discounts } from '../Models/db/database';
import { IDiscountCode } from '../Types/discountsTypes';

export class DiscountHandler {
    public static createDiscount(name: string, value: number) {
        if(name.length === 0) throw new Error('Code name cannot be empty.');
        if(!(value >= 0 && value <= 1)) throw new Error("Number should be between 0 and 1.");
        if(this.findDiscount(name)) throw new Error('Code already exists in database.');

        const newDiscount = new Discount(name, value);
        discounts.push(newDiscount);
        return newDiscount;
    }

    public static deleteDiscount(name: string) {
        discounts.filter(({key}) => key !== name);
    }

    public static modifyDiscount(name: string, newValue: number): IDiscountCode {
        if(name.length === 0) throw new Error('Code name cannot be empty.');
        if(!(newValue >= 0 && newValue <= 1)) throw new Error("Number should be between 0 and 1.");

        const searchedDiscount = this.findDiscount(name);
        if(searchedDiscount) { 
            searchedDiscount.value = newValue;
            return searchedDiscount; 
        } else {
            throw new Error("Discount with given name doesn't exist in database.")
        };
    }

    public static findDiscount(phrase: string) {
        return discounts.find(({key}) => key === phrase);
    }

    public static showDiscounts(): IDiscountCode[] {
        const newDiscounts = discounts.map(discount => discount);
        return newDiscounts;
    }
}