import { google } from 'googleapis';
import { IDataToCreateEvent, IDataToUpdateEvent } from '../Types/calendarTypes';
import { googleClientId, googleClientSecret } from '../Config/envVar';
import { PrismaClient } from '@prisma/client';
import { CalendarDBHandler } from './CalendarDBHandler';

export class GoogleCalendarHandler {    
    public static async createEvent(email: string, eventData: IDataToCreateEvent) {
        const oAuth2Client = await this.getOAuth2Client(email);
        google.options({auth: oAuth2Client});
        const calendar = google.calendar({version: "v3"});
        
        const event = {
            summary: eventData.summary,
            description: eventData.description,
            location: eventData.location,
            colorId: '5',
            start: {
                dateTime: eventData.startTime
            },
            end: {
                dateTime: eventData.endTime
            }
        }

        const createdEvent = await calendar.events.insert({calendarId: 'primary', requestBody: event});

        const eventToDB = {
            eventId: createdEvent.data.id,
            summary: createdEvent.data.summary,
            description: createdEvent.data.description,
            location: createdEvent.data.location,
            startTime: createdEvent.data.start.toString(),
            endTime: createdEvent.data.end.toString()
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

    private static async getOAuth2Client(email: string) {
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