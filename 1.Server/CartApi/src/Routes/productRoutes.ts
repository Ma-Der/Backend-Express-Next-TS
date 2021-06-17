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
        this.router.put("/updateName/:id", ProductController.changeProductName);
        this.router.put("/updatePrice/:id", ProductController.changeProductPrice);
        this.router.delete("/delete/:id", ProductController.deleteProduct);
        this.router.get("/getAll", ProductController.getAllProducts);
        this.router.put("/discount/:id", ProductController.addDiscountToProduct);
    }
}

const productRoutes = new ProductRoutes();
export default productRoutes;