import Joi from 'joi';
import { google } from 'googleapis';
import { GoogleCalendarHandler } from '../Handlers/GoogleCalendarHandler';
import { IDataToCreateEvent } from '../Types/calendarTypes';

export class EventValidation {
    public static idValidation(eventId: string) {
        const idSchema = Joi.string();
        const result = idSchema.validate(eventId);

        return result;
    }

    public static emailValidation(email: string) {
        const emailSchema = Joi.string().email();
        const result = emailSchema.validate(email);

        return result;
    }

    public static eventDataValidation(eventData: IDataToCreateEvent) {
        const eventDataSchema = Joi.object({
            summary: Joi.string(),
            description: Joi.string(),
            location: Joi.string(),
            startTime: Joi.string(),
            endTime: Joi.string()
        });
        const result = eventDataSchema.validate(eventData);
        return result;
    }

    public static async eventValidation(email: string, eventData: IDataToCreateEvent) {
        this.emailValidation(email);
        this.eventDataValidation(eventData);
        const auth = await GoogleCalendarHandler.getOAuth2Client(email);
        google.options({auth: auth});
        const calendar = google.calendar('v3');

        const startTime = new Date(eventData.startTime);
        const endTime = new Date(eventData.endTime);
        if(!startTime) throw new Error("Start time date cannot be created.");
        if(!endTime) throw new Error("End time date cannot be created.");
        const startTimeMiliseconds = startTime.getTime();
        const endTimeMiliseconds = endTime.getTime();
        const threeHoursInMiliseconds = 10800000;

        if((endTimeMiliseconds - startTimeMiliseconds) > threeHoursInMiliseconds) throw new Error("Event is too long, max event is 3 hours.");

        const checkStartTime = startTime.setMinutes(startTime.getMinutes() - 15);
        const checkEndTime = startTime.setMinutes(startTime.getMinutes() + 15);

        const correctStartTime = new Date(checkStartTime);
        const correctEndTime = new Date(checkEndTime);

        const freebusyResponse = await calendar.freebusy.query({
            requestBody: {
                timeMin: correctStartTime.toISOString(),
                timeMax: correctEndTime.toISOString(),
                items: [
                    {id: 'primary'}
                ]
            }
        });

        const busyEvents = freebusyResponse.data.calendars?.primary.busy;
        if(busyEvents && busyEvents.length === 0) {
            return {busy: false, message: 'No events in this time.'};
        }

        return { busy: true, message: 'There is event in this time.'}
    }
}