import { Router } from "express";
import { ClassController } from '../Controllers/classController';

class ClassRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/:name", ClassController.getClass);
        this.router.delete("/:name", ClassController.deleteClass);
        this.router.patch("/:name", ClassController.editClass);
        this.router.post("/", ClassController.createClass);
    }
}

const classRouter = new ClassRouter();
export default classRouter;