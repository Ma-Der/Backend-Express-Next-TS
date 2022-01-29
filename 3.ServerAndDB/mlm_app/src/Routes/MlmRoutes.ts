import { Router } from 'express';
import { MLMController } from '../Controllers/MLMController';

class MLMRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/mlm", MLMController.loggedIn);
        this.router.get("/fail", MLMController.getFailPage);
        this.router.post("/reflink", MLMController.generateRefLink);
    }
}

const mlmRoutes = new MLMRoutes();
export default mlmRoutes;