import express, { Express } from 'express';
import dotenv from 'dotenv';
import encryptRoutes from '../Routes/encryptRoutes';

dotenv.config();

export const initializeServer = (): Express => {
    const app = express();

    app.set("view engine", "ejs");
    app.set("views", "src/Views");
    app.use(express.json());

    app.use("/", encryptRoutes.router);

    startServer(app);
    return app;
}

const startServer = (server: Express) => {
    server.listen(process.env.PORT, () => {
        console.log(`Server started at port: ${process.env.PORT}`);
    })
}