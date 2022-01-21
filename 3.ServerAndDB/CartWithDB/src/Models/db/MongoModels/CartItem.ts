import mongoose from 'mongoose';
import { ProductSchema } from '../MongoModels/Product';

const Schema = mongoose.Schema;

export const CartItemsSchema = new Schema({
    id: {type: String, required: true},
    product: ProductSchema,
    amountOfProduct: {type: Number, required: true}
});
