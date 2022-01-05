import SchoolClass from '../db/Mongo/Models/Class';
import { ClassModel } from '../Models/class';
import mongoose, { ObjectId } from 'mongoose';
import { IEditClass } from '../Types/types';

export class ClassHandler {
    public static async getClass(id: string) {
        const searchedClass = await SchoolClass.findById({_id: this.toObjectId(id)});

        return searchedClass.populate('students');
    }

    public static async createClass(className: string) {
        const newClass = new ClassModel(className);
        const newClassInDB = await SchoolClass.create(newClass);

        return newClassInDB;
    }

    public static async deleteClass(id: string) {
        const deletedClass = await SchoolClass.deleteOne({_id: this.toObjectId(id)});

        return deletedClass;
    }

    public static async editClass(id: string, editClassObject: IEditClass) {
        const editedClass = await SchoolClass.findByIdAndUpdate(this.toObjectId(id), editClassObject);

        return editedClass;
    }

    private static toObjectId(id: string) {
        return new mongoose.Types.ObjectId(id);
    }
}