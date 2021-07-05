import { Request, Response } from 'express';
import { UserLocal } from '../db/UserModel';


export class AuthController {
    public static localRedirect(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            return res.redirect('logged');
        }
        catch(err) {
            return res.send(err.message)
        }
    }

    public static async registerUser(req: Request, res: Response) {
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
}