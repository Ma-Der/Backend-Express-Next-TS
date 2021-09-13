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
        this.router.delete("/:userId", UserController.deleteUser);
        this.router.put("/:userId", UserController.updateUser);
        this.router.get("/", UserController.getAllUsers);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes;