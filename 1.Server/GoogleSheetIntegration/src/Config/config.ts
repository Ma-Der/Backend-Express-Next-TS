import express, { Express } from 'express';
import googleRoutes from '../Routes/routes';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const initializeServer = (): Express => {
    const app = express();

    const port = process.env.PORT;

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
    server.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`)
    });
}