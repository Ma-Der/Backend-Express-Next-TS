import { Router } from 'express';
import { DiscordController } from '../Controllers/DiscordController';
import { isAuthorized } from '../Utils/utils';

class RoleRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/:guildId/roles/create", isAuthorized, DiscordController.getCreateRolePage);
        this.router.post("/:guildId/roles", isAuthorized, DiscordController.createRole);
        this.router.get("/:guildId/roles/:roleId/modify", isAuthorized, DiscordController.getModifyRolePage);
        this.router.patch("/:guildId/roles/:roleId", isAuthorized, DiscordController.modifyRole);
        this.router.delete("/:guildId/roles/:roleId", isAuthorized, DiscordController.deleteRole);
    }
}

const roleRoutes = new RoleRoutes();
export default roleRoutes;