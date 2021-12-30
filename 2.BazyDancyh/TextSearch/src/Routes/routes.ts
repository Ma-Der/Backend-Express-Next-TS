import { Router } from 'express';
import { TextSearchController } from '../Controllers/TextSearchController';


class MealRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/", TextSearchController.findDishes);
    }
}

const mealRouter = new MealRouter();
export default mealRouter;