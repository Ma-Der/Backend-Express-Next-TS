import express, { Express } from 'express';
import { port } from './envVar';
import { connectWithMongoDB } from '../db/Mongo/mongoConnection';
import catRoutes from '../Routes/routes';

export const initializeServer = (): Express => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    
    app.use("/", catRoutes.router);
    connectWithMongoDB();

    startServer(app);
    return app;
}

const startServer = (server: Express) => {
    server.listen(port, () => {
        console.log(`Server lift off on port: ${port}`);
    })
}