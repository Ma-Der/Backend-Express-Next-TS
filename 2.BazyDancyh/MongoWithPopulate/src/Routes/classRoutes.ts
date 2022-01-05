import { Router } from "express";
import { ClassController } from '../Controllers/classController';

class ClassRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/:id", ClassController.getClass);
        this.router.delete("/:id", ClassController.deleteClass);
        this.router.patch("/:id", ClassController.editClass);
        this.router.post("/", ClassController.createClass);
    }
}

const classRouter = new ClassRouter();
export default classRouter;