import { Router } from 'express';
import passport from 'passport';
import { AuthController } from '../Controllers/AuthController';

class AuthRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/", (req, res) => { res.render('index') });
        this.router.get("/login", (req, res) => { res.render('login') });
        this.router.get("/register", (req, res) => { res.render('register') });
        this.router.get("/logged", (req, res) => {res.render('logged')});
        this.router.get("/auth/google", passport.authenticate('google', {
            scope: ['profile']
        }));
        this.router.get("/auth/google/callback", passport.authenticate('google', { successRedirect: "/logged", failureRedirect: "/failure"}));

        this.router.get("/auth/facebook", passport.authenticate('facebook', { scope: ["displayName"] }));
        this.router.get("/auth/facebook/callback", passport.authenticate('facebook', { successRedirect: "/logged", failureRedirect: "/failure"}));

        this.router.get("/auth/github", passport.authenticate('github', {
            scope: ['profile']
        }));
        this.router.get("/auth/github/callback", passport.authenticate('github', { successRedirect: "/logged", failureRedirect: "/failure"}));
        this.router.post("/login", passport.authenticate('local', { successRedirect: "/logged", failureRedirect: "/failure"}, AuthController.localRedirect));
        this.router.post("/register", AuthController.registerUser);
    }
}

const authRoutes = new AuthRoutes();

export default authRoutes;