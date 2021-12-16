import { Router } from 'express';
import { UserController } from '../Controllers/UserController';

class MongoRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.post("/", UserController.create);
        this.router.post("/:_id", UserController.findById);
        this.router.delete("/:_id", UserController.findByIdAndDelete);
        this.router.patch("/:_id", UserController.findByIdAndUpdate);
    }
}

const routes = new MongoRoutes();
export default routes;