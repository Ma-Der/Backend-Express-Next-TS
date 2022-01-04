import { v4 as uuidv4 } from 'uuid';
import { IStudent, Grades } from '../Types/types';

export class StudentModel implements IStudent {
    id: string;
    name: string;
    surname: string;
    birthDate: Date;
    grades: number[];
    constructor(name: string, surname: string, birthDate: Date, grades: number[]) {
        this.id = uuidv4();
        this.name = name;
        this.surname = surname;
        this.birthDate = birthDate;
        this.grades = grades;
    }  

    showStudent() {
        return {
            id: this.id,
            name: this.name,
            surname: this.surname,
            birthDate: this.birthDate,
            grades: this.grades,
        }
    }
}