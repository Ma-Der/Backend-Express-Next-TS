import mongoose from 'mongoose';
import { CartItemsSchema } from './CartItem';
import { DiscountSchema } from './Discount';

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    id: {type: String, required: true},
    cartItems: [CartItemsSchema],
    discountCode: DiscountSchema
});

const CartMongo = mongoose.model('Cart', CartSchema);
export default CartMongo;