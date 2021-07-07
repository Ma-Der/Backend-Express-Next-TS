import { Request, Response } from 'express';
import { ServerAHandler } from '../Services/ServerAHandlers';


export class ServerAController {

    public static addUser(req: Request, res: Response) {
        try {
            const { name } = req.params;
            const addedUser = ServerAHandler.addUser(name);

            return res.status(200).json(addedUser);
        }   
        catch(err) {    
            return res.status(500).json(err.message);
        }
    }

    public static userLoggedIn(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userLoggedIn = ServerAHandler.userLoggedIn(id);
    
            return res.status(200).json(userLoggedIn);
        }
        catch(err) {
            return res.status(500).json(err.message);
        }
    }

    public static userLoggedOut(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userLoggedOut = ServerAHandler.userLoggedOut(id);

            return res.status(200).json(userLoggedOut);
        }
        catch(err) {    
            return res.status(500).json(err.message);
        }
    }

    public static userBoughtProduct(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const userThatBought = ServerAHandler.userBoughtProduct(id);

            return res.status(200).json(userThatBought);
        }
        catch(err) {    
            return res.status(500).json(err.message);
        }
    }

    public static deleteUserLoggedIn(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const userToDelete = ServerAHandler.deleteUserLoggedIn(id);
            return res.status(200).json(userToDelete);
        }
        catch(err) {
            return res.status(500).json(err.message);
        }
    }

    public static updateUserProductAmount(req: Request, res: Response) {
        try {
            const { id, productAmount } = req.body;
            const userWithUpdatedProductAmount = ServerAHandler.updateUserProductAmount(id, productAmount);

            return res.status(200).json(userWithUpdatedProductAmount);
        }
        catch(err) {    
            return res.status(500).json(err.message);
        }
    }
}