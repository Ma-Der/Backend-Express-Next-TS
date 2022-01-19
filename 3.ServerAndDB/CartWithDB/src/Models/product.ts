import { IProduct } from '../Types/productTypes';
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
}