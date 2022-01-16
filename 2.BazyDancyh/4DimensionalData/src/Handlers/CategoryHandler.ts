import { PrismaClient } from "@prisma/client";
import { CategoryProperty } from '../Types/types';

export class CategoryHandler {
    private static prisma = new PrismaClient();

    public static async getCategories() {
        const allCategories = await this.prisma.category.findMany();
        if(!allCategories) throw new Error("No categories");

        return allCategories;
    }

    public static async getCategory(categoryId: number) {
        const category = await this.prisma.category.findFirst({
            where: {
                id: categoryId
            }
        });

        if(!category) throw new Error("No category with this id.");
        return category;
    }

    public static async createCategory(name: string, shopId: number) {
        const newCategory = await this.prisma.category.create({
            data: {
                name: name,
                shopId: shopId
            }
        });
        if(!newCategory) throw new Error("Something went wrong with creating new category.");

        return newCategory;
    }

    public static async changeCategoryProperty(categoryId: number, categoryProperty: CategoryProperty, newPropertyValue: string | number) {
        const updatedCategory = await this.prisma.category.update({
            where: {
                id: categoryId
            },
            data: {
                [categoryProperty]: newPropertyValue
            }
        });

        if(!updatedCategory) throw new Error("Could not update category.");

        return updatedCategory;
    }

    public static async deleteCategory(categoryId: number) {
        const deletedCategory = await this.prisma.category.delete({
            where: {
                id: categoryId
            }
        });

        return deletedCategory;
    }
}