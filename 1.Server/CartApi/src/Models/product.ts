import { IProductData, IProduct } from '../Types/productTypes';
import { v4 as uuidv4 } from 'uuid';

export class Product implements IProduct {
    id: string;
    productName: string;
    oldProductPrice: number;
    productPrice: number;
    discount: number;

    constructor(productName: string, productPrice: number){
        this.id = uuidv4();
        this.productName = productName;
        this.oldProductPrice = productPrice;
        this.productPrice = productPrice;
        this.discount = 0;
    }

    changeProductName(newName: string): void {
        if(newName.length < 3) throw new Error(`Minimum characters is 3, you've got: ${newName.length}`);
        this.productName = newName;
    }

    changeProductPrice(newPrice: number): void {
        if(newPrice <= 0) throw new Error(`Price can't be less or equal to zero.`);
        this.productPrice = newPrice;
    }

    calculatePrice(): void {
        const finalPrice = this.productPrice - (this.productPrice * this.discount);
        this.changeProductPrice(finalPrice);
    }

    addDiscount(discountValue: number): void {
        if(!(discountValue >= 0 && discountValue <= 1)) throw new Error("Discount value number should be between 0 and 1.");
        this.discount = discountValue;
        this.calculatePrice();
    }

    getProductData(): IProductData {
        return {
            id: this.id,
            productName: this.productName,
            oldProductPrice: this.oldProductPrice,
            productPrice: this.productPrice,
            discount: this.discount
        }
    }

}