import { v4 as uuidv4 } from 'uuid';

export class UserModel {
    userId: string;
    username: string;
    password: string;
    points: number;
    referrer: string;
    inferiors: string[];
    constructor(username: string, password: string, id: string = '', referrer: string = 'none') {
        this.userId = id !== '' ? id : uuidv4();
        this.username = username;
        this.password = password;
        this.points = 0;
        this.referrer = referrer;
        this.inferiors = [];
    }
}