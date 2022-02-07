import { google } from 'googleapis';
import { IDataToCreateEvent } from '../Types/calendarTypes';
import { PrismaClient } from '@prisma/client';

export class GoogleCalendarHandler {
    private static prisma = new PrismaClient();
    private static calendar = google.calendar({version: "v3"});
    
    public static async createEvent(eventData: IDataToCreateEvent) {
        
    }

    public static async editEvent() {

    }

    public static async deleteEvent() {

    }

// dorobic do credentials w bazie danych link do uzytkownika w postaci userId lub cos takiego
    private static async getOAuth2Client(userId: string, clientId: string, clientSecret: string) {
        const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret);
        // const credentials = await this.prisma.auth.findFirst({
        //     where: {
        //         userId: userId
        //     }
        // })
    }
}