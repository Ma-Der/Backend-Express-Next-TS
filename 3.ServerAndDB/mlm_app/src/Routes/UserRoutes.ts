import { Router } from 'express';
import { UserController } from '../Controllers/UserController';

class UserRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/:id", UserController.getUser);
        this.router.post("/", UserController.createUser);
        this.router.patch("/:id", UserController.updateUser);
        this.router.delete("/:id", UserController.deleteUser);
    }
}

const userRouter = new UserRoutes();
export default userRouter;