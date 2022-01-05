import axios from 'axios';
import { StudentModel } from '../Models/student';
import { ClassModel } from '../Models/class'; 
import { SchoolModel } from '../Models/school';
import Student from '../db/Mongo/Models/Student';
import SchoolClass from '../db/Mongo/Models/Class';
import School from '../db/Mongo/Models/School';


export class Creation {
    public static baseUrl = "https://random-data-api.com/api/";
    public static classNames = ['1a', '2a','3a','4a','1b','2b','3b','4b','1c','2c','3c','4c','1d','2d','3d','4d','1e','2e','3e','4e'];
    
    public static async createStudent() {
        const randomUser = await axios.get(`${this.baseUrl}users/random_user`);
        const name = randomUser.data.first_name;
        const surname = randomUser.data.last_name;
        const dateOfBirth = this.getRandomDate(new Date(2003, 0, 1), new Date(2010, 11, 31));
        let grades: number[] = [];

        for(let i=1; i<=5; i++) {
            grades.push(this.getRandomNumber(2,5));
        }

        const newStudent = new StudentModel(name, surname, dateOfBirth, grades);

        const newStudentInDb = await Student.create(newStudent);
        return newStudentInDb;
    }
    public static async createClass() {
        const className = await this.getRandomClassName(this.classNames);

        const newClass = new ClassModel(className);
        const newClassInDB = await SchoolClass.create(newClass);

        for(let i=0; i < 10;i++) {
            const newStudent = await this.createStudent();
            newClassInDB.students.push(newStudent._id);
            await newClassInDB.save();
        }

        return newClassInDB;
    }
    public static async createSchool() {
        const randomUser = await axios.get(`${this.baseUrl}users/random_user`);
        const schoolName = randomUser.data.address.city;

        const newSchool = new SchoolModel(schoolName);
        const newSchoolInDB = await School.create(newSchool);

        for(let i=0; i < 3;i++) {
            const newClass = await this.createClass();
            newSchoolInDB.classes.push(newClass._id);
            await newSchoolInDB.save();
        }

        return newSchoolInDB;
    }

    public static async clearDB() {
        await School.deleteMany({});
        await SchoolClass.deleteMany({});
        await Student.deleteMany({});
    }

    private static getRandomDate(start: Date, end: Date) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    private static getRandomNumber(start: number, end: number) {
        return Math.ceil(Math.random() * (end - start) + start);
    }

    private static getRandomClassName(classNames: string[]) {
        const randomNumber = this.getRandomNumber(0, classNames.length);

        return classNames[randomNumber];
    }
}