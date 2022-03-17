import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import typeDefs from '../schema/schema';
import resolvers from '../schema/resolvers';
import dotenv from 'dotenv';
dotenv.config();

export const initializeServer = () => {
    const client = new PrismaClient();
    const server = new ApolloServer({ typeDefs, resolvers, context: () => {
        return client;
    } });

    server.listen().then(({url}) => {
        console.log(`Project running at: ${url}`);
    });
}



