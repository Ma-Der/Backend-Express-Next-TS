import express, { Express } from 'express';
import { port } from './envVar';
import bearerRoutes from '../Routes/Router';
import userRoutes from '../Routes/UserRouter';
import { connectWithMongoDB } from '../db/mongoConnection';
import { authenticateToken } from '../Services/Middleware/authentication';

export const initializeServer = (): Express => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use("/", bearerRoutes.router);
    app.use("/user", userRoutes.router);

    app.get("/", authenticateToken, (req, res) => {
        res.send('Secret stuff.')
    });
    
    connectWithMongoDB();
    startServer(app);
    return app;
}

const startServer = (app: Express) => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })
}