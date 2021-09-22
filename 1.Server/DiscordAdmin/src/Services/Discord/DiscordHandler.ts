import axios from 'axios';
import { botToken } from '../../Config/envVariables';
import { IUserGuilds, IBotGuilds, IChannel, IRole, IMessageParams } from '../../Types/types';

export class DiscordHandler {
    public static baseUrl = 'https://discord.com/api';

    public static async getBotGuilds() {
            const botGuilds = await axios.get(`${this.baseUrl}/users/@me/guilds`, {
                headers: {
                    'Authorization': `Bot ${botToken}`
                }
            });
    
            return botGuilds.data;
    }

    public static async getCommonGuilds(userGuilds: IUserGuilds[], botGuilds: IBotGuilds[]) {
        const commonGuilds = userGuilds.filter((guild) => botGuilds.find(botGuild => (botGuild.id === guild.id) && (guild.permissions & 0x20) === 0x20));

        return commonGuilds;
    }

    public static async getGuildChannels(guildId: string) {
            const channels = await axios.get(`${this.baseUrl}/guilds/${guildId}/channels`, {
                headers: {
                    'Authorization': `Bot ${botToken}`
                }
            });

            return channels.data;
    }

    public static async createChannel(guildId: string, channel: IChannel) {

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
            return newChannel.data;
    }

    public static async getModifyChannel(channelId: string, guildId: string) {

        const guildChannels = await this.getGuildChannels(guildId);
        const channel = await guildChannels.find(item => item.id === channelId);

        return channel;
    }

    public static async modifyChannel(channelId: string, channel: IChannel) {
            const arrayOfKeys = await Object.keys(channel);
            const arrayOfValues = await Object.values(channel);
            const arrayOfDefinedValues = await this.isDefined(arrayOfValues);

            const channelObject = await this.combineArraysIntoObject(arrayOfKeys, arrayOfDefinedValues);
            const definedChannelObject = await JSON.parse(JSON.stringify(channelObject));

            const updatedChannel = await axios.patch(`${this.baseUrl}/channels/${channelId}`, definedChannelObject, {
                headers: {
                    'X-Audit-Log-Reason': 'modify channel',
                    'Authorization': `Bot ${botToken}`
                }
            });

            return updatedChannel.data;
    }

    public static async deleteChannel(channelId: string) {
            const deletedChannel = await axios.delete(`${this.baseUrl}/channels/${channelId}`, {
                headers: {
                    'X-Audit-Log-Reason': 'delete channel',
                    'Authorization': `Bot ${botToken}`
                }
            });

            return deletedChannel.data;
    }

    public static async getGuildRoles(guildId: string) {
            const roles = await axios.get(`${this.baseUrl}/guilds/${guildId}/roles`, {
                headers: {
                    'Authorization': `Bot ${botToken}`
                }
            });
            return roles.data;
    }

    public static async createRole(guildId: string, role: IRole) {
            if(!(role.color >= 0 && role.color <= 16777216)) throw new Error("Number is not integer or it's out of range.");

            const createdRole = await axios.post(`${this.baseUrl}/guilds/${guildId}/roles`, role, {
                headers: {
                    'X-Audit-Log-Reason': 'New Role Created',
                    'Authorization': `Bot ${botToken}`
                }
            });
            return createdRole.data;
    }

    public static async getModifyRole(guildId: string, roleId: string) {
        const guildRoles = await this.getGuildRoles(guildId);
        const role = await guildRoles.find(item => item.id === roleId);

        return role;
    }

    public static async modifyRole(guildId: string, roleId: string, role: IRole) {
            const { name, permissions, color, hoist, mentionable } = role;
            if(!(color >= 0 && color <= 16777216)) throw new Error("Number is out of range.");
                    
            const modifiedRole = await axios.patch(`${this.baseUrl}/guilds/${guildId}/roles/${roleId}`, role, {
                headers: {
                    'X-Audit-Log-Reason': 'Role Modified',
                    'Authorization': `Bot ${botToken}`
                }
            });
            return modifiedRole.data;
    }

    public static async deleteRole(guildId: string, roleId: string) {
            const deletedRole = await axios.delete(`${this.baseUrl}/guilds/${guildId}/roles/${roleId}`, {
                headers: {
                    'X-Audit-Log-Reason': 'delete role',
                    'Authorization': `Bot ${botToken}`
                }
            });
            return deletedRole.data;
    }

