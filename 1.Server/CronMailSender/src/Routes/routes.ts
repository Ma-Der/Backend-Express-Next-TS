import { Router } from 'express';
import { EmailController } from '../Controllers/EmailController';
import { PageController } from '../Controllers/PageController';
import { NodemailerController } from '../Controllers/NodemailerController';

class CronRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.post('/:emailNmr', EmailController.incrementCounter);
        this.router.get("/", NodemailerController.sendMail);
        this.router.post('/stop/:emailNmr', EmailController.stopSendEmail);
        this.router.get('/stop/:emailNmr', EmailController.showEmail);
        this.router.get('/page1', PageController.loadPage1);
        this.router.get('/page2', PageController.loadPage2);
        this.router.get('/page3', PageController.loadPage3);
    }

}

const cronRoutes = new CronRoutes();
export default cronRoutes;