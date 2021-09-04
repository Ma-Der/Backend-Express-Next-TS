import { Router } from 'express';
import { DiscordController } from '../Controllers/DiscordController';
import { isAuthorized } from '../Utils/utils';

class ChannelRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/:guildId/channels/create", isAuthorized, DiscordController.getCreateChannel);
        this.router.post("/:guildId/channels", isAuthorized, DiscordController.createChannel);
        this.router.get("/:guildId/channel/:channelId/modify", isAuthorized, DiscordController.getModifyPage);
        this.router.patch("/:guildId/channel/:channelId", isAuthorized, DiscordController.modifyChannel);
        this.router.delete("/:guildId/channels/:channelId", isAuthorized, DiscordController.deleteChannel);
    }
}

const channelRoutes = new ChannelRoutes();
export default channelRoutes;