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
        this.router.get("/showEmails", EmailController.showEmails);
        this.router.post('/send/:emailId', EmailController.sendEmail);
        this.router.post('/decrypt', EmailController.decryptEmail);
    }
}

const encryptRoutes = new EncryptRouter();
export default encryptRoutes;