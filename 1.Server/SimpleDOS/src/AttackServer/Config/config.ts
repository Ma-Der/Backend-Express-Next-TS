import express, { Express } from 'express';
import attackRoutes from '../Routes/routes';
import dotenv from 'dotenv';

dotenv.config();

export const initializeAttackServer = (): Express => {
    const app = express();

    app.use(express.json());

    app.use("/", attackRoutes.router);

    startServer(app);
    return app;
}

const startServer = (server: Express) => {
    server.listen(process.env.PORT_ATTACK, () => {
        console.log(`Server attacker on ${process.env.PORT_ATTACK}`);
    });
}