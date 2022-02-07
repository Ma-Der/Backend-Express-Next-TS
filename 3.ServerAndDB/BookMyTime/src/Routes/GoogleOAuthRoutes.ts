import { Router } from 'express';
import { GoogleAuthController } from '../Controllers/GoogleAuthController';

class GoogleOAuthRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/authorize", GoogleAuthController.getOAuthCredentials);
        this.router.get("/url", GoogleAuthController.generateAuthUrl);
    }
}

const googleOAuthRoutes = new GoogleOAuthRoutes();
export default googleOAuthRoutes;