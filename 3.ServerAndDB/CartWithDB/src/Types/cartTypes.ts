import { ICartItem, ICartItemData } from './cartItemTypes';
import { IDiscountCodeData } from './discountsTypes';

export interface ICartData {
    id: string;
    cartItems: ICartItemData[];
    discountCode: IDiscountCodeData;
}

export interface ICart {
    id: string;
    cartItems: ICartItem[];
    discountCode: IDiscountCodeData;
}
