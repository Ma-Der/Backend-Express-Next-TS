import { Router } from 'express';
import { StoresChainController } from '../Controllers/StoresChainController';

class StoresChainRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/", StoresChainController.getStoresChains);
        this.router.get("/:id", StoresChainController.getStoresChain);
        this.router.post("/", StoresChainController.createStoresChain);
        this.router.patch("/:id", StoresChainController.changeStoresChainProperty);
        this.router.delete("/:id", StoresChainController.deleteStoresChain);
    }
}

const storesChainRoutes = new StoresChainRouter();
export default storesChainRoutes;