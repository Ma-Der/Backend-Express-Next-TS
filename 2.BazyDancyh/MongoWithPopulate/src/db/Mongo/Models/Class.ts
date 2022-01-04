import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    name: {type: String, required: true},
    students: [{type: mongoose.Types.ObjectId, ref: "Student"}],
});

const Class = mongoose.model('Class', ClassSchema);
export default Class;