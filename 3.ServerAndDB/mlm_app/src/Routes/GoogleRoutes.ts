import { Router } from 'express';
import passport from 'passport';
import { MLMController } from '../Controllers/MLMController';

class GoogleRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/auth/google", passport.authenticate('google', { scope: ['profile']}));
        this.router.get("/google/callback", passport.authenticate('google', { failureRedirect: "/fail" }), MLMController.loggedIn);
    }
}

const googleRoutes = new GoogleRoutes();
export default googleRoutes;