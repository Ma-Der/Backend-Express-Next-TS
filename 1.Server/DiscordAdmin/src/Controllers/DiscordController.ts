import { Request, Response } from 'express';
import { DiscordHandler } from '../Services/Discord/DiscordHandler';
import { inviteURL } from '../Config/envVariables';
import { IChannel } from '../Services/Discord/DiscordHandler';

export class DiscordController {

    public static inviteBot(req: Request, res: Response) {
        return res.redirect(inviteURL);
    }

    public static async getGuild(req: Request<{guildId: string}>, res: Response) {
        try {
            const { guildId } = req.params;
            const channels = await DiscordHandler.getGuildChannels(guildId);
            const roles = await DiscordHandler.getGuildRoles(guildId);

            return res.render("guild", { channels: channels, roles: roles, guildId: guildId });
        }
        catch(err) {
            return res.render("failure", { failure: err });
        }
    }

    public static async getGuildChannels(req: Request<{guildId: string}>, res: Response) {
        try {            
            const { guildId } = req.params;

            const channels = await DiscordHandler.getGuildChannels(guildId);

            return res.status(200).json(channels);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }

    public static async getCreateChannel(req: Request<{guildId: string}>, res: Response) {
        try {
            const { guildId } = req.params;

            return res.render("create-channel", { guildId: guildId });
        }
        catch(err) {
            return res.render("failure", { failure: err });
        }
    }

    public static async createChannel(req: Request<{guildId: string}, {}, { name: string, type?: number, topic?: string, rate_limit_per_user?: number, position?: number, parent_id?: string}>, res: Response) {
        try {
            const { guildId } = req.params;

            const newChannel = await DiscordHandler.createChannel(guildId, req.body);

            return res.render("channel-created", {guildId: guildId});
        }
        catch(err) {
            return res.render("failure", { failure: err });
        }
    }

    public static async getModifyPage(req: Request<{guildId: string, channelId: string}>, res: Response) {
        try {
            const { guildId, channelId } = req.params;

            const channel = await DiscordHandler.getModifyChannel(channelId, guildId);

            return res.render("modify-channel", {channel: channel, guildId: guildId});
        }
        catch(err) {
            return res.render("failure", {failure: err});
        }
    }

    public static async modifyChannel(req: Request<{guildId: string, channelId: string}, {}, {name: string, position?: number, parent_id?: string, topic?: string, permission_overwrites?: Array<unknown>, nsfw?: boolean, rate_limit_per_user?: number}>, res: Response) {
        try {
            const { guildId, channelId } = req.params;
            const updatedChannel = await DiscordHandler.modifyChannel(channelId, req.body);

            return res.redirect(`/dashboard/${guildId}/guild-menu`);
        }
        catch(err) {
            return res.render("failure", { failure: err });
        }
    }

    public static async deleteChannel(req: Request<{guildId: string, channelId: string}>, res: Response) {
        try {
            const { guildId, channelId } = req.params;

            const deletedChannel = await DiscordHandler.deleteChannel(channelId);

            console.log(deletedChannel);
            return res.redirect(`/dashboard/${guildId}/guild-menu`);
        }   
        catch(err) {
            return res.render("failure", { failure: err });
        }
    }



    public static async getGuildRoles(req: Request<{guildId: string}>, res: Response) {
        try {
            const { guildId } = req.params;

            const roles = await DiscordHandler.getGuildRoles(guildId);

            return res.status(200).json(roles);
        }
        catch(err) {    
            return res.status(400).json(err);
        }
    }

    public static async getCreateRolePage(req: Request<{guildId: string}>, res: Response) {
        try {
            const { guildId } = req.params;

            return res.render("create-role", { guildId: guildId });
        }
        catch(err) {
            return res.render("failure", { failure: err });
        }
    }

    public static async createRole(req: Request<{guildId: string}, {}, {id: string, name: string, permissions: string, color: number, hoist: boolean, mentionable: boolean}>, res: Response) {
        try {
            const { guildId } = req.params;
            const createdRole = await DiscordHandler.createRole(guildId, req.body);
         
            return res.redirect(`back`);
        }
        catch(err) {
            return res.render("failure", {failure: err});
        }
    }

    public static async getModifyRolePage(req: Request<{guildId: string, roleId: string}>, res: Response) {
        try {
            const { guildId, roleId } = req.params;

            const modifiedRole = await DiscordHandler.getModifyRole(guildId, roleId);

            return res.render("modify-role", {role: modifiedRole, guildId: guildId});
        }
        catch(err) {
            return res.render("failure", {failure: err});
        }
    }

    public static async modifyRole(req: Request<{guildId: string, roleId: string}, {}, {id: string, name: string, permissions: string, color: number, hoist: boolean, mentionable: boolean}>, res: Response) {
        try {
            const { guildId, roleId } = req.params;
            
            const modifiedRole = await DiscordHandler.modifyRole(guildId, roleId, req.body);
            
            return res.redirect(`back`);
        }
        catch(err) {
            return res.render("failure", {failure: err});
        }
    }

    public static async deleteRole(req: Request<{guildId: string, roleId: string}>, res: Response) {
        try {
            const { guildId, roleId } = req.params;
         
            const deletedRole = await DiscordHandler.deleteRole(guildId, roleId);
            console.log(deletedRole);
         
            return res.redirect(`/dashboard/${guildId}/guild-menu`);
        }
        catch(err) {
            return res.render("failure", {failure: err});
        }
    }

    public static async getChannelMessages(req: Request<{ guildId: string, channelId: string }, {}, {}, { limit: number }>, res: Response) {
        try {
            const { guildId, channelId } = req.params;
            const { limit } = req.query;
            console.log(limit)

            const channelMessages = await DiscordHandler.getChannelMessages(channelId, limit);

            return res.render("show-messages", { messages: channelMessages, guildId: guildId, channelId: channelId });
        }
        catch(err) {
            return res.render("failure", {failure: err});
        }
    }

    public static async deleteMessage(req: Request<{ channelId: string, messageId: string }>, res: Response) {
        try {
            const { channelId, messageId } = req.params;

            const deletedMessage = await DiscordHandler.deleteMessage(channelId, messageId);

            return res.redirect('back');
        }
        catch(err) {
            return res.render("failure", {failure: err});
        }
    }
}