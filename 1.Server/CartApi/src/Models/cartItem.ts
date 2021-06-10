import { IProduct } from '../Types/productTypes';
import { v4 as uuidv4} from 'uuid';
import { ICartItem, ICartItemData } from '../Types/cartItemTypes';

export class CartItem implements ICartItem{
    id: string;
    product: IProduct;
    amountOfProduct: number;

    constructor(product: IProduct, amountOfProduct: number) {
        this.id = uuidv4();
        this.product = product;
        this.amountOfProduct = amountOfProduct;
    }

    changeProductName(newName: string): void {
        this.isStringEmpty(newName);
        this.product.productName = newName;
    }

    changeProductPrice(newPrice: number): void {
        this.isNumberPositive(newPrice);
        this.product.productPrice = newPrice;
    }
    changeAmountOfProduct(newAmount: number): void {
        this.isNumberPositive(newAmount);
        this.amountOfProduct = newAmount;
    }

    getCartItemData(): ICartItemData {
        return {
            id: this.id,
            productName: this.product.productName,
            productPrice: this.product.productPrice,
            amountOfProduct: this.amountOfProduct
        }
    }

    calculatePrice(): number {
        return this.product.productPrice * this.amountOfProduct;
    }

    private isStringEmpty(string:string) {
        if(string='') throw new Error('String is empty.');
    }

    private isNumberPositive(number:number) {
        if(number < 0) throw new Error("Number is not positive");
    }
}