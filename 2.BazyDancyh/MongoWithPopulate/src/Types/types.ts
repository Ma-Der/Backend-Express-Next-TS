export interface IStudent {
    id: string;
    name: string;
    surname: string;
    birthDate: Date;
    grades: number[];
}

export interface IClass {
    name: string;
    students: string[];
}

export interface ISchool {
    name: string;
    classes: string[];
}

export type Grades = 2 | 3 | 4 | 5;