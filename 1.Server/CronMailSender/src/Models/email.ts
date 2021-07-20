import { v4 as uuidv4 } from 'uuid';
import { IEmailData } from '../db/emailsDB';

export interface IEmail {
    id: string;
    to: string;
    counter: number;
    switch: boolean;
    text: string;
    counterIncrease(): void;
    switchOff(): void;
    switchOn(): void;
    showEmail(): IEmailData;
}

export class Email implements IEmail {
    id: string;
    to: string;
    text: string;
    switch: boolean;
    counter: number;

    constructor(to: string, text: string) {
        this.id = uuidv4();
        this.to = to;
        this.text = text;
        this.switch = true;
        this.counter = 0;
    }

    counterIncrease() {
        this.counter++;
    }

    switchOff() {
        this.switch = false;
    }

    switchOn() {
        this.switch = true;
    }

    showEmail(): IEmailData {
        return {
            id: this.id,
            to: this.to,
            text: this.text,
            switch: this.switch,
            counter: this.counter
        }
    }
}