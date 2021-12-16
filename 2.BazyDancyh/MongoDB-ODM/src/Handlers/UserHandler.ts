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
    
    public static async findAllUsersThatLikeGivenItem(item: string) {
        if(!item) throw new Error("Item is undefined");
        if(typeof item !== "string") throw new Error("Item is not a string.");
        if(item.length = 0) throw new Error("Item is empty string");
        
        const result = await this.mongoClient.findAllUsersThatLikeGivenItem(item);
        
        return result;
    }
    
    public static async findAllUsersWithGivenIdInFriends(idOfFriend: string) {
        if(!idOfFriend) throw new Error("Id is undefined");
        if(idOfFriend.length = 0) throw new Error("Id is empty string");
        if(idOfFriend.length < 10) throw new Error("Id is not a valid id in database.");
        
        const result = await this.mongoClient.findAllUsersWithGivenIdInFriends(idOfFriend);
        
        return result;
    }
}
