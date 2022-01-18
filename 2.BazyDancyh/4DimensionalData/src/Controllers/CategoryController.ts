import { Request, Response } from 'express';
import { CategoryHandler } from '../Handlers/CategoryHandler';
import { idSchema, categorySchema, categoryPropertyValueStringSchema, categoryPropertyValueNumberSchema, categoryPropertySchema } from '../Validation/validationSchema';
import { CategoryProperty, ICategory } from '../Types/types';

export class CategoryController {
    public static async getCategories(req: Request, res: Response) {
        try {
            const categories = await CategoryHandler.getCategories();
            if(!categories) throw new Error("No categories.");

            return res.status(200).json(categories);
        }
        catch(err: any) {
            return res.status(404).json(err.message);
        }
    }

    public static async getCategory(req: Request<{id: number}>, res: Response) {
        try {
            const validationResult = await idSchema.validateAsync(req.params);
            console.log(validationResult);

            const { id } = req.params;

            const category = await CategoryHandler.getCategory(id);

            return res.status(200).json(category);
        }
        catch(err: any) {
            return res.status(404).json(err.message);
        }
    }

    public static async createCategory(req: Request<{}, {}, {categoryData: ICategory}>, res: Response) {
        try {
            const validationResult = await categorySchema.validateAsync(req.body.categoryData);
            console.log(validationResult);

            const { name, shopId } = req.body.categoryData;

            const newCategory = await CategoryHandler.createCategory(name, shopId);

            return res.status(201).json(newCategory);
        }
        catch(err: any) {
            return res.status(400).json(err.message);
        }
    }

    public static async changeCategoryProperty(req: Request<{id: number}, {}, {categoryProperty: CategoryProperty, newPropertyValue: string | number}>, res: Response) {
        try {
            const validationIdResult = await idSchema.validateAsync(req.params);
            const validationCategoryPropertyResult = await categoryPropertySchema.validateAsync(req.body.categoryProperty);

            const { id } = req.params;
            const { categoryProperty, newPropertyValue } = req.body;

            const value = typeof newPropertyValue;
            switch(value) {
                case 'string':
                    await categoryPropertyValueStringSchema.validateAsync(req.body.newPropertyValue);
                    break;
                case 'number':
                    await categoryPropertyValueNumberSchema.validateAsync(req.body.newPropertyValue);
                    break;
                default:
                    throw new Error('newPropertyValue is either string or number.');
            }
            const updatedCategory = await CategoryHandler.changeCategoryProperty(id, categoryProperty, newPropertyValue);

            return res.status(200).json(updatedCategory);
        }
        catch(err: any) {
            return res.status(400).json(err.message);
        }
    }

    public static async deleteCategory(req: Request<{id: number}>, res: Response) {
        try {
            const validationIdResult = await idSchema.validateAsync(req.params);
            const { id } = req.params;

            const deletedCategory = await CategoryHandler.deleteCategory(id);

            return res.status(204).json(deletedCategory);
        }
        catch(err: any) {
            return res.status(400).json(err.message);
        }
    }
}