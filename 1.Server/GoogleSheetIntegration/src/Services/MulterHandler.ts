import { Request } from 'express';
import multer from 'multer';
import * as path from 'path';

const multerUploadsPath = path.join(path.resolve() + "/uploads");

const Storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, multerUploadsPath)
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, file.fieldname + "_" + file.originalname)
    }
})

export const uploadMulter = multer({ storage: Storage });