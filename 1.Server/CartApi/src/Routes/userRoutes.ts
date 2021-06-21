import { Router } from "express";
import { UserController } from "../Controllers/UserController";

class UserRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.post("/new", UserController.addUser);
        this.router.delete("/:id", UserController.deleteUser);
        this.router.put("/:id", UserController.updateUser);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes;