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
        this.router.delete("/:cartId&:productId", CartController.deleteProductFromCart);
        this.router.put("/:cartId&productId", CartController.changeProductAmount);
        this.router.post("/buy/:cartId", CartController.buyCart);
        this.router.put("/discount/:cartId", CartController.addDiscountToCart);
    }

}

const cartRoutes = new CartRoutes();
export default cartRoutes;