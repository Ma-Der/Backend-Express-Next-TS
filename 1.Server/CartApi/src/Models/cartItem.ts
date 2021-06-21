import { IProduct } from '../Types/productTypes';
import { v4 as uuidv4} from 'uuid';
import { ICartItem, ICartItemData } from '../Types/cartItemTypes';
import { Validation } from '../Validation/Validation';

export class CartItem implements ICartItem{
    id: string;
    product: IProduct;
    amountOfProduct: number;

    constructor(product: IProduct, amountOfProduct: number) {
        this.id = uuidv4();
        this.product = product;
        this.amountOfProduct = amountOfProduct;
    }

    changeAmountOfProduct(newAmount: number): void {
        Validation.isPositiveNumber(newAmount);
        this.amountOfProduct = newAmount;
    }

    getCartItemData(): ICartItemData {
        return {
            cartItemId: this.id,
            productName: this.product.productName,
            productPrice: this.product.productPrice,
            amountOfProduct: this.amountOfProduct
        }
    }

    calculatePrice(): number {
        return this.product.productPrice * this.amountOfProduct;
    }
}