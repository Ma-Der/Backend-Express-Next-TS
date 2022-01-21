import express, { Express } from 'express';
import { port } from './envVar';
import heartRoutes from '../Routes/router';

export const initializeServer = (): Express => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use("/", heartRoutes.router);
    startServer(app);
    return app;
}

const startServer = (app: Express) => {
    app.listen(port, () => {
        console.log(`Server started on port: ${port}`);
    })
}