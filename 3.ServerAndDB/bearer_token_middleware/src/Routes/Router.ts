import { Router } from 'express';
import { BearerController } from '../Controllers/BearerController';
class BearerRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.post("/login", BearerController.login);
        this.router.delete("/logout", BearerController.logout);
        this.router.post("/refreshToken", BearerController.refreshAccessToken);
    }
}

const bearerRoutes = new BearerRoutes();
export default bearerRoutes;