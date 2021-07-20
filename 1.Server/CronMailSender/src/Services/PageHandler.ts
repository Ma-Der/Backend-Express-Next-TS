import { emailArray } from '../db/emailsDB';

export class PageHandler {
    public static loadPage1() {
        const email1 = emailArray[0];
        if(!email1) throw new Error("Database is empty.");
        return email1;
    }

    public static loadPage2() {
        const email2 = emailArray[1];
        if(!email2) throw new Error("No such email.");
        return email2;
    }

    public static loadPage3() {
        const email3 = emailArray[0];
        if(!email3) throw new Error("No such email.");
        return email3;
    }
}