import { Request, Response } from 'express';
import { GoogleCalendarHandler } from '../Handlers/GoogleCalendarHandler';
import { ResponseProcessor } from '../Services/ResponseProcessor';
import { IDataToCreateEvent, IDataToUpdateEvent } from '../Types/calendarTypes';

export class GoogleCalendarController {
    public static async createEvent(req: Request<{}, {}, {email: string, eventData: IDataToCreateEvent}>, res: Response) {
        try {
            const { email, eventData } = req.body;

            const createdEvent = await GoogleCalendarHandler.createEvent(email, eventData);

            return ResponseProcessor.endResponse(res, {message: `Event created.`, error: false, status: 201, values: createdEvent});
        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, error: true, status: 400});
        }
    }

    public static async editEvent(req: Request<{eventId: string}, {}, {email: string, eventData: IDataToUpdateEvent}>, res: Response) {
        try {
            const { email, eventData } = req.body;
            const { eventId } = req.params;

            const updatedEvent = await GoogleCalendarHandler.editEvent(email, eventId, eventData);

            return ResponseProcessor.endResponse(res, {message: `Event created.`, error: false, status: 200, values: updatedEvent});
        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, error: true, status: 400});
        }
    }

    public static async deleteEvent(req: Request<{eventId: string}, {}, {email: string}>, res: Response) {
        try {
            const { eventId } = req.params;
            const { email } = req.body;

            const deletedEvent = await GoogleCalendarHandler.deleteEvent(email, eventId);

            return ResponseProcessor.endResponse(res, {message: `Event deleted.`, status: 204, error: false});
        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, status: 400, error: true});
        }
    }
}