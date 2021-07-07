import express, {Express} from 'express';
import webhookRoutes from '../Routes/webhookRoutes';

export const initializeServerB = (): Express => {
    const app = express();

    app.use(express.json());
    app.use("/", webhookRoutes.router);

    return app;
}