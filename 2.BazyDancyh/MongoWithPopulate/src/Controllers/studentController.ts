import { Request, Response } from 'express';
import { StudentHandler } from '../Handlers/StudentHandler';
import { IEditStudent, IStudentData } from '../Types/types';

export class StudentController {
    public static async getStudent(req: Request<{studentId: string}>, res: Response) {
        try {
            const { studentId } = req.params;
            const searchedStudent = await StudentHandler.getStudent(studentId);
            if(!studentId) throw new Error("No id.");
            if(!searchedStudent) return res.status(404).json({message: "Searched student was not found."});

            return res.status(200).json(searchedStudent);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }

    public static async deleteStudent(req: Request<{studentId: string}>, res: Response) {
        try {
            const { studentId } = req.params;
            if(!studentId) throw new Error("No id.");
            const deletedStudent = await StudentHandler.deleteStudent(studentId);

            return res.status(204).json({message: "Student deleted"})
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }

    public static async editStudent(req: Request<{studentId: string}, {}, {editStudentObject: IEditStudent}>, res: Response) {
        try {
            const { studentId } = req.params;
            if(!studentId) throw new Error("No id.");
            const { editStudentObject } = req.body;
            const editedStudent = await StudentHandler.editStudent(studentId, editStudentObject);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }

    public static async createStudent(req: Request<{}, {}, {studentData: IStudentData}>, res: Response) {
        try {
            const { studentData } = req.body;
            const newStudent = await StudentHandler.createStudent(studentData.name, studentData.surname, studentData.birthDate, studentData.grades);

            return res.status(201).json(newStudent);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }
}