import { Request, Response } from 'express';
import { SchoolHandler } from '../Handlers/SchoolHandler';
import { IEditSchool } from '../Types/types';

export class SchoolController {
    public static async getSchools(req: Request<{id: string}>, res: Response) {
        try {
            const { id } = req.params;
            const searchedSchool = await SchoolHandler.getSchool(id);

            return res.status(200).json(searchedSchool);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }

    public static async deleteSchool(req: Request<{id: string}>, res: Response) {
        try {
            const { id } = req.params;

            const deletedSchool = await SchoolHandler.deleteSchool(id);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }

    public static async editSchool(req: Request<{id: string}, {}, {editSchoolObject: IEditSchool}>, res: Response) {
        try {
            const { id } = req.params;
            const { editSchoolObject } = req.body;

            const editedSchool = await SchoolHandler.editSchool(id, editSchoolObject);

            return res.status(200).json(editedSchool);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }

    public static async createSchool(req: Request, res: Response) {
        try {
            const createdSchool = await SchoolHandler.createSchool();

            return res.status(201).json(createdSchool);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }
}