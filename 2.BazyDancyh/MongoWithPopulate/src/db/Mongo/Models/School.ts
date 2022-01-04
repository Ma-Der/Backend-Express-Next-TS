import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
    name: {type: String, required: true},
    classes: [{type: mongoose.Types.ObjectId, ref: "Class"}]
});

const School = mongoose.model('School', SchoolSchema);
export default School;