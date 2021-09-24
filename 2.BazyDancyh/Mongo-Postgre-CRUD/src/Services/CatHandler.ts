import { CatModel } from '../Models/catModel';
import Cat from '../Database/Mongo/CatModel';
import { CatGender } from '../Types/types';

export class CatHandler {
    public static showCat(catId: string) {

    }

    public static createCat(name: string, gender: CatGender, color: string, age: number) {
        const newCat = new CatModel(name, gender, color, age);

        const catMongo = new Cat({
            catId: newCat.id,
            name: newCat.name,
            gender: newCat.gender,
            color: newCat.color,
            age: newCat.age
        });

        catMongo.save();

        return newCat;
    }

    public static modifyCat(catId: string, parameterToModify: string, newValue: string | number) {

    }

    public static adoptKitten(catId: string) {

    }
}