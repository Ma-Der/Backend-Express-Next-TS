import { Router } from "express";
import { DiscountController } from '../Controllers/DiscountController';

class DiscountRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.post("/create", DiscountController.createDiscount);
        this.router.put("/modify", DiscountController.modifyDiscount);
        this.router.get("/show", DiscountController.showDiscounts);
        this.router.delete("/delete", DiscountController.deleteDiscount);
    }
}

const discountRoutes = new DiscountRoutes();
export default discountRoutes;