import { Request, Response } from 'express';
import { NodemailerHandler } from '../Services/NodemailerHandler';

export class NodemailerController {
    public static sendMail(req: Request, res: Response) {
        try {
            NodemailerHandler.send();
            return res.status(200).json('sending');
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }
}