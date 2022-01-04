import { IClass, ISchool } from "../Types/types";

export class SchoolModel implements ISchool {
    name: string;
    classes: string[];
    constructor(name: string) {
        this.name = name;
        this.classes = [];
    }
}