import { Router } from 'express';
import { DiscordController } from '../Controllers/DiscordController';
import { isAuthorized } from '../Utils/utils';

class MessageRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/:guildId/:channelId/messages", isAuthorized, DiscordController.getChannelMessages);
        this.router.delete("/:guildId/channels/:channelId/:messageId", isAuthorized, DiscordController.deleteMessage);
        this.router.get("/:guildId/:channelId/searchMessage", isAuthorized, DiscordController.getSearchedMessages);
    }
}

const messageRoutes = new MessageRoutes();
export default messageRoutes;