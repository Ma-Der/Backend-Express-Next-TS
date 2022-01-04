import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    birthDate: {type: String, required: true},
    grades: {type: Array, required: true},
});

const Student = mongoose.model('Student', StudentSchema);
export default Student;