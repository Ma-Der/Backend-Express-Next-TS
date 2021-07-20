import express, { Express } from 'express';
import dotenv from 'dotenv';
import cronRoutes from '../Routes/routes';

dotenv.config();

export const initializeServer = (): Express => {
    const app = express();

    app.set('view engine', 'ejs');
    app.set('views', 'src/Views');

    app.use(express.json());

    app.use('/', cronRoutes.router);

    startServer(app);
    return app;
}

const startServer = (server: Express) => {
    server.listen(process.env.PORT, () => {
        console.log(`Server started at port: ${process.env.PORT}`);
    })
}