import { IProduct } from '../Types/productTypes';
import { products, carts, discounts } from '../Models/db/database';
import { IDiscountCode } from '../Types/discountsTypes';
import { ICartData, ICart } from '../Types/cartTypes';

export class CartHandler {

    public static addToCart(cartId: string, productId: string, amount: number): ICartData {
        const correctCart = this.findCart(cartId) as ICart;

        if(!correctCart) this.throwError('Such cart does not exists.');
        if(!this.isProductExist(productId)) throw new Error('Product does not exists.')
        
        const item = products.find(item => item.id === productId) as IProduct;
        correctCart.addProduct(item, amount);

        return correctCart.getCartData();
    }

    public static deleteFromCart(cartId: string, productId: string): ICartData {
        const cart = this.findCart(cartId) as ICart;

        if(!cart) this.throwError('Such cart does not exists.');
        
        cart.deleteProduct(productId);
        console.log(cart);
        
        return cart.getCartData();
    }

    public static changeAmountInCart(cartId: string, productId: string, amount: number): ICartData {
        const cart = this.findCart(cartId) as ICart;
        if(!cart) this.throwError('Such cart does not exists.');

        cart.modifyAmountOfProductInCart(productId, amount);
        return cart.getCartData();
    }

    public static buyCart(cartId: string) {
        const cart = this.findCart(cartId) as ICart;
        if(!cart) this.throwError('Cart does not exist.');

        const cartItems = cart.getCartData();
        const cartPrice = cart.calculateCart();
        cart.clearCart();
        return {cartItems, cartPrice};
    }

    public static checkCart(cartId: string) {
        const cart = this.findCart(cartId) as ICart;
        if(!cart) this.throwError('Cart does not exist.');

        return cart.getCartData();
    }

    public static addDiscountToCart(cartId: string, discountCodeKey: string): ICartData {
        
        const cart = this.findCart(cartId) as ICart;
        if(!cart) this.throwError('Cart does not exist.');

        const searchedDiscount = discounts.find(({discountCode}) => discountCode === discountCodeKey) as IDiscountCode;
        if(!searchedDiscount) this.throwError("Entered discount does not exists in database.");

        cart.addDiscountCode(searchedDiscount);
        
        return cart.getCartData();
    }

    private static isProductExist(id: string): Boolean {
        const element = products.find(item => item.id === id);
        if(element) return true;
        return false;
    }

    private static findCart(cartId: string) {
        return carts.find(({id}) => id === cartId);
    }

    private static throwError(message: string) {
        throw new Error(message);
    }
}