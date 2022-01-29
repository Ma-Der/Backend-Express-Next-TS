import { Router } from 'express';
import { CalendarDBController } from '../Controllers/CalendarDBController';

class CalendarRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/", CalendarDBController.getEvents);
    }
}

const calendarRoutes = new CalendarRoutes();
export default calendarRoutes;