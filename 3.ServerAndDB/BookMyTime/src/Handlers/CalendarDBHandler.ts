import { PrismaClient } from '@prisma/client';
import { IDataToCreateEventInDB, IDataToUpdateEvent } from "../Types/calendarTypes";

export class CalendarDBHandler {
    private static prisma = new PrismaClient();
    
    public static async getEvents() {
        const events = await this.prisma.event.findMany({});
        if(!events) throw new Error('No events in database.');

        return events;
    }

    public static async createEvent(eventData: IDataToCreateEventInDB) {
        const newEvent = await this.prisma.event.create({
            data: {
                eventId: eventData.eventId,
                summary: eventData.summary,
                description: eventData.description,
                location: eventData.location,
                eventStartTime: eventData.startTime,
                eventEndTime: eventData.endTime
            }
        });
        if(!newEvent) throw new Error("New event could not be created.");

        return newEvent;
    }

    public static async editEvent(id: string, dataToEdit: IDataToUpdateEvent) {
        const updatedEvent = await this.prisma.event.update({
            where: {
                eventId: id
            },
            data: dataToEdit
        });

        if(!updatedEvent) throw new Error("No event to update.");

        return updatedEvent;
    }

    public static async deleteEvent(id: string) {
        const deletedEvent = await this.prisma.event.delete({
            where: {
                eventId: id
            }
        });

        return deletedEvent;
    }
}