export interface IStudent {
    id: string;
    name: string;
    surname: string;
    birthDate: Date;
    grades: number[];
}

export interface IStudentData {
    id: string;
    name: string;
    surname: string;
    birthDate: Date;
    grades: Grades[];
}

export interface IClass {
    name: string;
    students: string[];
}

export interface ISchool {
    name: string;
    classes: string[];
}

export interface IEditStudent {
    name?: string;
    surname?: string;
    birthDate?: Date;
    grades?: Grades[];
}

export interface IEditClass {
    name?: string;
    students?: string[];
}

export interface IEditSchool {
    name?: string;
    classes?: string[];
}

export enum Grades { two=2, three, four, five };