import { Router } from 'express';
import { ProductController } from '../Controllers/ProductController';

class ProductRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/", ProductController.getProducts);
        this.router.get("/:id", ProductController.getProduct);
        this.router.post("/", ProductController.createProduct);
        this.router.patch("/:id", ProductController.changeProductProperty);
        this.router.delete("/:id", ProductController.deleteProduct);
    }
}

const productRoutes = new ProductRouter();
export default productRoutes;