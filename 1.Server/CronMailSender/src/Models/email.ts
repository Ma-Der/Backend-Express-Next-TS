import { v4 as uuidv4 } from 'uuid';
import { IEmailData } from '../db/emailsDB';

export interface IEmail {
    id: string;
    to: string;
    counter: number;
    switch: boolean;
    msg: string;
    counterIncrease(): void;
    switchOff(): void;
    switchOn(): void;
    showEmail(): IEmailData;
}

export class Email implements IEmail {
    id: string;
    to: string;
    msg: string;
    switch: boolean;
    counter: number;

    constructor(to: string, msg: string) {
        this.id = uuidv4();
        this.to = to;
        this.msg = msg;
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
            msg: this.msg,
            switch: this.switch,
            counter: this.counter
        }
    }
}