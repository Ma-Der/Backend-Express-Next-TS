import { Router } from 'express';
import { ViewsController } from '../Controllers/ViewsController';
import { GoogleController } from '../Controllers/GoogleController';
import { uploadMulter } from '../Services/MulterHandler';

class GoogleRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/", ViewsController.loadIndex);
        this.router.get("/form", ViewsController.loadForm);
        this.router.get("/upload", GoogleController.getOAuthCredentials);
        this.router.post("/upload", uploadMulter.single('file'), GoogleController.upload);
    }
}

const googleRoutes = new GoogleRouter();
export default googleRoutes;