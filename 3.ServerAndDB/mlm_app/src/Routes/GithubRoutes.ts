import { Router } from 'express';
import passport from 'passport';
import { MLMController } from '../Controllers/MLMController';

class GithubRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/auth/github", passport.authenticate('github'));
        this.router.get("/github/callback", passport.authenticate('github', { failureRedirect: "/fail" }), MLMController.getStartPage);
    }
}

const githubRoutes = new GithubRoutes();
export default githubRoutes;