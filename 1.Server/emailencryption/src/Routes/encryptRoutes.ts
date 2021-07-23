import { Router } from 'express';
import { EmailController } from '../Controllers/EmailController';
import { PageController } from '../Controllers/PageController';

class EncryptRouter {
    router: Router;
    
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/", PageController.loadPage);
        this.router.get('/send/:emailId', EmailController.sendEmail);
        this.router.get('/decrypt', EmailController.decryptEmail);
    }
}

const encryptRoutes = new EncryptRouter();
export default encryptRoutes;