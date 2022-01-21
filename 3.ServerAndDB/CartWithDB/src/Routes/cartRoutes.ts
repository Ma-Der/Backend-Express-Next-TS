import {Router} from 'express';
import { CartController } from '../Controllers/CartController';


class CartRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.post("/:cartId", CartController.addProductToCart);
        this.router.get("/:cartId", CartController.checkCart);
        this.router.delete("/:cartId", CartController.deleteProductFromCart); 
        this.router.put("/:cartId", CartController.changeProductAmount);
        this.router.put("/buy/:cartId", CartController.buyCart);
        this.router.patch("/discount/:cartId", CartController.addDiscountToCart);
    }

}

const cartRoutes = new CartRoutes();
export default cartRoutes;