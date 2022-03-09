import express, { Express } from 'express';
import graphqlSchema from '../GraphQL/schema';
import { graphqlHTTP } from 'express-graphql';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;


export const initializeServer = (): Express => {
    const app = express();
    
    app.use("/graphql", graphqlHTTP({
        schema: graphqlSchema,
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

