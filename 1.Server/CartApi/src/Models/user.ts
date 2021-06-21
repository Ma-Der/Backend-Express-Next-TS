import { v4 as uuidv4 } from 'uuid';
import { UserValue, IUserData, IUser } from '../Types/userTypes';

export class User implements IUser {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;

    constructor(name: string, surname: string, email: string, password: string) {
        this.id = uuidv4();
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
    }

    updateUser(valueToUpdate: UserValue, newValue: string): IUserData {
        if(newValue.length < 2) throw new Error("Not enough digits.");
        switch(valueToUpdate) {
            case 'name':
                this.name = newValue;
                break;
            case 'surname':
                this.surname = newValue;
                break;
            case 'email':
                this.email = newValue;
                break;
            case 'password':
                this.password = newValue;
                break;
            default: 
                throw new Error('Wrong value to update.');
        }
        return this.getUserData();
    }

    getUserData(): IUserData {
        return {
            id: this.id,
            name: this.name,
            surname: this.surname,
            email: this.email,
            password: this.password
        }
    }
}