import { Router } from 'express';
import { CronController } from '../Controllers/CronController';
import { PageController } from '../Controllers/PageController';

class CronRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.put('/stop/:emailNmr', CronController.stopSendEmail);
        this.router.get('/stop/:emailNmr', CronController.showEmail)
        this.router.get('/page1', PageController.loadPage1);
        this.router.get('/page2', PageController.loadPage2)
        this.router.get('/page3', PageController.loadPage3)
    }

}

const cronRoutes = new CronRoutes();
export default cronRoutes;