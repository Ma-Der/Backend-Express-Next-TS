import { Router } from 'express';
import { ServerAController } from '../Controllers/ServerAController';

class ServerARoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.post("/addUser", ServerAController.addUser);
        this.router.post("/userLoggedIn/:id", ServerAController.userLoggedIn);
        this.router.post("/userLoggedOut/:id", ServerAController.userLoggedOut);
        this.router.post("/userBoughtProduct/:id", ServerAController.userBoughtProduct);
        this.router.delete("/userLoggedIn/:id", ServerAController.deleteUserLoggedIn);
        this.router.patch("/userBoughtProduct/:id", ServerAController.updateUserProductAmount);
    }

}

const serverARoutes = new ServerARoutes();
export default serverARoutes;