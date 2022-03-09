import express, { Express } from 'express';
import resolvers from '../GraphQL/resolvers';
import graphql, { buildSchema, GraphQLSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;

const schema = buildSchema(`
    type Query {
        message: String
    }
`);

export const initializeServer = (): Express => {
    const app = express();
    
    app.use("/graphql", graphqlHTTP({
        schema,
        rootValue: resolvers,
        graphiql: true
    }))

    startServer(app);
    return app;
}

const startServer = (server: Express) => {
    server.listen(port, () => {
        console.log(`Server started on port: ${port}`);
    })
}

