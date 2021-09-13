import { ICartItem, ICartItemData } from './cartItemTypes';
import { IDiscountCodeData } from './discountsTypes';
import { IProduct } from './productTypes';

export interface ICartData {
    id: string;
    cartItems: ICartItemData[];
    cartDiscount: number;
}

export interface ICart {
    id: string;
    cartItems: ICartItem[];
    discountCode: IDiscountCodeData;
    addProduct(product: IProduct, amountOfProduct: number): ICartData;
    checkCart(): ICartData;
    clearCart(): ICartData;
    getCartData(): ICartData;
    deleteProduct(productId: string): ICartItem[];
    modifyAmountOfProductInCart(productId: string, amount: number): ICartData;
    calculateCart(): number;
    addDiscountCode(discounCode: IDiscountCodeData): ICartData;
}
