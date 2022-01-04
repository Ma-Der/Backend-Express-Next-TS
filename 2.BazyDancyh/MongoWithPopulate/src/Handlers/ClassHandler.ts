import Class from '../db/Mongo/Models/Class';
import mongoose, { ObjectId } from 'mongoose';

export class ClassHandler {
    public static async getClass(id: string) {
        const searchedClass = await Class.findById({_id: this.toObjectId(id)});

        return searchedClass;
    }

    public static async createClass() {

    }

    public static async deleteClass(className: string) {

    }

    public static async editClass() {
        
    }

    private static toObjectId(id: string) {
        return new mongoose.Types.ObjectId(id);
    }
}