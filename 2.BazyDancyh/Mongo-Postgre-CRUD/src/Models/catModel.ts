import { v4 as uuidv4 } from 'uuid';
import { CatGender } from '../Types/types';


export class CatModel {
    id: string;
    name: string;
    gender: CatGender;
    color: string;
    age: number;
    
    constructor(name: string, gender: CatGender, color: string, age: number) {
        this.id = uuidv4();
        this.name = name;
        this.gender = gender;
        this.color = color;
        this.age = age;
    }
}