import { Router } from 'express';
import { HeartController } from '../Controllers/HeartController';

class HeartRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/:cardName", HeartController.getCard);
    }
}

const heartRoutes = new HeartRouter();
export default heartRoutes;