import express, { Express } from 'express';
import dotenv from 'dotenv';
import cartRoutes from '../Routes/cartRoutes';
import productRoutes from '../Routes/productRoutes';
import discountRoutes from '../Routes/discountRoutes';

dotenv.config();

export const initializeServer = (): Express => {
    const app = express();
    app.use(express.json());
    app.use("/cart", cartRoutes.router);
    app.use("/product", productRoutes.router);
    app.use("/discount", discountRoutes.router);

    startServer(app);
    return app;
}

const startServer = (server: express.Application): void => {
    server.listen(process.env.PORT, () => {
        console.log(`Listening on port: ${process.env.PORT}`);
    });
}