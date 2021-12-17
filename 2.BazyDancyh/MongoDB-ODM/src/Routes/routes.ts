import { Router } from 'express';
import { UserController } from '../Controllers/UserController';

class MongoRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.post("/", UserController.create);
        this.router.post("/:_id", UserController.findById);
        this.router.post("/searchBefore", UserController.findAllUsersBornBeforeGivenDate);
        this.router.post("/searchAfter", UserController.findAllUsersBornAfterGivenDate);
        this.router.post("/searchByItem", UserController.findAllUsersThatLikeGivenItem);
        this.router.delete("/:_id", UserController.findByIdAndDelete);
        this.router.patch("/:_id", UserController.findByIdAndUpdate);

        this.router.post("/:id", UserController.findAllUsersWithGivenIdInFriends);
    }
}

const routes = new MongoRoutes();
export default routes;
