import { Router } from "express";
import { AttackController } from '../Controllers/AttackController';

class AttackRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.post("/attack", AttackController.attack);
    }
}

const attackRoutes = new AttackRoutes();

export default attackRoutes;