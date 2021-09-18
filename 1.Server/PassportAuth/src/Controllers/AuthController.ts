import { Request, Response } from 'express';
import { UserLocal } from '../db/UserModel';


export class AuthController {

    public static async registerUser(req: Request<{}, {}, { email: string, password: string }>, res: Response) {
        
        const { email, password } = req.body;

        try {
            const user = await UserLocal.findOne({email});

            if(user) return res.json(`${user.email} already exists in database.`);
            
            const userToCreate = {
                email,
                password: password
            };

            const newUser = new UserLocal(userToCreate);

            const result = await newUser.save();

            return res.status(200).json({ message: "User created." });
        }
        catch(err) {
            return res.status(500).json(err.message);
        }
    }

    public static async logout(req: Request, res: Response) {
        try {
            req.logout();

            return res.redirect("/");
        }
        catch(err) {
            return res.render("failure");
        }
    }

    public static failure(req: Request, res: Response) {
        return res.status(403).render("failure");
    }
}