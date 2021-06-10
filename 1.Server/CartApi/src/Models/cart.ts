import { ICart } from '../Types/cartTypes';
import { ICartItem, ICartItemData } from '../Types/cartItemTypes';
import { CartItem } from '../Models/cartItem';
import { IProduct } from '../Types/productTypes';

export class Cart implements ICart {
    cartItems: ICartItem[];

    constructor() {
        this.cartItems = [];
    }

    addProduct(product: IProduct, amountOfProduct: number): ICartItemData[] {
        const item = this.cartItems.find(item => item.id === product.id);

        if(item) {
            const newProductAmount = item.amountOfProduct + amountOfProduct;
            this.modifyAmountOfProductInCart(product.id, newProductAmount);
        }
        else {
            const cartItem = new CartItem(product, amountOfProduct);
            this.cartItems.push(cartItem);
        }
        return this.getCartData();
    }

    deleteProduct(productId: string) {

        const newCartList = this.cartItems.filter(product => product.id !== productId)
        return newCartList;
    }

    modifyAmountOfProductInCart(productId: string, amount: number): ICartItemData[] {
        const product = this.cartItems.find(item => item.id === productId);
        if(!product) throw new Error("Product does not exist.")
        product.changeAmountOfProduct(amount);
        return this.getCartData();
    }

    checkCart(): ICartItemData[] {
        return this.getCartData();
    }

    calculateCart(): number {
        const finalPrice = this.cartItems.reduce((totalPrice, price) => {
            totalPrice += price.calculatePrice();
            return totalPrice;
        }, 0);
        return finalPrice;
    }

    clearCart() {
        this.cartItems = [];
        return this.getCartData();
    }

    getCartData(): ICartItemData[] {
        const cartData = this.cartItems.map(item => item.getCartItemData());
        return cartData;
    }

}