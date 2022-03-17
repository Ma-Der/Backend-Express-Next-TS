import { PrismaClient } from "@prisma/client";

const resolvers = {
    Query: {
        etherscanFullData: async (_parent: unknown, args: {numberOfResults?: number}, context: PrismaClient) => {
            const { numberOfResults } = args;
            const fullData = await context.etherscan.findMany({});
            if(numberOfResults) {
                const data = fullData.slice(0, numberOfResults+1);
                return data;
            }

            return fullData;
        },
        etherscanData: async (_parent: unknown, args: {id: number}, context: PrismaClient) => {
            const { id } = args;
            const etherscan = await context.etherscan.findFirst({
                where: {
                    id: id
                }
            });

            return etherscan;
        },
        transactions: async (_parent: unknown, args: {numberOfResults?: number}, context: PrismaClient) => {
            const { numberOfResults } = args;
            const fullData = await context.transactions.findMany({});
            if(numberOfResults) {
                const data = fullData.slice(0, numberOfResults+1);
                return data;
            }
            return fullData;
        },
        transaction: async (_parent: unknown, args: {id: number}, context: PrismaClient) => {
            const { id } = args;
            const transaction = await context.transactions.findFirst({
                where: {
                    id: id
                }
            });

            return transaction;
        }
    },
    EtherscanData: {
        transaction: async (parent: EtherscanData, args: {id: number}, context: PrismaClient) => {
            const { id } = parent;
            const fullData = await context.transactions.findMany({
                where: {
                    etherscanId: id 
                }
            })
            return fullData;
        }
    }
};
type EtherscanData = {
    id: number
    etherPrice: string
    marketCap: string
    difficulty: string
}
export default resolvers;