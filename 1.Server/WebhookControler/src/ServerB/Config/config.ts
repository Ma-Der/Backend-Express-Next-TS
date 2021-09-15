import express, {Express} from 'express';
import webhookRoutes from '../Routes/webhookRoutes';

const portB = 3000;

export const initializeServerB = (): Express => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    
    app.use("/", webhookRoutes.router);
    
    startServer(app);
    return app;
}

const startServer = (server: Express) => {
    server.listen(portB, () => {
        console.log(`Server B started at ${portB}.`);
    });
}