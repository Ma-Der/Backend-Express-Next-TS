import { IProductData, IProduct } from '../Types/productTypes';
import { v4 as uuidv4 } from 'uuid';

export class Product implements IProduct {
    id: string;
    productName: string;
    productPrice: number;

    constructor(productName: string, productPrice: number){
        this.id = uuidv4();
        this.productName = productName;
        this.productPrice = productPrice;
    }

    changeProductName(newName: string): void {
        if(newName.length < 3) throw new Error(`Minimum characters is 3, you've got: ${newName.length}`);
        this.productName = newName;
    }

    changeProductPrice(newPrice: number): void {
        if(newPrice <= 0) throw new Error(`Price can't be less or equal to zero.`);
        this.productPrice = newPrice;
    }

    getProductData(): IProductData {
        return {
            id: this.id,
            productName: this.productName,
            productPrice: this.productPrice
        }
    }
}