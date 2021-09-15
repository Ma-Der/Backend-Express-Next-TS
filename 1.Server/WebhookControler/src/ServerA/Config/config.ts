import express, {Express} from 'express';
import serverARoutes from '../Routes/serverARoutes';

const portA = 80;
export const initializeServerA = (): Express => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use("/", serverARoutes.router);
    
    
    startServer(app);
    return app;
}

const startServer = (server: Express) => {
    server.listen(portA, () => {
        console.log(`Server A started at ${portA}.`);
    });
}