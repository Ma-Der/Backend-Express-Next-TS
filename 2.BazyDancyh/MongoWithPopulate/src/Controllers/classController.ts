import { Request, Response } from 'express';
import { ClassHandler } from '../Handlers/ClassHandler';
import { IEditClass } from '../Types/types';

export class ClassController {
    public static async getClass(req: Request<{id: string}>, res: Response) {
        try {
            const { id } = req.params;
            const searchedClass = await ClassHandler.getClass(id);

            return res.status(200).json(searchedClass);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }

    public static async deleteClass(req: Request<{id: string}>, res: Response) {
        try {
            const { id } = req.params;
            const deletedClass = await ClassHandler.deleteClass(id);

            return res.status(200).json({message: "Succesfully deleted class"});
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }

    public static async editClass(req: Request<{id: string}, {}, {editClassObject: IEditClass}>, res: Response) {
        try {
            const { id } = req.params;
            const { editClassObject } = req.body;

            const editedClass = await ClassHandler.editClass(id, editClassObject);

            return res.status(201).json(editedClass);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }

    public static async createClass(req: Request<{}, {}, {name: string}>, res: Response) {
        try {
            const { name } = req.body;
            const createdClass = await ClassHandler.createClass(name);

            return res.status(201).json(createdClass);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }
}