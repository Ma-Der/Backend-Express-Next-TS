import { PrismaClient } from '@prisma/client';
import { StoreChainProperty } from '../Types/types';

export class StoresChainHandler {
    private static prisma = new PrismaClient();

    public static async getStoreChains() {
        const storeChains = await this.prisma.storeChain.findMany();

        return storeChains;
    }

    public static async getStoreChain(id: number) {
        
        const storeChain = await this.prisma.storeChain.findFirst({
            where: { id: id}
        });

        if(!storeChain) throw new Error('No Store Chain with this id.');
        return storeChain;
    }

    public static async createStoreChain(chainName: string, owner: string) {
        const newStoreChain = await this.prisma.storeChain.create({
            data: {
                name: chainName,
                owner: owner
            }
        });

        if(!newStoreChain) throw new Error('Something went wrong with creating new store chain.');
        return newStoreChain;
    }

    public static async changeStoreChainProperty(storeChainId: number, propertyToChange: StoreChainProperty, newValue: string) {
        const updateStoreChain = await this.prisma.storeChain.update({
            where: {
                id: storeChainId
            },
            data: {
                [propertyToChange]: newValue
            }
        });

        if(!updateStoreChain) throw new Error('Something went wrong with update.');

        return updateStoreChain;
    }

    public static async deleteStoreChain(storeChainId: number) {
        const deleteStoreChain = await this.prisma.storeChain.delete({
            where: {
                id: storeChainId
            }
        });
        
        return deleteStoreChain;
    }
}