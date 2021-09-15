import { Request, Response } from 'express';
import { ServerAHandler } from '../Services/ServerAHandlers';
import { loggedIn, loggedOut, users, usersThatBoughtProduct } from '../../pseudoDB/pseudoDB';

export class ServerAController {

    public static async addUser(req: Request<{}, {}, { name: string }>, res: Response) {
        try {
            const { name } = req.body;
            const addedUser = await ServerAHandler.addUser(name);
            console.log("Users: " + JSON.stringify(users));

            return res.status(200).json(addedUser);
        }   
        catch(err) {    
            return res.status(500).json(err.message);
        }
    }

    public static userLoggedIn(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;
            const userLoggedIn = ServerAHandler.userLoggedIn(id);
            console.log(`LoggedIn: ${JSON.stringify(loggedIn)}`);
            return res.status(200).json(userLoggedIn);
        }
        catch(err) {
            return res.status(500).json(err.message);
        }
    }

    public static userLoggedOut(req: Request< { id: string }>, res: Response) {
        try {
            const { id } = req.params;
            const userLoggedOut = ServerAHandler.userLoggedOut(id);
            console.log("LoggedIn: " + JSON.stringify(loggedIn));
            console.log("LoggedOut: " + JSON.stringify(loggedOut));
            return res.status(200).json(userLoggedOut);
        }
        catch(err) {    
            return res.status(500).json(err.message);
        }
    }

    public static userBoughtProduct(req: Request< {id: string }>, res: Response) {
        try {
            const { id } = req.params;
            const userThatBought = ServerAHandler.userBoughtProduct(id);
            console.log("UserThatBought: " + JSON.stringify(usersThatBoughtProduct));
            return res.status(200).json(userThatBought);
        }
        catch(err) {    
            return res.status(500).json(err.message);
        }
    }

    public static deleteUserLoggedIn(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;
            const userToDelete = ServerAHandler.deleteUserLoggedIn(id);
            return res.status(200).json(userToDelete);
        }
        catch(err) {
            return res.status(500).json(err.message);
        }
    }

    public static updateUserProductAmount(req: Request<{ id: string }, {}, { data: number }>, res: Response) {
        try {
            const { id } = req.params;
            const { data } = req.body;

            if(typeof data === 'string') {
                const userWithUpdatedProductAmount = ServerAHandler.updateUserProductAmount(id, parseInt(data));
                console.log("UsersThatBoughtProduct: " + JSON.stringify(usersThatBoughtProduct));
                return res.status(200).json(userWithUpdatedProductAmount);        
            }
            const userWithUpdatedProductAmount = ServerAHandler.updateUserProductAmount(id, data);

            return res.status(200).json(userWithUpdatedProductAmount);
        }
        catch(err) {    
            return res.status(500).json(err.message);
        }
    }
}