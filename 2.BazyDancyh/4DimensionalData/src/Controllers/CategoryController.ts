import { Request, Response } from 'express';
import { CategoryHandler } from '../Handlers/CategoryHandler';

export class CategoryController {
    public static async getCategories(req: Request, res: Response) {
        try {

        }
        catch(err) {
            return res.status(404).json(err.message);
        }
    }

    public static async getCategory(req: Request, res: Response) {
        try {

        }
        catch(err) {
            return res.status(404).json(err.message);
        }
    }

    public static async createCategory(req: Request, res: Response) {
        try {

        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static async changeCategoryProperty(req: Request, res: Response) {
        try {

        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static async deleteCategory(req: Request, res: Response) {
        try {

        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }
}