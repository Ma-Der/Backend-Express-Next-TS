import { Request, Response } from 'express';
import { CalendarDBHandler } from '../Handlers/CalendarDBHandler';
import { ResponseProcessor } from '../Services/ResponseProcessor';

export class CalendarDBController {
    public static async getEvents(req: Request, res: Response) {
        try {
            return ResponseProcessor.endResponse(res, {message: "Hello", error: false, status: 200});
        }
        catch(err: any) {
            return ResponseProcessor.endResponse(res, {message: err.message, error: true, status: 400});
        }
    }
}