    public static async getChannelMessages(channelId: string, limit: string) {
            if(limit === null || limit === undefined || limit === '') throw new Error("Limit needs to be positive integer.");

            const limitNumber = parseInt(limit);
            const counterModulo = limitNumber%100;
            const counter = Math.ceil(limitNumber/100);

            if(limitNumber < 0) throw new Error("Message limit needs to be positive number.");

            if(limitNumber === 0) return [];

            if(limitNumber > 100) {
                let channelMessagesArray = [];


                const paramsWithoutBefore: IMessageParams = {
                    "limit": 100
                }

                for(let i=1; i <= counter; i++) {
                    if(i === 1) {
                        const channelMessages = await this.fetchMessages(channelId, paramsWithoutBefore);
                        
                        if((channelMessages).length === 0) return [];

                        channelMessagesArray.push(channelMessages);

                    } else if(i === counter && counterModulo !== 0) {
                        const channelMsgArrFlat = channelMessagesArray.flat();
                        let channelMsgArrayLastElement = channelMsgArrFlat[channelMsgArrFlat.length-1];

                        const paramsWithBefore: IMessageParams = {
                            "before": channelMsgArrayLastElement.id,
                            "limit": counterModulo
                        }

                        const channelMessages = await this.fetchMessages(channelId, paramsWithBefore);
    
                        channelMessagesArray.push(channelMessages);

                    } else {
                        const channelMsgArrFlat = channelMessagesArray.flat();
                        let channelMsgArrayLastElement = channelMsgArrFlat[channelMsgArrFlat.length-1];

                        const paramsWithBefore: IMessageParams = {
                            "before": channelMsgArrayLastElement.id,
                            "limit": 100
                        }

                        const channelMessages = await this.fetchMessages(channelId, paramsWithBefore);
    
                        channelMessagesArray.push(channelMessages);
                    }
                }
                return channelMessagesArray.flat();
            }

            const channelMessages = await this.fetchMessages(channelId, {"limit": limitNumber});

            return channelMessages;
    }

    public static async deleteMessage(channelId: string, messageId: string) {
            const deletedMessage = await axios.delete(`${this.baseUrl}/channels/${channelId}/messages/${messageId}`, {
                headers: {
                    'X-Audit-Log-Reason': 'message deleted',
                    'Authorization': `Bot ${botToken}`
                }
            });
            return deletedMessage.data;
    }

    public static async searchMessages(searchPhrase: string, channelId: string) {
        const allMessages = await this.getAllMessages(channelId);

        if(searchPhrase.length < 2) throw new Error("Searched phrase must have at least 3 digits.");

        const searchedPhraseArray = allMessages.filter(message => (message.content).toLowerCase().includes(searchPhrase.toLowerCase()));

        return searchedPhraseArray;
    }

    private static async fetchMessages(channelId: string, params: IMessageParams) {
        
        const channelMessages = await axios.get(`${this.baseUrl}/channels/${channelId}/messages`, {
            params: params,
            headers: {
                "Authorization": `Bot ${botToken}`
            }
        });
            return channelMessages.data;
    }

    private static async getAllMessages(channelId: string) {
        let messagesArray: any[] = [];
        let counter: number = 1;
        do { 
            
            const messagesFlattenedArray = messagesArray.flat();
            const messagesArrayLastElement = messagesFlattenedArray[messagesFlattenedArray.length - 1];

            const paramsWithoutBefore: IMessageParams = {
                "limit": 100
            }

            if(counter === 1) {
                const channelMessages = await this.fetchMessages(channelId, paramsWithoutBefore);
                if(channelMessages.length === 0) throw new Error("No messages.");
                messagesArray.push(channelMessages);
                
            } else {
                const paramsWithBefore: IMessageParams = {
                    "before": messagesArrayLastElement.id,
                    "limit": 100
                }

                const channelMessages = await this.fetchMessages(channelId, paramsWithBefore);
                messagesArray.push(channelMessages);    
            }

            counter++;

        } while((messagesArray.flat().length % 100) === 0);

        return messagesArray.flat();
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