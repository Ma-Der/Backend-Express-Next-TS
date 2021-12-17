import { MongoClient, ObjectId } from 'mongodb';
import { UserModel } from '../Models/user';

export interface IUser {
    name: string;
    dateOfBirth: string;
    thingsItLikes: Array<string>;
    friends: Array<string>;
}

export class MongooseMethods {
    mongoClient: MongoClient;
    
    constructor(mongoClient: MongoClient) {
        this.mongoClient = mongoClient;
    }

    public async create(user: IUser) {
        const client = await this.mongoClient.connect();
        const db = client.db();

        const newUser = new UserModel(user.name, user.dateOfBirth, user.thingsItLikes, user.friends);
        const insertResult = await db.collection("users").insertOne(newUser);
        const { insertedId } = insertResult;
        const result = await db.collection("users").findOne({_id: insertedId});
        
        client.close();

        return result;
    }

    public async findById(_id: ObjectId) {
        const client = await this.mongoClient.connect();
        const db = client.db();

        const result = await db.collection("users").findOne({_id: _id});
        client.close();

        return result;
    }

    public async findByIdAndDelete(id: ObjectId) {
        const client = await this.mongoClient.connect();
        const db = client.db();

        const result = await db.collection("users").findOneAndDelete({_id: id});

        client.close();

        return result;
    }

    public async findByIdAndUpdate(id: ObjectId, user: IUser) {
        const client = await this.mongoClient.connect();
        const db = client.db();

        const result = await db.collection("users").findOneAndUpdate({_id: id}, { $set: user});

        client.close();

        return result;
    }
    
    public async findAllUsersBornBeforeGivenDate(dateInMiliseconds: number) {
        const client = await this.mongoClient.connect();
        const db = client.db();

        const result = await db.collection('users').find({ dateOfBirth: {$lt: dateInMiliseconds}}).toArray();

        client.close();

        return result;
    }
    
    public async findAllUsersBornAfterGivenDate(dateInMiliseconds: number) {
        const client = await this.mongoClient.connect();
        const db = client.db();

        const result = await db.collection("users").find({ dateOfBirth: {$gt: dateInMiliseconds}}).toArray();

        client.close();

        return result;
    }
    
    public async findAllUsersThatLikeGivenItem(item: string) {
        const client = await this.mongoClient.connect();
        const db = client.db();
        
        const result = await db.collection("users").find({thingsItLikes: {$eq: item}}).toArray();
        
        return result;
    }
    
    public async findAllUsersWithGivenIdInFriends(idOfFriend: string) {
        const client = await this.mongoClient.connect();
        const db = client.db();
        console.log(idOfFriend)
        const result = await db.collection("users").find({friends: {$eq: idOfFriend}}).toArray();
        console.log(result)
        
        return result;
    }
}
