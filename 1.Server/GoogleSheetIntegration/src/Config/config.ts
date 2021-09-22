import express, { Express } from 'express';
import googleRoutes from '../Routes/routes';
import path from 'path';
import { port } from './envVariables';

export const initializeServer = (): Express => {
    const app = express();

    app.set("view engine", "ejs");
    app.set("views", "src/views");
    
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    
    app.use(express.static(path.resolve() + '/src/public'));

    app.use("/", googleRoutes.router);

    startServer(app);
    return app;
}

const startServer = (server: Express) => {
    server.listen(port, () => {
        console.log(`Listening on port ${port}`)
    });
}