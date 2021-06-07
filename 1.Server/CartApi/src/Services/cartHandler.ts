import { ICartItemData } from '../Types/cartItemTypes';
import { products, cart } from '../Models/db/database';

export class CartHandler {

    public static addToCart(product: ICartItemData, amount: number) {
        if(!this.isProductExist(product.id)) throw new Error('Product does not exists.')
        const item = products.find(item => item.id === product.id);
        if(item) cart.addProduct(item, amount);

        return cart.getCartData();
    }

    public static deleteFromCart(productId: string) {
        cart.deleteProduct(productId);
        return cart.getCartData();
    }

    public static changeAmountInCart(productId: string, amount: number) {
        cart.modifyAmountOfProductInCart(productId, amount);
        return cart.getCartData();
    }

    public static buyCart() {
        const cartItems = cart.getCartData()
        const cartPrice = cart.calculateCart();
        cart.clearCart();
        return {cartItems, cartPrice};
    }

    public static checkCart() {
        const cartData = cart.checkCart();
        return cartData;
    }

    private static isProductExist(id: string): Boolean {
        const element = products.find(item => item.id === id);
        if(element) return true;
        return false;
    }
}