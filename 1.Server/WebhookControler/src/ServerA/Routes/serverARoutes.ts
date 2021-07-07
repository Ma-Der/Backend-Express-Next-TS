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
        this.router.post("/userLoggedIn", ServerAController.userLoggedIn);
        this.router.post("/userLoggedOut", ServerAController.userLoggedOut);
        this.router.post("/userBoughtProduct", ServerAController.userBoughtProduct);
        this.router.delete("/userLoggedIn", ServerAController.deleteUserLoggedIn);
        this.router.put("/userBoughtProduct", ServerAController.updateUserProductAmount);
    }

}

const serverARoutes = new ServerARoutes();
export default serverARoutes;