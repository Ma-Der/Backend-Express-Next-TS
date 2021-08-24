import User from '../MongoDB/userModel';
export class UserHandler {

    public static async getUserGuilds(userId: string) {
        const user = await User.findOne({discordId: userId});
        if(!user) throw new Error("User not found in database.");
        const userGuilds = user.guilds;

        return userGuilds;
    }

    public static async getUserGuild(userId: string, guildId: string) {
        try {
            const userGuilds = await this.getUserGuilds(userId);
            const guild = userGuilds.find((item) => item.id === guildId);

            return guild;
        }
        catch(err) {
            return err;
        }
    }
}