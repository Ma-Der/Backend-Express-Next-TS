import axios from 'axios';
import { botToken } from '../../Config/envVariables';

interface IUserGuilds {
    id: string;
    permissions: number;
}

interface IBotGuilds {
    id: string;
}

export interface IChannel {
    name: string;
    type?: number;
    topic?: string;
    rate_limit_per_user?: number;
    position?: number;
    parent_id?: string;
    permission_overwrites?: Array<unknown>;
    last_message_id?: number;
    guild_id?: string;
    nfsw?: boolean;
}

interface IRole {
    id: string;
    name: string;
    permissions: string;
    color: number;
    hoist: boolean;
    mentionable: boolean;
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

            const arrayOfKeys = await Object.keys(channel);
            const arrayOfValues = await Object.values(channel);
            const arrayOfDefinedValues = await this.isDefined(arrayOfValues);

            const channelObject = await this.combineArraysIntoObject(arrayOfKeys, arrayOfDefinedValues);
            const definedChannelObject = await JSON.parse(JSON.stringify(channelObject));
            
            const newChannel = await axios.post(`${this.baseUrl}/guilds/${guildId}/channels`, definedChannelObject, {
                headers: {
                    'X-Audit-Log-Reason': 'create new channel',
                    'Authorization': `Bot ${botToken}`
                }
            });
            console.log(newChannel)
            return newChannel.data;
        }
        catch(err) {
            return err;
        }
    }

    public static async getModifyChannel(channelId: string, guildId: string) {

        const guildChannels = await this.getGuildChannels(guildId);
        const channel = await guildChannels.find(item => item.id === channelId);

        return channel;
    }

    public static async modifyChannel(channelId: string, channel: IChannel) {
        try {

            const arrayOfKeys = await Object.keys(channel);
            const arrayOfValues = await Object.values(channel);
            const arrayOfDefinedValues = await this.isDefined(arrayOfValues);

            const channelObject = await this.combineArraysIntoObject(arrayOfKeys, arrayOfDefinedValues);
            const definedChannelObject = await JSON.parse(JSON.stringify(channelObject));

            console.log(definedChannelObject)

            const updatedChannel = await axios.patch(`${this.baseUrl}/channels/${channelId}`, definedChannelObject, {
                headers: {
                    'X-Audit-Log-Reason': 'modify channel',
                    'Authorization': `Bot ${botToken}`
                }
            });

            return updatedChannel.data;
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

    public static async createRole(guildId: string, role: IRole) {
        try {
            if(!(role.color >= 0 && role.color <= 16777216)) throw new Error("Number is not integer or it's out of range.");


            const createdRole = await axios.post(`${this.baseUrl}/guilds/${guildId}/roles`, role, {
                headers: {
                    'X-Audit-Log-Reason': 'New Role Created',
                    'Authorization': `Bot ${botToken}`
                }
            });
             console.log(createdRole)
            return createdRole.data;
        }
        catch(err) {
            console.log(err)
            return err;
        }
    }

    public static async getModifyRole(guildId: string, roleId: string) {
        const guildRoles = await this.getGuildRoles(guildId);
        const role = await guildRoles.find(item => item.id === roleId);

        return role;
    }

    public static async modifyRole(guildId: string, roleId: string, role: IRole) {
        try {
            const { name, permissions, color, hoist, mentionable } = role;
            if(!(color >= 0 && color <= 16777216)) throw new Error("Number is out of range.");
                    
            const modifiedRole = await axios.patch(`${this.baseUrl}/guilds/${guildId}/roles/${roleId}`, role, {
                headers: {
                    'X-Audit-Log-Reason': 'Role Modified',
                    'Authorization': `Bot ${botToken}`
                }
            });
            console.log(modifiedRole);
            return modifiedRole.data;
        }
        catch(err) {
            console.log(err)
            return err;
        }
        

    }

    public static async deleteRole(guildId: string, roleId: string) {
        try {
            const deletedRole = await axios.delete(`${this.baseUrl}/guilds/${guildId}/roles/${roleId}`, {
                headers: {
                    'X-Audit-Log-Reason': 'delete role',
                    'Authorization': `Bot ${botToken}`
                }
            });
            return deletedRole.data;
        }
        catch(err) {
            console.log(err);
            return err;
        }
    }

    public static async getChannelMessages(channelId: string, limit: number) {
        try {
            const channelMessages = await axios.get(`${this.baseUrl}/channels/${channelId}/messages`, {
                params: {
                    limit: limit
                },
                headers: {
                    "Authorization": `Bot ${botToken}`
                }
            });
            console.log(channelMessages)
            return channelMessages.data;
        }
        catch(err) {
            console.log(err);
            return err;
        }
    }

    public static async deleteMessage(channelId: string, messageId: string) {
        try {
            const deletedMessage = await axios.delete(`${this.baseUrl}/channels/${channelId}/messages/${messageId}`, {
                headers: {
                    'X-Audit-Log-Reason': 'message deleted',
                    'Authorization': `Bot ${botToken}`
                }
            });
            return deletedMessage.data;
        }
        catch(err) {
            console.log(err);
            return err;
        }
    }

    private static isDefined(arr: string[]) {
        let arrayOfDefined: unknown[] = [];
        arr.forEach(item => {
            if(item) { 
                if(!isNaN(parseInt(item))) { 
                    arrayOfDefined.push(parseInt(item)); 
                } else {
                    arrayOfDefined.push(item); 
                }
            } else arrayOfDefined.push(undefined);
        })

        return arrayOfDefined;
    }
    
    private static combineArraysIntoObject<T, U>(arr1: T[], arr2: U[]) {
        let object={};

            for(let j=0; j < arr1.length; j++) {
                object[arr1[j]] = arr2[j];
            }
            return object;
    }
}