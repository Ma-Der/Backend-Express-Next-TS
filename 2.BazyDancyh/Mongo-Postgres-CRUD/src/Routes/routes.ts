import { Router } from 'express';
import { CatController } from '../Controllers/CatController';

export class CatRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/:catId", CatController.getCat);
        this.router.post("/cat", CatController.createCat);
        this.router.patch("/cat/:catId", CatController.modifyCat);
        this.router.delete("/cat/:catId", CatController.deleteCat);
    }
}

const router = new CatRouter();

export default router;