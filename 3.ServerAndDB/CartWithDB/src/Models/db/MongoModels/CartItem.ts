import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CartItemsSchema = new Schema({
    cartItemId: {type: String, required: true},
    productName: {type: String, required: true},
    productPrice: {type: Number, required: true},
    amountOfProduct: {type: Number, required: true}
});
