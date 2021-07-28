import { Request, Response } from 'express';
import { ImageHandler } from '../Handlers/ImageHandler';

export class ImageController {
    public static getFirstImage(req: Request, res: Response) {
        res.sendFile(ImageHandler.getFirstImage());
    }

    public static getSecondImage(req: Request, res: Response) {
        res.sendFile(ImageHandler.getSecondImage());
    }
}