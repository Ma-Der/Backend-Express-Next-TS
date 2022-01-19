import { Router } from "express";
import { DiscountController } from '../Controllers/DiscountController';

class DiscountRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.post("/", DiscountController.createDiscount);
        this.router.put("/", DiscountController.modifyDiscount);
        this.router.get("/", DiscountController.showDiscounts);
        this.router.delete("/", DiscountController.deleteDiscount);
    }
}

const discountRoutes = new DiscountRoutes();
export default discountRoutes;