import {Router} from 'express';
import { StackExchangeController } from '../Controllers/StackExchangeController';
class Routes {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get('/getUsersFromEurope', StackExchangeController.getUsersFromEurope);
        this.router.get("/getBestUserForEachCountry", StackExchangeController.getBestUserForEachCountry);
        this.router.get("/getCountryByUsersReputationBy", StackExchangeController.getCountryByUsersReputationBy);
    }
}

const routes = new Routes();
export default routes;