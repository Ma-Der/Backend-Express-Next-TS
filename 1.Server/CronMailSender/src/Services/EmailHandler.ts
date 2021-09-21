import { emailArray } from '../db/emailsDB';

export class EmailHandler {
    public static stopSendEmail(emailId: string) {
        const emailToStop = emailArray.find(({id}) => emailId === id);
        if(!emailToStop) throw new Error("No such email in database.");
        
        emailToStop.switchOff();

        return emailToStop.showEmail();
    }

    public static showEmail(emailId: string) {
        const emailToShow = emailArray.find(({id}) => id === emailId);
        if(!emailToShow) throw new Error("No email to show.");

        return emailToShow.showEmail();
    }

    public static incrementCounter(emailId: string) {
        const emailCounterToIncrement = emailArray.find(({id}) => id === emailId);
        if(!emailCounterToIncrement) throw new Error("No email and counter to increment.");

        emailCounterToIncrement.counterIncrease();
        
        return emailCounterToIncrement.showEmail();
    }
}