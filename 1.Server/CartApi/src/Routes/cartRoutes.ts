import {Router} from 'express';
import { CartController } from '../Controllers/CartController';


class CartRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.post("/add", CartController.addProductToCart);
        this.router.get("/check", CartController.checkCart);
        this.router.delete("/delete", CartController.deleteProductFromCart);
        this.router.put("/:id", CartController.changeProductAmount);
        this.router.post("/buy", CartController.buyCart);
    }

}

const cartRoutes = new CartRoutes();
export default cartRoutes;