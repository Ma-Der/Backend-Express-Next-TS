import { Router } from 'express';
import { EmailController } from '../Controllers/EmailController';
import { NodemailerController } from '../Controllers/NodemailerController';

class CronRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/:emailNmr", EmailController.getPage);
        this.router.get("/", NodemailerController.sendMail);
        this.router.post('/stop/:emailNmr', EmailController.stopSendEmail);
        this.router.get('/stop/:emailNmr', EmailController.showEmail);
    }

}

const cronRoutes = new CronRoutes();
export default cronRoutes;