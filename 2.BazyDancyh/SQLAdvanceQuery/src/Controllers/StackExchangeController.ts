import { Request, Response } from 'express';
import { StackExchangeHandler } from "../Handlers/StackExchangeHandler";

export class StackExchangeController {
    public static async getUsersFromEurope(req: Request, res: Response) {
        try {
            const users = await StackExchangeHandler.getUsersFromEurope();

            return res.status(200).json(users);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }

    public static async getCountryByUsersReputationBy(req: Request, res: Response) {
        try {
            const countryByUsers = await StackExchangeHandler.getCountryByUsersReputationBy();

            return res.status(200).json(countryByUsers);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }

    public static async getBestUserForEachCountry(req: Request, res: Response) {
        try {
            const bestUser = await StackExchangeHandler.getBestUserForEachCountry();

            return res.status(200).json(bestUser);
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }
}