import { Router } from 'express';
import { ShopController } from '../Controllers/ShopController';

class ShopRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/", ShopController.getShops);
        this.router.get("/:id", ShopController.getShop);
        //this.router.post("/", ShopController.createShop);
        this.router.post("/rate/:id", ShopController.addRating);
        this.router.patch("/:id", ShopController.changeShopProperty);
        this.router.delete("/:id", ShopController.deleteShop);
        
    }
}

const shopRoutes = new ShopRouter();
export default shopRoutes;