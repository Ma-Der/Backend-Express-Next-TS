import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    id: {type: String, required: true},
    productName: {type: String, required: true},
    oldProductPrice: {type: Number, required: true},
    productPrice: {type: Number, required: true},
    discount: {type: Number, required: true},
});

const ProductMongo = mongoose.model('Product', ProductSchema);
export default ProductMongo;