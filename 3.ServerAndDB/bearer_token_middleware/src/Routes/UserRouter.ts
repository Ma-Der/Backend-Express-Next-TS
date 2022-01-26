import { Router } from 'express';
import { UserController } from '../Controllers/UserController';

class UserRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.post("/", UserController.createUser);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes;