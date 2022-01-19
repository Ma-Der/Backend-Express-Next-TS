import express, { Express } from 'express';
import dotenv from 'dotenv';
import { connectWithMongoDB } from '../Models/db/mongoConnection';
import cartRoutes from '../Routes/cartRoutes';
import productRoutes from '../Routes/productRoutes';
import discountRoutes from '../Routes/discountRoutes';
import userRoutes from '../Routes/userRoutes';

dotenv.config();

export const initializeServer = (): Express => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use("/cart", cartRoutes.router);
    
    app.use("/discount", discountRoutes.router);
    app.use("/user", userRoutes.router);
    app.use("/product", productRoutes.router);


    connectWithMongoDB();
    startServer(app);
    return app;
}

const startServer = (server: Express): void => {
    server.listen(process.env.PORT, () => {
        console.log(`Listening on port: ${process.env.PORT}`);
    });
}