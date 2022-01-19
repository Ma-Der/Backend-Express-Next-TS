import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const DiscountSchema = new Schema({
    discountCode: { type: String, required: true},
    discountValue: {type: Number, required: true}
});

const DiscountMongo = mongoose.model('Discouunt', DiscountSchema);
export default DiscountMongo;