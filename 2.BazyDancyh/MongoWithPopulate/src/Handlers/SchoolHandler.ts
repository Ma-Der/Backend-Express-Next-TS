import School from '../db/Mongo/Models/School';
import { SchoolModel } from '../Models/school'; 
import { StudentModel } from '../Models/student';
import { StudentHandler } from './StudentHandler';
import { ClassModel } from '../Models/class';
import mongoose from 'mongoose';
import axios from 'axios';
import { Grades, IEditSchool } from '../Types/types';
import { ClassHandler } from './ClassHandler';

export class SchoolHandler {
    public static baseUrl = "https://random-data-api.com/api/";
    public static classNames = ['1a', '2a','3a','4a','1b','2b','3b','4b','1c','2c','3c','4c','1d','2d','3d','4d','1e','2e','3e','4e'];

    public static async getSchool(id: string) {
        const searchedSchool = await School.findById(this.toObjectId(id));
        if(!searchedSchool) throw new Error('No school with this id.');

        return searchedSchool.populate({
            path: 'classes',
            populate: {
                path: 'students',
                model: 'Student'
            }
        });
    }

    public static async createSchool() {
        const randomUser = await axios.get(`${this.baseUrl}users/random_user`);
        const schoolName = randomUser.data.address.city;

        const newSchool = new SchoolModel(schoolName);
        const newSchoolInDB = await School.create(newSchool);

        for(let i=0; i < 3;i++) {
            const newClass = await this.createRandomClass();
            newSchoolInDB.classes.push(newClass._id);
            await newSchoolInDB.save();
        }

        return newSchoolInDB;
    }

    public static async deleteSchool(id: string) {
        const deletedSchool = await School.deleteOne({_id: this.toObjectId(id)});

        return deletedSchool;
    }

    public static async editSchool(id: string, editSchoolObject: IEditSchool) {
        const editedSchool = await School.findByIdAndUpdate(this.toObjectId(id), editSchoolObject);

        return editedSchool;
    }

    private static async createRandomStudent() {
        const randomUser = await axios.get(`${this.baseUrl}users/random_user`);
        const name = randomUser.data.first_name;
        const surname = randomUser.data.last_name;
        const dateOfBirth = this.getRandomDate(new Date(2003, 0, 1), new Date(2010, 11, 31));
        let grades: Grades[] = [];

        for(let i=1; i<=5; i++) {
            grades.push(this.getRandomNumber(2,5));
        }

        const newStudent = await StudentHandler.createStudent(name, surname, dateOfBirth, grades);

        return newStudent;
    }

    private static async createRandomClass() {
        const className = await this.getRandomClassName(this.classNames);

        const newClassInDB = await ClassHandler.createClass(className);

        for(let i=0; i < 10;i++) {
            const newStudent = await this.createRandomStudent();
            newClassInDB.students.push(newStudent._id);
            await newClassInDB.save();
        }

        return newClassInDB;
    }

    private static toObjectId(id: string) {
        return new mongoose.Types.ObjectId(id);
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