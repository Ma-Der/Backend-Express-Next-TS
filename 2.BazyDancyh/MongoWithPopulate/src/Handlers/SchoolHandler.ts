import School from '../db/Mongo/Models/School';
import mongoose, { ObjectId } from 'mongoose';

export class SchoolHandler {
    public static async getSchool(schoolName: string) {
        
    }

    public static async createSchool() {

    }

    public static async deleteSchool(schoolName: string) {

    }

    public static async editSchool() {
        
    }

    private static toObjectId(id: string) {
        return new mongoose.Types.ObjectId(id);
    }
}