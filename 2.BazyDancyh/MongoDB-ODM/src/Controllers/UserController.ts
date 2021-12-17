import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { IUser } from '../db/MongooseMethods';
import UserHandler from '../Handlers/UserHandler';

export class UserController {

    public static async create(req: Request<{}, {}, {user: IUser}>, res: Response) {
        try {
            const { user } = req.body;
            console.log(user)
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
            console.log('hello ID')
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
    
    public static async findAllUsersBornBeforeGivenDate(req: Request<{}, {}, {date: string}>, res: Response) {
        try {
            
            const { date } = req.body;
            const actualDate = new Date(date);
            
            if((Object.prototype.toString.call(actualDate) !== "[object Date]") && !isNaN(actualDate.getTime())) throw new Error("Date string is not a valid dateString.");
            
            const result = await UserHandler.findAllUsersBornBeforeGivenDate(date);
            
            return res.status(200).json(result);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }
    
    public static async findAllUsersBornAfterGivenDate(req: Request<{}, {}, {date: string}>, res: Response) {
        try {
            const { date } = req.body;
            const actualDate = new Date(date);

            if((Object.prototype.toString.call(actualDate) !== "[object Date]") && !isNaN(actualDate.getTime())) throw new Error("Date string is not a valid dateString.");
            
            const result = await UserHandler.findAllUsersBornAfterGivenDate(date);
            
            return res.status(200).json(result);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }
    
    public static async findAllUsersThatLikeGivenItem(req: Request<{}, {}, {}, {item: string}>, res: Response) {
        try {
            const { item } = req.query;
            
            if(!item) throw new Error("Item is undefined");
            if(typeof item !== "string") throw new Error("Item is not a string.");
            if(item.length === 0) throw new Error("Item is empty string");
            if(item.length < 3) return res.status(400).json({message: "Searched item is less than 3 characters."})
            
            const result = await UserHandler.findAllUsersThatLikeGivenItem(item);
            
            return res.status(200).json(result);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }
    
    public static async findAllUsersWithGivenIdInFriends(req: Request<{id: string}>, res: Response) {
        try {
            const { id } = req.params;
            
            if(!id) throw new Error("Id is undefined");
            if(id.length === 0) throw new Error("Id is empty string");
            if(id.length < 10) throw new Error("Id is not a valid id in database.");
            
            const result = await UserHandler.findAllUsersWithGivenIdInFriends(id);
            
            return res.status(200).json(result);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }
}
