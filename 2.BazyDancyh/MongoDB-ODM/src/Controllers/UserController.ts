import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { IUser } from '../db/MongooseMethods';
import UserHandler from '../Handlers/UserHandler';

export class UserController {

    public static async create(req: Request<{}, {}, {user: IUser}>, res: Response) {
        try {
            const { user } = req.body;

            const result = await UserHandler.create(user);

            return res.status(201).json(result);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }

    public static async findById(req: Request<{_id: string}>, res: Response) {
        try {
            const { _id } = req.params;

            const result = await UserHandler.findById(_id);

            return res.status(200).json(result);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }

    public static async findByIdAndDelete(req: Request<{_id: string}>, res: Response) {
        try {
            const { _id } = req.params;

            const result = await UserHandler.findByIdAndDelete(_id);

            return res.status(200).json(result);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }

    public static async findByIdAndUpdate(req: Request<{_id: string}, {}, {user: IUser}>, res: Response) {
        try {
            const { _id } = req.params;
            const { user } = req.body;

            const result = await UserHandler.findByIdAndUpdate(_id, user);

            return res.status(200).json(result);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }
}