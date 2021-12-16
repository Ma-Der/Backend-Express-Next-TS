import express, { Express } from 'express';
import { port } from './envVar';
import routes from '../Routes/routes';

export const initializeServer = (): Express => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    
    app.use("/", routes.router);

    startServer(app);
    return app;
}

const startServer = (server: Express) => {
    server.listen(port, () => {
        console.log(`Server lift off on port: ${port}`);
    })
}