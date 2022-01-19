import { Discount } from '../Models/discount';
import DiscountMongo from '../Models/db/MongoModels/Discount';

export class DiscountHandler {
    public static async createDiscount(discountCode: string, discountValue: number) {
        if(discountCode.length === 0) throw new Error('Code name cannot be empty.');
        if(!(discountValue >= 0 && discountValue <= 1)) throw new Error("Number should be between 0 and 1.");

        const newDiscount = new Discount(discountCode, discountValue);
        const newDiscountInDB = await DiscountMongo.create(newDiscount);
        if(!newDiscountInDB) throw new Error('Discount could not be created.');
        
        return newDiscount;
    }

    public static async deleteDiscount(discountCode: string) {
        if(discountCode.length === 0) throw new Error('Code name cannot be empty.');

        const deletedDiscount = await DiscountMongo.findOneAndDelete({discountCode});
        if(!deletedDiscount) throw new Error("No discount to delete.");

        return deletedDiscount;
    }

    public static async modifyDiscount(discountCode: string, newDiscountValue: number) {
        if(discountCode.length === 0) throw new Error('Code name cannot be empty.');
        if(!(newDiscountValue >= 0 && newDiscountValue <= 1)) throw new Error("Number should be between 0 and 1.");

        const searchedDiscount = await DiscountMongo.findOneAndUpdate({discountCode}, {
            discountValue: newDiscountValue
        });
        if(!searchedDiscount) throw new Error("No such discount code in database.");
        
        const modifiedDiscount = await DiscountMongo.find({discountCode});

        return modifiedDiscount;
    }

    public static async showDiscounts() {
        const discounts = await DiscountMongo.find({});
        if(!discounts) throw new Error("No discounts in database.");

        return discounts;
    }
}