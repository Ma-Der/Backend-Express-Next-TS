import { MongooseMethods } from '../db/MongooseMethods';
import { client } from '../db/initMongo';
import { IUser } from '../db/MongooseMethods'; 
import { ObjectId } from 'mongodb';

export default class UserHandler {
    private static mongoClient = new MongooseMethods(client);
    
    public static async create(user: IUser) {
        if(!user) console.log('No user');
        
        const result = await this.mongoClient.create(user);

        return result;
    }

    public static async findById(id: string) {
        if(!id) console.log("No id");
        
        const result = await this.mongoClient.findById(new ObjectId(id));

        return result;
    }

    public static async findByIdAndDelete(id: string) {
        if(!id) console.log("No id");

        const result = await this.mongoClient.findByIdAndDelete(new ObjectId(id));

        return result;
    }

    public static async findByIdAndUpdate(id: string, user: IUser) {
        if(!id) console.log("No id");
        if(!user) console.log("No user");

        const result = await this.mongoClient.findByIdAndUpdate(new ObjectId(id), user);

        return result;
    }
    
    public static async findAllUsersBornBeforeGivenDate(date: string) {
        if(!date) throw new Error("Date variable is probably undefined");
        if(!(date instanceof Date && !isNaN(date))) throw new Error("Date string is not a valid dateString.");
        
        const dateInMiliseconds = (new Date(date)).getTime();
        const result = await this.mongoClient.findAllUsersBornBeforeGivenDate(dateInMiliseconds);
        
        return result;
    }
    
    public static async findAllUsersBornAfterGivenDate(date: string) {
        if(!date) throw new Error("Date variable is probably undefined");
        if(!(date instanceof Date && !isNaN(date))) throw new Error("Date string is not a valid dateString.");
        
        const dateInMiliseconds = (new Date(date)).getTime();
        const result = await this.mongoClient.findAllUsersBornAfterGivenDate(dateInMiliseconds);
        
        return result;
    }
}
