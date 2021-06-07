import { v4 as uuidv4} from 'uuid';
import { ICartItem, ICartItemData } from '../Types/cartItemTypes';

export class CartItem implements ICartItem{
    id: string;
    productName: string;
    productPrice: number;
    amountOfProduct: number;

    constructor(productName: string, productPrice: number, amountOfProduct: number) {
        this.id = uuidv4();
        this.productName = productName;
        this.productPrice = productPrice;
        this.amountOfProduct = amountOfProduct;
    }

    changeProductName(newName: string): void {
        this.isStringEmpty(newName);
        this.productName = newName;
    }

    changeProductPrice(newPrice: number): void {
        this.isNumberPositive(newPrice);
        this.productPrice = newPrice;
    }
    changeAmountOfProduct(newAmount: number): void {
        this.isNumberPositive(newAmount);
        this.amountOfProduct = newAmount;
    }

    getCartItemData(): ICartItemData {
        return {
            id: this.id,
            productName: this.productName,
            productPrice: this.productPrice,
            amountOfProduct: this.amountOfProduct
        }
    }

    calculatePrice(): number {
        return this.productPrice * this.amountOfProduct;
    }

    private isStringEmpty(string:string) {
        if(string='') throw new Error('String is empty.');
    }

    private isNumberPositive(number:number) {
        if(number < 0) throw new Error("Number is not positive");
    }
}