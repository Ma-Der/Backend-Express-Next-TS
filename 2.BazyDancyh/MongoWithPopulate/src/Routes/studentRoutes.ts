import { Router } from "express";
import { StudentController } from '../Controllers/studentController';

class StudentRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/:studentId", StudentController.getStudent);
        this.router.delete("/:studentId", StudentController.deleteStudent);
        this.router.patch("/:studentId", StudentController.editStudent);
        this.router.post("/", StudentController.createStudent);
    }
}

const studentRouter = new StudentRouter();
export default studentRouter;