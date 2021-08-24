import axios from 'axios';
import { botToken } from '../../Config/envVariables';

interface IUserGuilds {
    id: string;
    permissions: number;
}

interface IBotGuilds {
    id: string;
}

export class DiscordHandler {
    public static baseUrl = 'https://discord.com/api';

    public static async getBotGuilds() {
        try {
            const botGuilds = await axios.get(`${this.baseUrl}/users/@me/guilds`, {
                headers: {
                    'Authorization': `Bot ${botToken}`
                }
            });
    
            return botGuilds.data;
        }
        catch(err) {
            return err;
        }
    }

    public static async getCommonGuilds(userGuilds: IUserGuilds[], botGuilds: IBotGuilds[]) {
        const commonGuilds = userGuilds.filter((guild) => botGuilds.find(botGuild => (botGuild.id === guild.id) && (guild.permissions & 0x20) === 0x20));

        return commonGuilds;
    }

    public static async getGuildChannels(guildId: string) {
        try {
            const channels = await axios.get(`${this.baseUrl}/guilds/${guildId}/channels`, {
                headers: {
                    'Authorization': `Bot ${botToken}`
                }
            });
            return channels.data;
        }
        catch(err) {
            return err;
        }
    }

    public static async getGuildRoles(guildId: string) {
        try {
            const roles = await axios.get(`${this.baseUrl}/guilds/${guildId}/roles`, {
                headers: {
                    'Authorization': `Bot ${botToken}`
                }
            });
            return roles.data;
        }
        catch(err) {
            return err;
        }
    }
}