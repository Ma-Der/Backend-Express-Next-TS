import { IClass } from "../Types/types";

export class Class implements IClass {
    name: string;
    students: string[];
    constructor(name: string) {
        this.name = name;
        this.students = [];
    }
}