import express, {Express} from 'express';
import serverARoutes from '../Routes/serverARoutes';

export const initializeServerA = (): Express => {
    const app = express();

    app.use(express.json());
    app.use("/", serverARoutes.router);
    
    return app;
}