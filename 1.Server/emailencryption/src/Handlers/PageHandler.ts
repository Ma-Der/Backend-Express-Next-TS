import { emailDB } from '../db/emailDB';

export class PageHandler {
    public static loadPage() {
        const email = emailDB[0];
        return email;
    }




}