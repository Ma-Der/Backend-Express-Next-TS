import Student from '../db/Mongo/Models/Student';
import { StudentModel } from '../Models/student';
import mongoose from 'mongoose';
import { Grades, IEditStudent } from '../Types/types';

export class StudentHandler {
    public static async getStudent(studentId: string) {
        const student = await Student.findById({_id: this.toObjectId(studentId)});
        return student;
    }

    public static async createStudent(name: string, surname: string, birthDate: Date, grades: Grades[]) {
        const newStudent = new StudentModel(name, surname, birthDate, grades);

        const newStudentInDb = await Student.create(newStudent);
        return newStudentInDb;
    }

    public static async deleteStudent(studentId: string) {
        const student = await Student.findById({_id: this.toObjectId(studentId)});
        await Student.deleteOne({_id: this.toObjectId(studentId)});
        return student;
    }

    public static async editStudent(studentId: string, editStudentObject: IEditStudent) {
        const student = await Student.findOneAndUpdate({_id: this.toObjectId(studentId)}, editStudentObject);
        return student;
    }

    private static toObjectId(id: string) {
        return new mongoose.Types.ObjectId(id);
    }
}