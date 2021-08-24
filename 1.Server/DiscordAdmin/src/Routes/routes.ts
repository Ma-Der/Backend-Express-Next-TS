import { Router } from 'express';
import { UserController } from '../Controllers/UserController';
import { DiscordController } from '../Controllers/DiscordController';
import { isAuthorized } from '../Utils/utils';
import passport from 'passport';
import { scopes } from '../Services/Passport/passportStrategies';

class Routes {
    router: Router;

    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/", UserController.userLogin);
        this.router.get("/dashboard", isAuthorized, UserController.loggedIn);
        this.router.get("/invite", isAuthorized, DiscordController.inviteBot);
        this.router.get("/dashboard/guild/:guildId/channels", isAuthorized, DiscordController.getGuildChannels);
        this.router.get("/dashboard/guild/:guildId/roles", isAuthorized, DiscordController.getGuildRoles);

        this.router.get("/failure", (req, res) => res.render("failure"));
        
        this.router.get("/auth/discord", passport.authenticate('discord', {scope: scopes}));
        this.router.get("/disc", passport.authenticate('discord', { successRedirect: "/dashboard", failureRedirect: "/failure"}));
    
    }
}

const routes = new Routes();
export default routes;