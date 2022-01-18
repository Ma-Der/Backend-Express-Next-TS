import { PrismaClient } from '@prisma/client';
import { ShopProperty } from '../Types/types';

export class ShopHandler {
    private static prisma = new PrismaClient();

    public static async getShops() {
        const allShops = await this.prisma.shop.findMany();
        
        if(!allShops) throw Error("No shops.");
        return allShops;
    }

    public static async getShop(shopId: number) {
        const shop = await this.prisma.shop.findFirst({
            where: {
                id: shopId
            }
        });
        if(!shop) throw new Error('Searched shop does not exist');

        return shop;
    }

    public static async createShop(name: string, address: string, storeChainId: number) {
        const createdShop = await this.prisma.shop.create({
            data: {
                name: name,
                address: address,
                storeChainId: storeChainId
            }
        });

        if(!createdShop) throw new Error('Something went wrong with creating shop');

        return createdShop;
    }

    public static async changeShopProperty(shopId: number, shopPropertyToChange: ShopProperty, newValue: string | number) {
        const updatedShop = await this.prisma.shop.update({
            where: {
                id: shopId
            },
            data: {
                [shopPropertyToChange]: newValue
            }
        });
        if(!updatedShop) throw new Error("Something went wrong with shop update.");

        return updatedShop;
    }

    public static async deleteShop(shopId: number) {
        const deletedShop = await this.prisma.shop.delete({
            where: {
                id: shopId
            }
        });
        
        return deletedShop;
    }

    public static async addRating(shopId: number, comment: string, rating: number) {
        const newShopRating = await this.prisma.shopValidation.create({
            data: {
                comment,
                rating,
                shopId
            }
        });
        
        const averageRating: number = await this.getShopRatingAvarage(shopId) as number;
        const updatedShop = await this.updateShopAvgRating(shopId, averageRating);

        return newShopRating;
    }

    private static async getShopRatingAvarage(shopId: number) {
        const shopRatingAggregate = await this.prisma.shopValidation.aggregate({
            where: {
                shopId: shopId
            },
            _avg: {
                rating: true
            }
        });

        return shopRatingAggregate._avg.rating;
    }

    private static async updateShopAvgRating(shopId: number, avgRating: number) {
        const shop = await this.prisma.shop.update({
            where: {
                id: shopId
            },
            data: {
                avgRating: avgRating
            }
        });

        return shop;
    }
}