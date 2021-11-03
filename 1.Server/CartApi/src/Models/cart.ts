import { ICart, ICartData } from '../Types/cartTypes';
import { ICartItem } from '../Types/cartItemTypes';
import { CartItem } from '../Models/cartItem';
import { IProduct } from '../Types/productTypes';
import { IDiscountCodeData } from '../Types/discountsTypes';

export class Cart implements ICart {
    id: string;
    cartItems: ICartItem[];
    discountCode: IDiscountCodeData;

    constructor(id: string, discountCode: IDiscountCodeData = {key: 'noDiscount', value: 0}) {
        this.id = id;
        this.cartItems = [];
        this.discountCode = discountCode;    
    }

    addProduct(product: IProduct, amountOfProduct: number): ICartData {
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

    deleteProduct(productId: string): ICartItem[] {

        const newCartList = this.cartItems.filter(product => product.id !== productId)
        this.cartItems.splice(0, this.cartItems.length);
        this.cartItems.push(...newCartList);
        return this.cartItems;
    }

    modifyAmountOfProductInCart(productId: string, amount: number): ICartData {
        const product = this.cartItems.find(item => item.id === productId);
        if(!product) throw new Error("Product does not exist.")
        product.changeAmountOfProduct(amount);
        return this.getCartData();
    }

    checkCart(): ICartData {
        return this.getCartData();
    }

    calculateCart(): number {
        const finalPrice = this.cartItems.reduce((totalPrice, price) => {
            totalPrice += price.calculatePrice();
            return totalPrice;
        }, 0);
        return finalPrice;
    }

    clearCart(): ICartData {
        this.cartItems = [];
        return this.getCartData();
    }

    addDiscountCode(discountCode: IDiscountCodeData) {
        this.discountCode = discountCode;
        return this.getCartData();
    }

    getCartData(): ICartData {
        const cartData = this.cartItems.map(item => item.getCartItemData());
        return { 
            id: this.id,
            cartItems: cartData,
            cartDiscount: this.discountCode.value
         };
    }

}