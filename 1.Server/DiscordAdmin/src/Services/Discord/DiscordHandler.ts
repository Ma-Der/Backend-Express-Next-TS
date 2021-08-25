import axios from 'axios';
import { botToken } from '../../Config/envVariables';

interface IUserGuilds {
    id: string;
    permissions: number;
}

interface IBotGuilds {
    id: string;
}

type ChannelType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 10 | 11 | 12 | 13;
type NSFW = 0 | 1;

interface IChannel {
    name: string;
    type?: ChannelType;
    topic?: string;
    bitrate?: number;
    user_limit?: number;
    rate_limit_per_user?: number;
    position?: number;
    parent_id?: string;
    nsfw?: NSFW;
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

    public static async createChannel(guildId: string, channel: IChannel) {
        try {
            const { name, type, topic, bitrate, user_limit, rate_limit_per_user, position, parent_id, nsfw } = channel;

            const newChannel = await axios.post(`${this.baseUrl}/guilds/${guildId}/channels`, {
                headers: {
                    'X-Audit-Log-Reason': 'create new channel',
                    'Authorization': `Bot ${botToken}`
                }
            });

            return newChannel.data;
        }
        catch(err) {
            return err;
        }
    }

    public static async deleteChannel(channelId: string) {
        try {
            const deletedChannel = await axios.delete(`${this.baseUrl}/channels/${channelId}`, {
                headers: {
                    'X-Audit-Log-Reason': 'delete channel',
                    'Authorization': `Bot ${botToken}`
                }
            });

            return deletedChannel.data;
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