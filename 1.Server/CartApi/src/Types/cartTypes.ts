import { ICartItem, ICartItemData } from './cartItemTypes';
import { IDiscountCode } from './discountsTypes';
import { IProduct } from './productTypes';

export interface ICartData {
    id: string;
    cartItems: ICartItemData[];
    cartDiscount: number;
}

export interface ICart {
    id: string;
    cartItems: ICartItem[];
    discountCode: IDiscountCode;
    addProduct(product: IProduct, amountOfProduct: number): ICartData;
    checkCart(): ICartData;
    clearCart(): ICartData;
    getCartData(): ICartData;
    deleteProduct(productId: string): ICartItem[];
    modifyAmountOfProductInCart(productId: string, amount: number): ICartData;
    calculateCart(): number;
    addDiscountCode(discounCode: IDiscountCode): ICartData;
}
