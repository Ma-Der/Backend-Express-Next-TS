import { PrismaClient } from '@prisma/client';
import { ProductProperty } from '../Types/types';

export class ProductHandler {
    private static prisma = new PrismaClient();

    public static async getProducts() {
        const products = await this.prisma.product.findMany();
        if(!products) throw new Error("No products founded.");
        
        return products;
    }

    public static async getProduct(productId: number) {
        const product = await this.prisma.product.findFirst({
            where: {
                id: productId
            }
        });
        if(!product) throw new Error("No product with this id.");

        return product;
    }

    public static async createProduct(name: string, price: number, amount: number, opinion: string, categoryId: number) {
        const newProduct = await this.prisma.product.create({
            data: {
                name,
                price,
                amount,
                opinion,
                categoryId
            }
        });

        if(!newProduct) throw new Error("Something went wrong with creating new product.");
        return newProduct;
    }

    public static async changeProductProperty(productId: number, propertyToChange: ProductProperty, newPropertyValue: string | number) {
        const updatedProduct = await this.prisma.product.update({
            where: {
                id: productId
            },
            data: {
                [propertyToChange]: newPropertyValue
            }
        });
        if(!updatedProduct) throw new Error("Something went wrong with product update.");

        return updatedProduct;
    }

    public static async deleteProduct(productId: number) {
        const deletedProduct = await this.prisma.product.delete({
            where: {
                id: productId
            }
        });
        return deletedProduct;
    }
}