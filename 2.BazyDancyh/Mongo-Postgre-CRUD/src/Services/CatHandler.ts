import { CatModel } from '../Models/catModel';
import Cat from '../db/Mongo/CatModel';
import { TCatGender, PostgreCat, ICatData } from '../Types/types';
import postDb from '../db/pg/db';

export class CatHandler {
    public static async showAllCats() {
        const catsFromMongo = await Cat.find();
        const catsFromPostgre = await postDb<PostgreCat>('Cats').select().table('cats');
        
        return {catsFromMongo, catsFromPostgre};
    }

    public static async showCat(catId: string) {
        const searchedCatMongo = await Cat.findOne({ cat_id: catId });
        const searchedCatPg = await postDb<PostgreCat>('cats').select().where({cat_id: catId});

        if(!searchedCatMongo) throw new Error("No cat with this Id in database MongoDB.");
        if(!searchedCatPg) throw new Error("No cat with this Id in database Postgres.");

        return { searchedCatMongo, searchedCatPg };
    }

    public static async createCat(name: string, gender: TCatGender, color: string, age: number) {
        const newCat = new CatModel(name, gender, color, age);

        const catMongo = new Cat({
            cat_id: newCat.cat_id,
            name: newCat.name,
            gender: newCat.gender,
            color: newCat.color,
            age: newCat.age
        });

        await catMongo.save();

        const catPg = await postDb<PostgreCat>('cats').insert({
            cat_id: newCat.cat_id,
            name: newCat.name,
            gender: newCat.gender,
            color: newCat.color,
            age: newCat.age
        }, ['id']);


        return newCat;
    }

    public static async modifyCat(catId: string, catData: ICatData) {
        const catMongo = await Cat.findOne({cat_id: catId});
        const catPg = await postDb<PostgreCat>('cats').where({cat_id: catId}).then(res => res[0]);
        
        if(!catMongo) throw new Error("No cat with this id in database Mongo.");
        if(!catPg) throw new Error("No cat with this id in database Postgres.");

        const catToModifyMongo = await Cat.findOneAndUpdate({ cat_id: catId }, catData);
        const catToModifyPg = await postDb<PostgreCat>('cats').where({cat_id: catId}).update(catData, ['cat_id']);        

        return { catToModifyMongo, catToModifyPg };
    }

    public static async adoptKitten(catId: string) {
        const deletedKittenMongo = await Cat.findOneAndDelete({ cat_id: catId });
        const deletedKittenPg = await postDb<PostgreCat>('cats').del(['cat_id']).where({cat_id: catId});

        if(!deletedKittenMongo) throw new Error("No cat with this Id in database MongoDB.");
        if(!deletedKittenPg) throw new Error("No cat with this Id in database Postgre.");

        return { deletedKittenMongo, deletedKittenPg };
    }
}