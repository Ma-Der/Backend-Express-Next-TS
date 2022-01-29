import { PrismaClient } from '@prisma/client';
import { IDataToCreateEvent, IDataToEdit } from "../Types/calendarTypes";

export class CalendarDBHandler {
    private static prisma = new PrismaClient();
    
    public static async getEvents() {

    }

    public static createEvent(dataToCreateEvent: IDataToCreateEvent) {

    }

    public static editEvent(id: string, dataToEdit: IDataToEdit) {

    }

    public static deleteEvent(id: string) {

    }
}