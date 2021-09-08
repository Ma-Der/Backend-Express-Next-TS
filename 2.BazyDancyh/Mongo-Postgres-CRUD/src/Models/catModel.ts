import { v4 as uuidv4 } from 'uuid';
import { ICat, ICatData } from '../Types/types';

export class Cat implements ICat {
    id: string;
    name: string;
    gender: string;
    color: string;
    age: number;
    
    constructor(name: string, color: string, gender: string, age: number) {
        this.id = uuidv4();
        this.name = name;
        this.color = color;
        this.gender = gender;
        this.age = age;
    }

    getCat(): ICatData {
        return {
            name: this.name,
            color: this.color,
            gender: this.gender,
            age: this.age
        }
    }
}