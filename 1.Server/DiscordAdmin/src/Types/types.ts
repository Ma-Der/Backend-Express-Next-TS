export interface IUserGuilds {
    id: string;
    permissions: number;
}

export interface IBotGuilds {
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

export interface IRole {
    id: string;
    name: string;
    permissions: string;
    color: number;
    hoist: boolean;
    mentionable: boolean;
}

export interface IMessageParams {
    limit: number;
    before?: string;
    after?: string;
    around?: string;
}

export interface IMessage {
    id: string;
    content: string;
}