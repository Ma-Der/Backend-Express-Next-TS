import { Router } from 'express';
import { CategoryController } from '../Controllers/CategoryController';

class CategoryRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/", CategoryController.getCategories);
        this.router.get("/:id", CategoryController.getCategory);
        this.router.post("/", CategoryController.createCategory);
        this.router.patch("/:id", CategoryController.changeCategoryProperty);
        this.router.delete("/:id", CategoryController.deleteCategory);
    }
}

const categoryRoutes = new CategoryRouter();
export default categoryRoutes;