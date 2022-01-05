import { Router } from "express";
import { SchoolController } from '../Controllers/schoolController';

class MenRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/:id", SchoolController.getSchools);
        this.router.delete("/:id", SchoolController.deleteSchool);
        this.router.patch("/:id", SchoolController.editSchool);
        this.router.post("/", SchoolController.createSchool);
    }
}

const menRouter = new MenRouter();
export default menRouter;