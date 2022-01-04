import { Router } from "express";
import { SchoolController } from '../Controllers/schoolController';

class MenRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/:name", SchoolController.getSchools);
        this.router.delete("/:name", SchoolController.deleteSchool);
        this.router.patch("/:name", SchoolController.editSchool);
        this.router.post("/", SchoolController.createSchool);
    }
}

const menRouter = new MenRouter();
export default menRouter;