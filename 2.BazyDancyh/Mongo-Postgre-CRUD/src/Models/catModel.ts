import { v4 as uuidv4 } from 'uuid';
import { TCatGender } from '../Types/types';


export class CatModel {
    cat_id: string;
    name: string;
    gender: TCatGender;
    color: string;
    age: number;
    
    constructor(name: string, gender: TCatGender, color: string, age: number) {
        this.cat_id = uuidv4();
        this.name = name;
        this.gender = gender;
        this.color = color;
        this.age = age;
    }
}