import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";
import typeDefs from "../graphQL/schema";
import resolvers from "../graphQL/resolvers";
import { cronSeedDatabase } from "../cron/cronJobs";

export const initializeServer = () => {
    cronSeedDatabase();
    const client = new PrismaClient();
    const server = new ApolloServer({ typeDefs, resolvers, context: () => {
        return client;
    } });

    server.listen().then(({url}) => {
        console.log(`Project running at: ${url}`);
    });
}