import { v4 as uuidv4 } from 'uuid';
import { IEmail } from '../Types/types';

export class Email implements IEmail {
    id: string;
    to: string;
    text: string;

    constructor(to: string, text: string) {
        this.id = uuidv4();
        this.to = to;
        this.text = text; 
    }

    changeText(text: string) {
        this.text = text;
    }

    changeReciever(to: string) {
        this.to = to;
    }

    showEmail() {
        return {
            id: this.id,
            to: this.to,
            text: this.text
        }
    }
}