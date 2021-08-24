import { Request, Response } from "express";
import { UserHandler } from '../Services/User/UserHandler';
import { DiscordHandler } from '../Services/Discord/DiscordHandler'; 

export class UserController {
    public static userLogin(req: Request, res: Response) {
        try {
            return res.render("index");
            
        }
        catch(err) {
            const failure = err.message;
            return res.render("failure", failure);
        }
    }
    public static async loggedIn(req: Request, res: Response) {
        try {
            const userId = req.user?.discordId;

            if(!userId) throw new Error("No user found with this discord id.");
            
            const userGuilds = await UserHandler.getUserGuilds(userId);
            const botGuilds = await DiscordHandler.getBotGuilds();

            const commonGuilds = await DiscordHandler.getCommonGuilds(userGuilds, botGuilds);

             
            return res.render("main", {guilds: userGuilds, commonGuilds: commonGuilds});
        }
        catch(err) {
            const failure = err.message;
            return res.render("failure", failure);
        }
    }
}