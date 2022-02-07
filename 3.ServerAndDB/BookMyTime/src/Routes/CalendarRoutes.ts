import { Router } from 'express';
import { CalendarDBController } from '../Controllers/CalendarDBController';
import { GoogleCalendarController } from '../Controllers/GoogleCalendarController';

class CalendarRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/", CalendarDBController.getEvents);
        this.router.post("/", GoogleCalendarController.createEvent);
        this.router.patch("/:id", GoogleCalendarController.editEvent);
        this.router.delete("/:id", GoogleCalendarController.deleteEvent);
    }
}

const calendarRoutes = new CalendarRoutes();
export default calendarRoutes;