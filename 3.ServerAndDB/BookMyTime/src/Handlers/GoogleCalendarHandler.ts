import { google } from 'googleapis';
import { IDataToCreateEvent, IDataToUpdateEvent } from '../Types/calendarTypes';
import { googleClientId, googleClientSecret } from '../Config/envVar';
import { PrismaClient } from '@prisma/client';
import { CalendarDBHandler } from './CalendarDBHandler';

export class GoogleCalendarHandler {    
    public static async createEvent(email: string, eventData: IDataToCreateEvent) {
        const oAuth2Client = await this.getOAuth2Client(email);
        
        google.options({auth: oAuth2Client});
        const calendar = google.calendar("v3");
        const event = {
            summary: eventData.summary,
            description: eventData.description,
            location: eventData.location,
            colorId: '5',
            start: {
                dateTime: new Date(eventData.startTime).toISOString(),
            },
            end: {
                dateTime: new Date(eventData.endTime).toISOString(),
            }
        }

        const createdEvent = await calendar.events.insert({calendarId: 'primary', requestBody: event});
        if(!createdEvent) throw new Error("Event not created.");

        const eventToDB = {
            eventId: createdEvent.data.id as string,
            summary: createdEvent.data.summary as string,
            description: createdEvent.data.description as string,
            location: createdEvent.data.location as string,
            startTime: event.start.dateTime,
            endTime: event.end.dateTime
        }

        const newEventToDB = await CalendarDBHandler.createEvent(eventToDB);
        return createdEvent.data;
    }

    public static async editEvent(email: string, eventId: string, eventDataToUpdate: IDataToUpdateEvent) {
        const oAuth2Client = await this.getOAuth2Client(email);
        google.options({auth: oAuth2Client});
        const calendar = google.calendar('v3');

        const editedEventInGoogle = await calendar.events.update({
            calendarId: 'primary',
            eventId,
            requestBody: eventDataToUpdate
        })

        const updateDataInDB = await CalendarDBHandler.editEvent(eventId, eventDataToUpdate);

        return editedEventInGoogle.data;
    }

    public static async deleteEvent(email: string, eventId: string) {
        const oAuth2Client = await this.getOAuth2Client(email);
        google.options({auth: oAuth2Client});
        const calendar = google.calendar('v3');

        const deletedEventInGoogle = await calendar.events.delete({
            calendarId: 'primary',
            eventId
        });

        const deletedEventInDB = await CalendarDBHandler.deleteEvent(eventId);

        return deletedEventInGoogle.data;
    }

    public static async getOAuth2Client(email: string) {
        const prisma = new PrismaClient();
        const oAuth2Client = new google.auth.OAuth2(googleClientId, googleClientSecret);
        const credentials = await prisma.auth.findFirst({
            where: {
                email: email
            }
        });
        if(!credentials) throw new Error('There is no way to set credentials to this email.');
        oAuth2Client.setCredentials({refresh_token: credentials.refresh_token});

        return oAuth2Client;
    }
}