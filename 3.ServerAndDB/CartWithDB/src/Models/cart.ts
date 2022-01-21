import { v4 as uuidv4 } from 'uuid';
import { ICart, ICartData } from '../Types/cartTypes';
import { ICartItem } from '../Types/cartItemTypes';
import { IDiscountCodeData } from '../Types/discountsTypes';

export class Cart implements ICart {
    id: string;
    cartItems: ICartItem[];
    discountCode: IDiscountCodeData;

    constructor(discountCode: IDiscountCodeData = {discountCode: 'noDiscount', discountValue: 0}) {
        this.id = uuidv4();
        this.cartItems = [];
        this.discountCode = discountCode;    
    }
}