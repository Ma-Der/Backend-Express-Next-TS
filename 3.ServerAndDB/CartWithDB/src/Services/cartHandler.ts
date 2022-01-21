import CartMongo from '../Models/db/MongoModels/Cart';
import ProductMongo from '../Models/db/MongoModels/Product';
import DiscountMongo from '../Models/db/MongoModels/Discount';
import { ICartData, ICart } from '../Types/cartTypes';
import { ICartItemData } from '../Types/cartItemTypes';
import { CartItem } from '../Models/cartItem';

export class CartHandler {

    public static async addToCart(cartId: string, productId: string, amount: number) {
        const correctProduct = await ProductMongo.findOne({id: productId});
        if(!correctProduct) throw new Error('Product does not exist in database.');
        const newCartItem = new CartItem(correctProduct, amount);

        const cartWithProduct = await CartMongo.findOne({"cartItems.product.id": productId, id: cartId });

        if(cartWithProduct) {
            const correctProductInCart = cartWithProduct.cartItems.filter((cartItem: any) => cartItem.product.id === productId);
            const newAmountOfProduct = correctProductInCart[0].amountOfProduct + amount;
            cartWithProduct.cartItems.filter((cartItem: any) => cartItem.product.id === productId).map((item: any) => item.amountOfProduct = newAmountOfProduct);
            
            await cartWithProduct.save();

            return cartWithProduct;   
        } else {
            const correctCart = await CartMongo.findOneAndUpdate({id: cartId}, {
                "$push": { "cartItems": newCartItem }
            }).exec();
            if(!correctCart) this.throwError('Such cart does not exists.');
            return correctCart;
        } 
    }

    public static async deleteFromCart(cartId: string, productId: string) {
        const cartWithProductToDelete = await CartMongo.findOneAndUpdate({id: cartId, "cartItems.product.id": productId}, {
            "$pull": { "cartItems": {id: {$eq: productId}}}
        }).exec();
        if(!cartWithProductToDelete) this.throwError('Such cart does not exists.');
       
        return cartWithProductToDelete;
    }

    public static async changeAmountInCart(cartId: string, productId: string, amount: number) {

        const cartWithProductToChangeAmount = await CartMongo.findOneAndUpdate({id: cartId, "cartItems.product.id": productId}, {
            "$set": {"cartItems.$.amountOfProduct": amount}
        }).exec();

        if(!cartWithProductToChangeAmount) this.throwError('Such cart does not exists.');

        return cartWithProductToChangeAmount;
    }

    public static async buyCart(cartId: string) {
        const cart = await CartMongo.findOne({id: cartId});
        if(!cart) this.throwError('Cart does not exist.');

        const cartPrice = this.calculateCart(cart);
        const cartItems = cart.cartItems.map((item: ICartItemData) => { 
            return { product: item.product.productName, price: item.product.productPrice}
    });
        const cartPriceWithDiscount = this.calculateCartWithDiscount(cart, cartPrice);
        await this.clearCart(cartId);
        return {cartItems, cartPrice: parseFloat(cartPrice.toFixed(2)), cartPriceWithDiscount: parseFloat(cartPriceWithDiscount.toFixed(2))};
    }

    public static async checkCart(cartId: string) {
        const cart = await CartMongo.findOne({id: cartId}); 
        if(!cart) this.throwError('Cart does not exist.');
        
        return cart;
    }

    public static async addDiscountToCart(cartId: string, discountCode: string) {
        const searchedDiscount = await DiscountMongo.findOne({discountCode: discountCode})
        if(!searchedDiscount) this.throwError("Entered discount does not exists in database.");

        const cart = await CartMongo.findOneAndUpdate({id: cartId}, {
            "discountCode.discountCode": searchedDiscount.discountCode,
            "discountCode.discountValue": searchedDiscount.discountValue
        });
        if(!cart) this.throwError('Cart does not exist.');

        return cart;
   }

    private static calculateCart(cart: ICartData): number {
        const finalPrice = cart.cartItems.reduce((totalPrice, cartItem) => {
            totalPrice += this.calculatePrice(cartItem.product.productPrice, cartItem.amountOfProduct);
            return totalPrice;
        }, 0);
        return finalPrice;
    }

    private static calculateCartWithDiscount(cart: ICartData, cartPrice: number): number {
        return (cartPrice - (cartPrice * cart.discountCode.discountValue));
    }

    private static calculatePrice(productPrice: number, amountOfProduct: number): number {
        return productPrice * amountOfProduct;
    } 

    private static async clearCart(cartId: string) {
        const clearedCart = await CartMongo.findOneAndUpdate({id: cartId}, {
            $set: { cartItems: []}
        });

        return clearedCart;
    }

    private static throwError(message: string) {
        throw new Error(message);
    }
}