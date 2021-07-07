import { Router } from 'express';
import { WebhookControler } from '../Controllers/webhookControler';

class WebhookRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.post("/sendData", WebhookControler.log);
    }
}

const webhookRoutes = new WebhookRoutes();
export default webhookRoutes;