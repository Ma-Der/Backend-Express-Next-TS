import { Router } from 'express';
import { ProductController } from '../Controllers/ProductController';

class ProductRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.post("/create", ProductController.createProduct);
        this.router.put("/updateName", ProductController.changeProductName);
        this.router.put("/updatePrice", ProductController.changeProductPrice);
        this.router.delete("/delete", ProductController.deleteProduct);
        this.router.get("/getAll", ProductController.getAllProducts);
    }
}

const productRoutes = new ProductRoutes();
export default productRoutes;