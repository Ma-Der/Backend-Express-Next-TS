import { Request, Response } from 'express';
import { CalendarDBHandler } from '../Handlers/CalendarDBHandler';
import { ResponseProcessor } from '../Services/ResponseProcessor';

export class CalendarDBController {
    public static async getEvents(req: Request, res: Response) {
        try {

            const events = await CalendarDBHandler.getEvents();
            return ResponseProcessor.endResponse(res, {message: "Events from database.", error: false, status: 200, values: events});
        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, error: true, status: 400});
        }
    }
}