import { Router } from "express";
import { ImageController } from '../Controllers/ImageController';

class ImageRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/getFirstImage", ImageController.getFirstImage);
        this.router.get("/getSecondImage", ImageController.getSecondImage);
    }
}

const imageRoutes = new ImageRoutes();
export default imageRoutes;