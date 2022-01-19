import { Router } from 'express';
import { ProductController } from '../Controllers/ProductController';

class ProductRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.post("/", ProductController.createProduct);
        this.router.put("/update/:id", ProductController.changeProductProperty);
        this.router.delete("/:id", ProductController.deleteProduct);
        this.router.get("/", ProductController.getAllProducts);
        this.router.put("/discount/:id", ProductController.addDiscountToProduct);
    }
}

const productRoutes = new ProductRoutes();
export default productRoutes;