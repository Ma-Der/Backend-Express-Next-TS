import { ICartItem, ICartItemData } from './cartItemTypes';
import { IProduct } from './productTypes';

export interface ICart {
    cartItems: ICartItem[];
    addProduct(product: IProduct, amountOfProduct: number): ICartItemData[];
    checkCart(): ICartItemData[];
    clearCart(): ICartItemData[];
    getCartData(): ICartItemData[];
    deleteProduct(productId: string): ICartItem[];
    modifyAmountOfProductInCart(productId: string, amount: number): ICartItemData[];
    calculateCart(): number;
}
