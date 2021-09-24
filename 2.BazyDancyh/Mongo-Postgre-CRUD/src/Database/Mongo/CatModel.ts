import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const catSchema = new Schema({
    catId: {type: String, required: true},
    name: {type: String, required: true},
    gender: {type: String, required: true},
    color: {type: String, required: true},
    age: {type: Number, required: true}
});

const Cat = mongoose.model('cats_db', catSchema);
export default Cat;