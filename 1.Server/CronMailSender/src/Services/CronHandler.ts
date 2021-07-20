import { emailArray } from '../db/emailsDB';

export class CronHandler {
    public static stopSendEmail(emailId: string) {
        const emailToStop = emailArray.find(({id}) => emailId === id);
        if(!emailToStop) throw new Error("No such email in database.");
        
        emailToStop.switchOff();

        return emailToStop.showEmail();
    }

    public static showEmail(emailId: string) {
        const emailToShow = emailArray.find((email) => email.id === emailId);
        if(!emailToShow) throw new Error("No email to show.");

        return emailToShow.showEmail();
    }
}