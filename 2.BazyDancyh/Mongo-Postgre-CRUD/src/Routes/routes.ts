import { Router } from 'express';
import { CatController } from '../Controllers/CatController';

class CatRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/showCat/:catId", CatController.showCat);
        this.router.post("/createCat", CatController.createCat);
        this.router.delete("/adoptKitten/:catId", CatController.deleteCat);
        this.router.patch("/modify/:catId", CatController.modifyCat);
    }
}

const catRoutes = new CatRoutes();
export default catRoutes;