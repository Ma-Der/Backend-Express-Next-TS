import { Router } from 'express';

class GoogleRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {

    }
}

const googleRoutes = new GoogleRouter();
export default googleRoutes;