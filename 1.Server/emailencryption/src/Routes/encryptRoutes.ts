import { Router } from 'express';

class EncryptRouter {
    router: Router;
    
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {

    }
}

const encryptRoutes = new EncryptRouter();
export default encryptRoutes;