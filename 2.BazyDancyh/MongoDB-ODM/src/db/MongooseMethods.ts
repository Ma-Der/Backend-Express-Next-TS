import { MongoClient, ObjectId } from 'mongodb';

type TUserId = {
    id: ObjectId;
}

export interface IUser {
    name: String;
    dateOfBirth: String;
    thingsItLikes: Array<String>;
    friends: TUserId[];
}

export class MongooseMethods {
    mongoClient: MongoClient;
    
    constructor(mongoClient: MongoClient) {
        this.mongoClient = mongoClient;
    }

    public async create(user: IUser) {
        const client = await this.mongoClient.connect();
        const db = client.db();

        const insertResult = await db.collection("users").insertOne(user);
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

        const result = await db.collection("users").find({ dateOfBirth: $lt: dateInMiliseconds});

        client.close();

        return result;
    }
    
    public async findAllUsersBornAfterGivenDate(dateInMiliseconds: number) {
        const client = await this.mongoClient.connect();
        const db = client.db();

        const result = await db.collection("users").find({ dateOfBirth: $gt: dateInMiliseconds});

        client.close();

        return result;
    }
    
    public async findAllUsersThatLikeGivenItem(item: string) {
        const client = await this.mongoClient.connect();
        const db = client.db();
        
        const result = await db.collection("users").find({thingsItLikes: [{$eq: item}]});
        
        return result;
    }
}
