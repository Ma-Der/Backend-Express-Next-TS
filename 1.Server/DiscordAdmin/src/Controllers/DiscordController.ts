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
            return res.render("failure", { failure: err.message });
        }
    }

    public static async getGuildChannels(req: Request<{guildId: string}>, res: Response) {
        try {            
            const { guildId } = req.params;

            const channels = await DiscordHandler.getGuildChannels(guildId);

            return res.status(200).json(channels);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static async getCreateChannel(req: Request<{guildId: string}>, res: Response) {
        try {
            const { guildId } = req.params;

            return res.render("create-channel", { guildId: guildId });
        }
        catch(err) {
            return res.render("failure", { failure: err.message });
        }
    }

    public static async createChannel(req: Request<{guildId: string}, {}, { name: string, type?: number, topic?: string, rate_limit_per_user?: number, position?: number, parent_id?: string}>, res: Response) {
        try {
            const { guildId } = req.params;

            const newChannel = await DiscordHandler.createChannel(guildId, req.body);

            return res.render("channel-created", {guildId: guildId});
        }
        catch(err) {
            return res.render("failure", { failure: err.message });
        }
    }

    public static async getModifyPage(req: Request<{guildId: string, channelId: string}>, res: Response) {
        try {
            const { guildId, channelId } = req.params;

            const channel = await DiscordHandler.getModifyChannel(channelId, guildId);

            return res.render("modify-channel", {channel: channel, guildId: guildId});
        }
        catch(err) {
            return res.render("failure", {failure: err.message});
        }
    }

    public static async modifyChannel(req: Request<{guildId: string, channelId: string}, {}, {name: string, position?: number, parent_id?: string, topic?: string, permission_overwrites?: Array<unknown>, nsfw?: boolean, rate_limit_per_user?: number}>, res: Response) {
        try {
            const { guildId, channelId } = req.params;
            const updatedChannel = await DiscordHandler.modifyChannel(channelId, req.body);

            return res.redirect(`/dashboard/${guildId}/guild-menu`);
        }
        catch(err) {
            return res.render("failure", { failure: err.message });
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
            return res.render("failure", { failure: err.message });
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
}